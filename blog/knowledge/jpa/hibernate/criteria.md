---
order: 2
---

# 2. 动态SQL（Criteria）

Criteria 查询提供了用编程的形式去写JPQL或者SQL，同时它也是类型安全的。通过它可以编写动态的SQL，比如where条件动态拼接，order by 动态字段等操作。相比于传统的字符串SQL拼接，它的优点就是类型安全。

criteria被很多初学者认为不直观，难以学习。其实是他们习惯了写SQL换成编程的形式去写SQL，现在需要去理解各种接口各种类不想花一些时间去学习。
<center>
<img src="./img.png">

图1 criteria设计图
</center>

这张图是criteria中涉及的所有接口以及他们之间的关系。是不是看着感觉很难，不用害怕，下面我用几个例子带你看懂这张图。

## Select

### SelectExpression

```java
  @Test
  public void selectExpression() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<String> query = criteriaBuilder.createQuery(String.class);
    Root<User> userRoot = query.from(User.class);
    // 构造 case when
    Expression<String> selectCase = criteriaBuilder.<String>selectCase()
        // when u.avatar is null then 'avatar is null'
        .when(criteriaBuilder.isNull(userRoot.get("avatar")), "avatar is null")
        // else u.avatar
        .otherwise(userRoot.get("avatar"));
        
    // select  upper(case when u.avatar is null then 'avatar is null' else u.avatar  end)
    query.select(criteriaBuilder.upper(selectCase));
    List<String> resultList = entityManager.createQuery(query).getResultList();
    resultList.forEach(log::info);
  }
```

```sql
select
  upper(case
      when u.avatar is null then 'avatar is null'
      else u.avatar
  end)
from
  user u
```

这个例子的主要核心是在`query.select`，写这个看起有点复杂的例子是想表达select内可以传很多类型。

可以看见select方法的参数必须实现Selection。根据图1可以知Selection的主要实现接口是Expression。

```java
 CriteriaQuery<T> select(Selection<? extends T> selection);
```

### SelectMultiExpression

::: tip
需要注意在使用criteria时，字段名称指的是实体类上的属性名称，而不是数据库中的字段名称。
比如UserPhonePassword中的phoneNumber在数据库中是phone_number，criteria中使用该字段的方法是root.get("phoneNumber")并不是root.get("phone_number")
:::

```java
  @Test
  public void selectMultiExpression() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    // 查询的返回结果是Tuple，类似jdbc中的resultSet。Tuple比较灵活，当你不想定义返回结果时可以用Tuple。
    CriteriaQuery<Tuple> query = criteriaBuilder.createQuery(Tuple.class);
    Root<User> userRoot = query.from(User.class);
    // userRoot.get("phonePassword").get("phoneNumber") 会自动join phonePassword。
    // 同时需要注意数据库中phoneNumber是phone_number，所以这边记得是填写实体类中的属性名称而不是数据库中的名称。
    query.multiselect(userRoot.get("nickname"), userRoot.get("phonePassword").get("phoneNumber"));
    entityManager.createQuery(query).getResultList().forEach(res -> {
      // res.get(0)对应multiselect的第一个参数，res.get(1)对应
      log.info("用户昵称：{}, 手机号：{}", res.get(0), res.get(1));
    });
  }
```

### SelectDto1

根据图一可以知道`query.select`还可以传入`CompoundSelection`（Selection的实现类）的对象。下面介绍将select的字段包装成dto。

```java
  @Test
  public void selectDto() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    // 返回的结果是dto
    CriteriaQuery<UserSimpleResponse> query = criteriaBuilder.createQuery(UserSimpleResponse.class);
    Root<User> userRoot = query.from(User.class);
    // 将select的多个字段组合成一个CompoundSelection
    // UserSimpleResponse的构造方法会接收nickname和phoneNumber两个参数
    CompoundSelection<UserSimpleResponse> construct = criteriaBuilder.construct(
        UserSimpleResponse.class,
        // 对应构造方法的第一个参数
        userRoot.get("nickname"),
        // 对应构造方法的第二个参数
        userRoot.get("phonePassword").get("phoneNumber"));
    query.select(construct);
    entityManager.createQuery(query).getResultList().forEach(res -> {
      log.info(res.toString());
    });
  }
```

```java
@Data
public class UserSimpleResponse {

  private String nickname;
  private String phoneNumber;

  public UserSimpleResponse(String nickname, String phoneNumber) {
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
  }
}
```

```sql
select
    u.nickname,
    u.phone_number 
from
    user u 
join
    user_phone_password p 
        on u.id=p.id
```

### SelectDto2

这个例子演示了在select中可以传入Join对象通过此来实现`select p.*`。

```java
  @Test
  public void selectDto2() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<UserPhonePasswordResponse> query = criteriaBuilder.createQuery(
        UserPhonePasswordResponse.class);
    Root<User> userRoot = query.from(User.class);
    Join<Object, Object> phonePasswordJoin = userRoot.join("phonePassword");
    CompoundSelection<UserPhonePasswordResponse> construct = criteriaBuilder.construct(
        UserPhonePasswordResponse.class,
        // 这个参数对应构造方法的第一个参数
        userRoot.get("nickname"),
        // 这个参数对应构造方法的第二个参数
        phonePasswordJoin
        );
    query.select(construct);
    entityManager.createQuery(query).getResultList().forEach(res -> {
      log.info(res.toString());
    });
  }
```

```sql
select
    u1_0.nickname,
    p.*,
from
    user u 
join
    user_phone_password p 
        on u.id=p.id
```

```java
@Data
public class UserPhonePasswordResponse {

  private String nickname;
  private String phoneNumber;
  private String password;

  public UserPhonePasswordResponse(String nickname, UserPhonePassword phonePassword) {
    this.nickname = nickname;
    this.phoneNumber = phonePassword.getPhoneNumber();
    this.password = phonePassword.getPassword();
  }
}

```

### SelectRoot

`root`是根的意思，平常写的sql中肯定会有一个起始表，然后再join到其他的表或者子查询（里面也可以含有root）。一个sql中可以有多个起始表，这边只演示了一个。

`query.from(User.class)`得到userRoot，在图1中得知Root也是Expression的实现接口，因此userRoot对象也可以传入select中。执行的效果就是`u.*`

```java
  @Test
  public void selectRoot() {
    // 用于构造查询语句和查询条件
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    // User.class代表查询的返回结果是User类型
    CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);
    // from user 
    Root<User> userRoot = query.from(User.class);
    // select u.* from user u
    query.select(userRoot);
    List<User> resultList = entityManager.createQuery(query).getResultList();
    resultList.forEach(user -> {
      log.info(user.toString());
    });
  }
```

```sql
select u.* from user u
```

### SelectMultiRoot

上面说了一个SQL中可以包含多个Root，下面演示select多个root。

```java
    @Test
  public void queryMultiRoot() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Tuple> query = criteriaBuilder.createQuery(Tuple.class);
    // from user
    Root<User> userRoot = query.from(User.class);
    // from user, role
    Root<Role> roleRoot = query.from(Role.class);
    // select u.*, r.*
    query.multiselect(userRoot, roleRoot);
    List<Tuple> resultList = entityManager.createQuery(query).getResultList();
    resultList.forEach(res -> {
      // res.get(0) -> user, res.get(1)-> role 和 multiselect参数对应
      log.info("用户信息：{}，角色信息：{}", res.get(0), res.get(1));
    });
  }
```

```sql
select u.*, r.* from user u, role r
```

## 条件表达式（Conditional Expressions）

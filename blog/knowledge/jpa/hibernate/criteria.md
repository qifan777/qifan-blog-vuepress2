---
order: 2
---

# 2. 动态SQL（Criteria）

在JPA中写SQL三种方式

- JPQL
  如果你的SQL语句不是动态的那建议使用JPQL，JPQL和SQL写起来差不多。主要区别是JPQL是面向实体类，SQL是直接面向底层的表。
- Criteria
  Criteria 查询提供了用编程的形式去写JPQL，同时它也是类型安全的。通过它可以编写动态的JPQL，比如where条件动态拼接，order by 动态字段等操作。相比于传统的字符串SQL拼接，它的优点就是类型安全。Criteria你也可以说是JPQL的编程版本。
- NativeSQL
  由于JPQL提供的是所有数据库通用的写法，如果你想使用具体数据库的特性，可以写NativeSQL（原生SQL）。

JPA中最难的查询方式就是criteria了，所以本章主要criteria做介绍。

<center>
<img src="./img.png">

图1 criteria设计图
</center>

这张图是criteria中涉及的所有接口以及他们之间的关系。是不是看着感觉很难，不用害怕，下面我用几个例子带你看懂这张图。

## 简单的案例

下面是一段JPQL看着是不是和SQL很相似，但是仔细观察你可以发现这里面的表名是实体类名，字段名是实体类的属性。

```sql
select u from User u left join UserWeChat uw on u.id=uw.id where uw.openId='oEheF5USRu6Y3qWjpb3wJPBfuejw' and u.phonePassword.phoneNumber like '136%'
```

::: tip
JPQL和NativeSQL操作对象的区别参考下面。
`UserPhonePassword`是实体类的名字，`USER_PHONE_PASSWORD`是实体类映射到数据库的表名。`phoneNumber`是实体类的属性名，映射到数据库中的表字段是`phone_number`。

```java
@Table(name = "USER_PHONE_PASSWORD")
@Entity
public class UserPhonePassword extends BaseEntity {
  @Column(name = "phone_number", unique = true)
  private String phoneNumber;
}
```

:::

### from对象

观察这段JPQL，可以看到 u 和 uw 两个别名。u在criteria里面它叫`Root`，因为它是这段sql里面的起始表。uw在criteria里面它叫`Join`，这个就很明显了因为它是通过join得到的。

通过图1你可以看见 `Root`和`Join`都是`From`的子类。在写SQL的时候可以知道from之后可以join别的表，join之后也可以再join别的表。因此`From`的子类就意味着它可以具备join的能力。

:::tip
知识点：`From`的子类可以Join别的表。
:::

### 字段访问

这段sql中`u.id`，`p.id`和`p.phone_number`都是属于字段访问操作，分别在select，on，where中出现。总结规律可以得知在`From`对象都可以对字段进行访问。

:::info
在 JPQL 中可以用u.phonePassword.phoneNumber形式去访问到关联的表字段。其中`u.phonePassword`相当于原生SQL里面的 join phone_password。`u.phonePassword`得到的对象这边叫做`Path`，`Path`对象可以继续向下访问字段。
因此不单单`From`对象可以对字段进行访问，字段访问后的对象`Path`也可以继续字段访问。
:::

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

### 比较运算

```query.where(条件1,条件2...条件n)```对应的sql是where 条件1 and 条件2 .... and 条件n

```java
@Test
  public void compare() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<Menu> query = criteriaBuilder.createQuery(Menu.class);
    Root<Menu> menuRoot = query.from(Menu.class);

    // 可以忽略不写select,默认就是select menuRoot
    // query.select(menuRoot);

    // where里面可以传多个条件 多个条件是and逻辑连接.
    query.where(criteriaBuilder.notEqual(menuRoot.get(Menu_.id), "1"),
        criteriaBuilder.ge(menuRoot.get(Menu_.orderNum), 0));
    entityManager.createQuery(query).getResultList().forEach(menu -> {
      log.info("菜单: {}", menu);
    });
    // 下面的条件不参与where拼接
    // = 运算符
    criteriaBuilder.equal(menuRoot.get(Menu_.id), "1");
    // != 运算符
    criteriaBuilder.notEqual(menuRoot.get(Menu_.id), "1");
    // ---- 下面的条件只能是数值型属性之间的比较 >= > <= <
    //  >= 运算符
    criteriaBuilder.ge(menuRoot.get(Menu_.orderNum), 0);
    //  > 运算符
    criteriaBuilder.gt(menuRoot.get(Menu_.orderNum), 0);
    //  <= 运算符
    criteriaBuilder.le(menuRoot.get(Menu_.orderNum), 0);
    // < 运算符
    criteriaBuilder.lt(menuRoot.get(Menu_.orderNum), 0);
    // ---- 下面的条件可以是非数值型属性之间的比较 >= > <= <
    //  >= 运算符
    criteriaBuilder.greaterThanOrEqualTo(menuRoot.get(Menu_.createdAt), LocalDateTime.now());
    //  > 运算符
    criteriaBuilder.greaterThan(menuRoot.get(Menu_.createdAt), LocalDateTime.now());
    // <= 运算符
    criteriaBuilder.lessThanOrEqualTo(menuRoot.get(Menu_.createdAt), LocalDateTime.now());
    // > 运算符
    criteriaBuilder.lessThan(menuRoot.get(Menu_.createdAt), LocalDateTime.now());

  }
```

```sql
select
  m.*
from
  menu m
where
  m.id!=?
  and m.order_num>=?
```

### 逻辑运算

`criteriaBuilder.or(条件1,条件2)`会返回一个新的条件即(条件1 or 条件2)

```java
  @Test
  public void logical() {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<User> query = criteriaBuilder.createQuery(User.class);
    Root<User> userRoot = query.from(User.class);
    //           (
    //              u.nickname=?
    //              or u.nickname=?
    //          )
    query.where(criteriaBuilder.or(criteriaBuilder.equal(userRoot.get(User_.nickname), "起凡"),
            criteriaBuilder.equal(userRoot.get(User_.nickname), "默认用户")),
        // and u.avatar not like ? escape ''
        criteriaBuilder.not(criteriaBuilder.like(userRoot.get(User_.avatar), "%https%")),
        // and u.gender in (?,?)
        userRoot.get(User_.gender).in(GenderType.MALE, GenderType.FEMALE));
    entityManager.createQuery(query).getResultList().forEach(res -> {
      log.info(res.toString());
    });
  }
```

```sql
  select
      u.*
  from
      user u
  where
      (
          u.nickname=?
          or u.nickname=?
      )
      and u.avatar not like ? escape ''
      and u.gender in (?,?)
```
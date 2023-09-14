---
sidebar: heading
---

# Hibernate

## 1. 领域模型（Domain Model）

领域顾名思义，它指的是我们实际业务中一的一块业务也就是一个领域。对这个领域建模可能会有好几个相关联的类，他们都属于同一个领域。所以领域模型是比较范的概念，一般来说一个领域模型里面包含一个及以上的实体类（Entity），每个实体类都对应着数据库的一张表。

领域模型是Hibernate的核心，Hibernate的所有功能都是围绕着领域模型。Hibernate提供了许多的注解方便我们来建立领域模型。

### 1.1 Hibernate类型

Hibernate类型的主要功能是联系Java中的对象和数据库中的记录，并且可以将Java对象与数据库的记录互相转换。

我们刚刚说了Hibernate需要在Entity类和数据库表直接做映射，而最直接的一个问题就是数据库中的类型如何与实体类中属性类型相对应。实体类里面可能存在枚举属性，如何映射到数据库？字符串类型如何映射到VARCHAR,CHAR？BigDecimal如何映射到Decimal?

搞清楚Hibernate一共有多少种类型是我们领域建模的最关键的点。

***简单的领域建模例子***

可以看到这个领域内有两张表，那意味着我们有两个实体类。

```sql
-- 联系方式
create table Contact (
    id integer not null,
    first varchar(255),
    last varchar(255),
    middle varchar(255),
    notes varchar(255),
    starred boolean not null,
    website varchar(255),
    primary key (id)
)
-- 地址
create table Address(
    id integer not null,
    province varchar(20),
    city varchar(20),
    district varchar(20),
    details varchar(20),
    contact_id integer not null,
    primary key (id)
)
```

先建立地址实体类，映射到Address表。

```java
@Entity(name = "Address")
@Data
public class Address {
    @Id
    private Long id;

    // @Basic可加可不加。用来标识该字段是基本类型
    private String province;

    private String city;

    private String district;

    private String details;
}   
```

再建立联系实体类，在这个类里面关联地址实体类。

同时观察发现`fitst`, `middle`,`last`都是属于名字这一概念，所以我们可以再创建一个类把这三个字段包装起来，使得语义清晰。

```java

@Entity(name = "Contact")
@Data
public class Contact {

    @Id
    private Integer id;

    // 表明该字段为嵌套类型
    @Embedded
    private Name name;

    private String notes;

    private URL website;

    private boolean starred;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;
}
// 表明该类为嵌套类型
@Embeddable
@Data
class Name {
    // 这边属性名称和表的字段名称不一样，需要手动指定。
    @Column(name = "first")
    private String firstName;
    @Column(name = "middle")
    private String middleName;
    @Column(name = "last")
    private String lastName;
}
```



上述的领域模型可以发现以下这些Hibernate类型

1. 基本类型：`boolean`（Java基础类型）
2. 基本类型 ：`Integer`（Java基础类型包装类）
3. 基本类型：`String`（Java字符串）
4. 嵌套类型：`Name`（Java简单对象（POJO）类，没有实际的表与之相关联）
5. 实体类型：`Address`（Java简单对象（POJO）类，有实际的表与之相关联）

上面的这些Hibernate类型又分为两大类`值类型`和`实体类型`

#### 1.1.1 值类型(Value Type)

值类型是那些和实体类紧密关联，描述了实体状态的字段。

这些Hibernate类型都属于值类型：

- 基本类型，详细看 1.2。

- 嵌套类型，Java简单对象（POJO）类，没有实际的表与之相关联。需要依附某个实体类型。

  这个类里面又有一些基本类型，如上面的Contact中的Name字段。

- 集合类型，虽然前面没提到，但是偶尔也会用到。

#### 1.1.2 实体类型（Entity Type）

实体类型描述了Java简单对象（POJO）类与数据库之间的映射关系。通过`@Entity`来标识。

当实体作为属性存在在另一个实体对象时，他们只是存在联系，却各自维护自己的状态。如上面的Contact中的address属性。他们是两个实体，却又存在联系。他们各自维护自己的修改和删除。

实体类和Java简单对象（POJO）类最大的区别那就是实体类是由对应的数据库表，而普通java类型没有。

### 1.2 基本类型

与基本类型搭配使用的注解：

> @Basic，@Column，@Id，@Enumerated，@Convert（自定义映射规则）

低频次：

> @Type（自定义hibernate类型），@Lob（二进制数据），@Nationalized（国际化字符串），@Formula（计算字段），@ColumnTransformer（自定义列转化）

下面的表格列出了Java中的哪些类型属于Hibernate的基础类型。

你可以通过`@Basic`来指定属性类型为基本类型。也可以不添加该注解，上面的领域建模例子就没添加。

| 类别                          | 类型                                             |
|-----------------------------|------------------------------------------------|
| java基本类型                    | boolean, int, double等                          |
| java基本类型包装类                 | Boolean, Integer, Double等                      |
| 字符串                         | String                                         |
| 数字类型                        | BigInteger, BigDecimal                         |
| Java8 date/time (java.time) | LocalDate, LocalTime, LocalDateTime, Instant 等 |
| 不建议使用的date/time(java.util)  | Date 和 Calendar                                |
| 不建议使用的date/time(java.sql)   | Date, Time, Timestamp                          |
| byte数组和char数组               | byte[] 或者 Byte[], char[] 或者Character[]         |
| java 枚举类型                   | 任意的 enum                                       |
| 可序列化的类型                     | 任意实现 java.io.Serializable的类                    |

下面详细介绍上述表格中的部分类型。

#### 1.2.1 枚举类型

```java
public enum PhoneType {
    LAND_LINE,
    MOBILE;
}
```

***@Enumerated(ORDINAL)***

```java
@Entity(name = "Phone")
public static class Phone {

	@Id
	private Long id;

	@Column(name = "phone_number")
	private String number;

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "phone_type")
	private PhoneType type;
}
```

当我们插入Java对象到数据库时，hibernate生成下面的sql语句。
可以看见`PhoneType.MOBILE` 映射到 `1`。@Enumerated(EnumType.ORDINAL)指定枚举到数据库的映射规则是按顺序。MOBILE在PhoneType中的顺序是1，所以就得到了1。

```java
Phone phone = new Phone();
phone.setId(1L);
phone.setNumber("123-456-78990");
phone.setType(PhoneType.MOBILE);
entityManager.persist(phone)
```

```sql
INSERT INTO Phone (phone_number, phone_type, id)
VALUES ('123-456-78990', 1, 1)
```

***@Enumerated(STRING)***

还有一种枚举映射规则是把枚举值变成字符串。

在属性上加上`@Enumerated(STRING)`

```java
	@Enumerated(EnumType.STRING)
	@Column(name = "phone_type")
	private PhoneType type;
```

插入上面的例子到数据库，会生成下面的sql语句

```sql
INSERT INTO Phone (phone_number, phone_type, id)
VALUES ('123-456-78990', 'MOBILE', 1)
```

`PhoneType.MOBILE`变成了`'MOBILE'`字符串。

#### 1.2.2 Boolean

默认情况下，Java的Boolean映射到数据库的类型是`BIT`、`TINYINT`。

Hibernate还提供了下面三种内置映射规则

```java
// 把boolean映射成字符 `Y`, `N`
@Basic
@Convert(converter = org.hibernate.type.YesNoConverter.class)
boolean convertedYesNo;

// 把boolean映射成字符 `T`, `F`

@Basic
@Convert(converter = org.hibernate.type.TrueFalseConverter.class)
boolean convertedTrueFalse;

// 把boolean映射成 0，1。（默认就是这个）
@Basic
@Convert(converter = org.hibernate.type.NumericBooleanConverter.class)
boolean convertedNumeric;
```

#### 1.2.3 Date/Time

在SQL里面定义了三个标准的日期类型

1. DATE

   存储日历时间，年月日。
2. TIME

   存储小时，分钟，秒
3. TIMESTAMP

   存储DATE和TIME并且还有毫秒，即年月日小时分钟秒毫秒。

***@Temporal***

因为上面三种类型是数据库中的标准类型，如果我们在Java中使用的是`java.util.Date`
来标识时间，Hibernate不知道应该将`java.util.Date`映射到三种数据库时间类型中的哪一种。因此我们需要使用`@Temporal`
来显示的指定映射到哪一个类型。

*映射java.util.Date 到 DATE*

```java
@Temporal(TemporalType.DATE)
private Date timestamp;
```

*映射java.util.Date 到 TIME*

```java
@Temporal(TemporalType.TIME)
private Date timestamp;
```

*映射java.util.Date 到 TIMESTAMP*

```java
@Temporal(TemporalType.TIMESTAMP)
private Date timestamp;
```

同样，如果你使用的是`java.util.Calendar`，也需要指定映射到哪一种时间类型。

***映射 Java 8 Date/Time***

前面我们提到了在Java中使用`java.util.Calendar`或者`java.util.Date`来标识时间时应该如何映射。

如果我们使用的是Java8新增的Date/Time就不需要去指定映射规则了。因为Java8的Date/Time和数据库的三种日期格式刚刚好对应，映射规则如下：

1. DATE

   `java.time.LocalDate`
2. TIME

   `java.time.LocalTime`, `java.time.OffsetTime`
3. TIMESTAMP

   `java.time.Instant`, `java.time.LocalDateTime`, `java.time.OffsetDateTime`, `java.time.ZonedDateTime`

如果我们使用`LocalDateTime`来标识日期，那将被自动映射到`TIMESTAMP`。不需要添加`@Temporal`。使用上述的其他类型同理。

```java
private LocalDateTime timestamp;
```

#### 1.2.4 自定义映射规则

```java
public enum UserType {
    PERSON(1, "个人"),
    ENTERPRISE(2, "企业");
    private final Integer code;
    private final String name;

    UserType(Integer code, String name) {
        this.code = code;
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static UserType nameOf(String name) {
        return Arrays.stream(UserType.values()).filter(userType -> userType.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("枚举不存在"));
    }
}
```

```java
@Entity(name = "user")
@Data
@Accessors(chain = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private LocalDateTime createTime;

    private UserType userType;
}
```

用户拥有用户类型，如果我们希望用户类型这个属性在数据库存储的是`UserType`的name,例如`个人`，`企业`这样的字符串， 那我们就需要自定义映射规则。

***@Convert***

编写`Converter`类，定义两种类型之间的映射规则。我们这边是`UserType`与`String`的映射规则。

```java
public class UserTypeConverter implements AttributeConverter<UserType, String> {
    @Override
    public String convertToDatabaseColumn(UserType attribute) {
        return attribute.getName();
    }

    @Override
    public UserType convertToEntityAttribute(String dbData) {
        return UserType.nameOf(dbData);
    }
}
```

在需要映射的字段上添加上`@Convert`

```java
@Convert(converter = UserTypeConverter.class)
private UserType userType;
```

*测试案例*

```java
User user = new User()
        .setName("起凡")
        .setCreateTime(LocalDateTime.now())
        .setUserType(UserType.PERSON);
// 将UserType.PERSON 转成 字符串
// insert into user (create_time, name, user_type) values (2022-12-04 11:38:46, '起凡', '个人')
userRepository.save(user);

userRepository.findUserByNameIs("起凡")
        .ifPresent(res -> {
            // 在数据库从字符串变成 UserType.PERSON。
            log.info(res.getUserType()
                    .getCode()
                    .toString());
            // 结果是：1。
        });
```

### 1.3 嵌套类型

在前面的领域建模中，我们使用到了值类型中的嵌套类型。嵌套类型一般是对几个实体类都公用的属性进行包装方便复用，或者是几个属性属于同一个概念把它们放到一个类里面使得语义清晰。

> 嵌套类型需要`@Embeddable`和`@Embedded`搭配使用
>
> `@Embeddable`表明类本身是一个嵌套类型。
>
> `@Embedded`在实体类中的属性上面标识该属性的类型是嵌套类型。

*简单的嵌套类型案例*

```java
@Entity(name = "Book")
public static class Book {

	@Id
	@GeneratedValue
	private Long id;

	private String title;

	private String author;

	private Publisher publisher;
}

@Embeddable
public static class Publisher {

	@Column(name = "publisher_name")
	private String name;

	@Column(name = "publisher_country")
	private String country;

}
```

```sql
create table Book (
    id bigint not null,
    author varchar(255),
    publisher_country varchar(255),
    publisher_name varchar(255),
    title varchar(255),
    primary key (id)
)
```

Publisher嵌套类是Book的一部分。生成sql语句时，可以看见Book表中也有`publisher_country` `publisher_name`，而不是再生成一个Publisher表。

### 1.4 主键

#### 1.4.1 简单主键

**@ID** 

每个实体类都需要有一个@Id注解来标识注解，或者实体类的父类是`mapped superclass`且也有@id。

> @Id只能作用在基础类型或者基础类型的包装类 *java.lang.String*; *java.util.Date*; *java.sql.Date*; *java.math.BigDecimal*;



**@GeneratedValue**

 GeneratedValue提供了生成主键的规范，只能作用于有`@Id`标识的属性（类型是基本类型）。当插入实体类到数据库时会自动根据策略填充实体类的主键。

GenerationType定义了3种主键生成类型。

```
public enum GenerationType { TABLE, SEQUENCE, IDENTITY, AUTO };
```

1. TABLE

   为每张表生成一张额外的表来记录主键的生成。

2. SEQUENCE

   主键自增（Mysql支持），部分数据库不支持。

3. IDENTITY

   为插入的每条记录生成一个唯一的标识id，数据库层面支持（Oracle，SQL Server），部分数据库不支持（Mysql）。

#### 1.4.2 组合主键

*简单的组合主键例子*

```java
@Entity
public class Employee {
    @Id long empId;
    String empName;
    // ...
}
```

```java
public class DependentId {
    String name; // 和 Dependent中@Id String name 相对于。必须同类型且同名。
    long emp; // Dependent 中的 emp名字相同。Dependent中的emp用@ManyToOne注解，这边的emp类型必须和Employee的id同类型。 
}

@Entity
// 使用@组合id
@IdClass(DependentId.class)
public class Dependent {
    // 和 DependentId中的name相匹配
    @Id String name;
    
    // 和 DependentId中的emp相匹配
    @Id @ManyToOne
    Employee emp;

    // ...
}
```



## 4. 抓取数据（Fetch）

在查询的时候返回太多的数据对于 JDBC 传输数据和 ResultSet 处理过程都是不必要的开销，抓取太少的数据会导致执行额外的查询语句也降低了执行效率。所以说调节数据抓取的深度和广度对应用的性能影响是是很大的。

### 4.1 基础概念

抓取数据本身的概念可以将抓取数据产生的问题分成两种问题。

- 数据什么时候会被抓取？提前（`EAGER`）还是稍后（`LAZY`）

- 数据应该被怎么抓取

> 提前（eager）：在查询的同时返回所需要的数据
>
> 稍后（lazy）：在需要用到该数据时，再自动调用查询去获取数据。
>
> 如果百分白确定数据是一定是会被使用的，使用eager策略。如果是可能会使用则lazy。



下面有几个范围（scope）用来定义抓取数据的行为



***静态（static）***

静态定义的抓取策略是在数据映射过程执行的，静态策略是在没有动态策略情况下的备用策略。

​	**SELECT**

​	执行额外的SQL去抓取数据，这种行为可以是 `EAGER`（立即发送一条SQL去抓取数据），也可以是`LAZY`（在数据被访问的时候再发送一条SQL去抓取数据）.  这种策略通常称为 `N+1`。

​	**JOIN**

​	这种策略是只能是`EAGER`。数据会在通过 OUT JOIN 抓取，所以这种方式只需要执行一条sql语句效率较高。

​	**BATCH**

​	执行额外的SQL去加载一些相关的数据通过 IN （:ids）来限制。和`SELECT`一样也分为 `EAGER`和`LAZY`

​	**SUBSELECT**

​	执行额外的SQL加载关联的数据。和`SELECT`一样也分为 `EAGER`和`LAZY`

***动态（dynamic）***

> 动态加载：在运行时选择需要加载的数据

​	

​	**fetch profiles**

​	在实体类的映射上面定义，但是可以在执行查询的时候选择启用或者禁用。

​	**JPQL / Criteria** 

​	JPQL 是JPA规范的查询语句 和 JPA Criteria （JPQL的Java版本）都可以在查询的时候指定要抓取的数据。

​	**entity graph**

​	使用 JPA EntityGraphs

### 4.2 直接抓取和实体查询

要了解直接抓取数据和实体查询在提前地抓（`eagerly`）取关联数据上的区别，可以看下面这个例子。

```java
@Entity(name = "Department")
public static class Department {

	@Id
	private Long id;

	//Getters and setters omitted for brevity
}

@Entity(name = "Employee")
public static class Employee {

	@Id
	private Long id;

	@NaturalId
	private String username;

	@ManyToOne(fetch = FetchType.EAGER)
	private Department department;

	//Getters and setters omitted for brevity
}
```

`Employee`拥有和`Department`的`@ManyToOne`关联并且是提前抓取该关联。

*直接抓取例子*

```java
Employee employee = entityManager.find(Employee.class, 1L);
```

```sql
-- 生成的sql
select
    e.id as id1_1_0_,
    e.department_id as departme3_1_0_,
    e.username as username2_1_0_,
    d.id as id1_0_1_
from
    Employee e
left outer join
    Department d
        on e.department_id=d.id
where
    e.id = 1
```

可以看见，直接抓取通过 out join 加载了关联的数据。原因是因为`Employee`配置了`	@ManyToOne(fetch = FetchType.EAGER)`，意味着需要在查找`Employee`的同时也把`Department`加载出来。

*实体查询例子*

```java
Employee employee = entityManager.createQuery(
		"select e " +
		"from Employee e " +
		"where e.id = :id", Employee.class)
.setParameter("id", 1L)
.getSingleResult();
```

```sql
-- 生成的sql
select
    e.id as id1_1_,
    e.department_id as departme3_1_,
    e.username as username2_1_
from
    Employee e
where
    e.id = 1

select
    d.id as id1_0_0_
from
    Department d
where
    d.id = 1
```

可以看见一共生成了两条sql，原因是在查询的时候没有加载`Department`，而在`Employee`中又配置了它需要`Department`。所以Hibernate通过再生成一条sql查询来保证`@ManyToOne(fetch = FetchType.EAGER)`，同时又不影响第一条的sql语句。

> 上面的例子提醒了我们，如果我们在关联上配置了 `fetch = FetchType.EAGER` 那么我们在写实体查询的时候就要使用`join fetch`去将配置了上诉注解的关联加载出来。要不然就会出现`N+1`的性能问题，生成了额外的查询语句。

### 4.3 不抓取数据

```java
	@Entity(name = "Department")
	public static class Department {

		@Id
		private Long id;

		@OneToMany(mappedBy = "department")
		private List<Employee> employees = new ArrayList<>();

		//Getters and setters omitted for brevity
	}

	@Entity(name = "Employee")
	public static class Employee {

		@Id
		private Long id;

		@NaturalId
		private String username;

		@Column(name = "pswd")
		@ColumnTransformer(
			read = "decrypt('AES', '00', pswd )",
			write = "encrypt('AES', '00', ?)"
		)
		private String password;

		private int accessLevel;

		@ManyToOne(fetch = FetchType.LAZY)
		private Department department;

		@ManyToMany(mappedBy = "employees")
		private List<Project> projects = new ArrayList<>();

		//Getters and setters omitted for brevity
	}

	@Entity(name = "Project")
	public class Project {

		@Id
		private Long id;

		@ManyToMany
		private List<Employee> employees = new ArrayList<>();

		//Getters and setters omitted for brevity
	}
```



对于登录这个场景，我们只需要`Employee`的 username 和 password，并不需要`Project`也不需要`Department`的信息。

针对这种情况，我们可以在关联的上配置`fetch = FetchType.LAZY`，但是我们发现为什么`@ManyToMany`没有配置`fetch = FetchType.LAZY`。那是因为 JPA规定了`@OneToOne` 和`@ManyToOne`默认是`fetch = FetchType.EAGER`，而其他的关联默认是`LAZY`。也可以说，如果关联的是一个集合（Collection），那么这个关系就是懒加载。`@OneToMany`和`@ManyToOne`都是作用在关联实体集合上所以说它们是懒加载。

```java
Employee employee = entityManager.createQuery(
	"select e " +
	"from Employee e " +
	"where " +
	"	e.username = :username and " +
	"	e.password = :password",
	Employee.class)
.setParameter("username", username)
.setParameter("password", password)
.getSingleResult();
```

现在上面的实体查询就不会触发额外的sql语句，只会从`Employee`中获取数据。

### 4.4 动态抓取

第二种场景，页面上需要显示`Employee`的`Projects`，但是不需要显示`Department`。所以我们需要加载`Employee`和它关联的`Projects`

#### 4.4.1 通过查询动态抓取

***通过 JPQL 动态抓取***

```java
// left join fetch 取得关联的数据
Employee employee = entityManager.createQuery(
	"select e " +
	"from Employee e " +
	"left join fetch e.projects " +
	"where " +
	"	e.username = :username and " +
	"	e.password = :password",
	Employee.class)
.setParameter("username", username)
.setParameter("password", password)
.getSingleResult();
```

***通过 JPA Criteria动态抓取***

```java
CriteriaBuilder builder = entityManager.getCriteriaBuilder();
CriteriaQuery<Employee> query = builder.createQuery(Employee.class);
Root<Employee> root = query.from(Employee.class);
// fetch 取得 projects数据
root.fetch("projects", JoinType.LEFT);
query.select(root).where(
	builder.and(
		builder.equal(root.get("username"), username),
		builder.equal(root.get("password"), password)
	)
);
Employee employee = entityManager.createQuery(query).getSingleResult();
```

上面两个案例表单意思是一样的，写法不同。都是 JPA 规定的查询语法分表叫`JPQL` 和`Criteria Api `。通过`fetch`可以取得所需的数据，在查询的同时会生成 out join 去加载相关联的数据。通过上面这种方法动态加载，只需要一条sql语句就可以获取所需的数据。

#### 4.4.2 通过EntityGraph动态抓取

JPA还支持通过一种叫`EntityGraphs`的特性来动态加载数据。通过这种方式可以更加精细化的来控制加载数据。它有两种模式可以选择

​	**fetch mode**

​	在`EntityGraph`中指定的所有关系都需要提前加载，没有指定的其他关系在都认为是懒加载。

​	**load graph**

​	在`EntityGraph`中指定的所有关系都需要提前加载，没有指定的其他关系按照静态（参考4.1）策略。



下面定义一个基础的`EntityGraph`

```java
@Entity(name = "Employee")
@NamedEntityGraph(name = "employee.projects",
	attributeNodes = @NamedAttributeNode("projects")
)
```

```java
// 查询的时候使用EntityGraph
Employee employee = entityManager.find(
	Employee.class,
	userId,
	Collections.singletonMap(
		"jakarta.persistence.fetchgraph",
		entityManager.getEntityGraph("employee.projects")
	)
);
```

> 如果你想对关联的实体类嵌套定义`EntityGraph`可以使用`@NamedSubgraph`。


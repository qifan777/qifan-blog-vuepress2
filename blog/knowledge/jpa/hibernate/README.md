# 1. 领域模型（Domain Model）

领域顾名思义，它指的是我们实际业务中一的一块业务也就是一个领域。对这个领域建模可能会有好几个相关联的类，他们都属于同一个领域。所以领域模型是比较范的概念，一般来说一个领域模型里面包含一个及以上的实体类（Entity），每个实体类都对应着数据库的一张表。

领域模型是Hibernate的核心，Hibernate的所有功能都是围绕着领域模型。Hibernate提供了许多的注解方便我们来建立领域模型。

## 1.1 Hibernate类型

Hibernate类型的主要功能是联系Java中的对象和数据库中的记录，并且可以将Java对象与数据库的记录互相转换。

我们刚刚说了Hibernate需要在Entity类和数据库表直接做映射，而最直接的一个问题就是数据库中的类型如何与实体类中属性类型相对应。实体类里面可能存在枚举属性，如何映射到数据库？字符串类型如何映射到VARCHAR,CHAR？BigDecimal如何映射到Decimal?

搞清楚Hibernate一共有多少种类型是我们领域建模的最关键的点。

***简单的领域建模例子***

可以看到这个领域内有两张表，那意味着我们有两个实体类。

```sql
-- 联系方式
create table Contact
(
    id      integer not null,
    first   varchar(255),
    last    varchar(255),
    middle  varchar(255),
    notes   varchar(255),
    starred boolean not null,
    website varchar(255),
    primary key (id)
)
-- 地址
create table Address
(
    id         integer not null,
    province   varchar(20),
    city       varchar(20),
    district   varchar(20),
    details    varchar(20),
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

### 1.1.1 值类型(Value Type)

值类型是那些和实体类紧密关联，描述了实体状态的字段。

这些Hibernate类型都属于值类型：

- 基本类型，详细看 1.2。

- 嵌套类型，Java简单对象（POJO）类，没有实际的表与之相关联。需要依附某个实体类型。

  这个类里面又有一些基本类型，如上面的Contact中的Name字段。

- 集合类型，虽然前面没提到，但是偶尔也会用到。

### 1.1.2 实体类型（Entity Type）

实体类型描述了Java简单对象（POJO）类与数据库之间的映射关系。通过`@Entity`来标识。

当实体作为属性存在在另一个实体对象时，他们只是存在联系，却各自维护自己的状态。如上面的Contact中的address属性。他们是两个实体，却又存在联系。他们各自维护自己的修改和删除。

实体类和Java简单对象（POJO）类最大的区别那就是实体类是由对应的数据库表，而普通java类型没有。

## 1.2 基本类型

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

### 1.2.1 枚举类型

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
Phone phone=new Phone();
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

### 1.2.2 Boolean

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

### 1.2.3 Date/Time

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

### 1.2.4 自定义映射规则

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
.ifPresent(res-> {
// 在数据库从字符串变成 UserType.PERSON。
   log.info(res.getUserType()
   .getCode()
   .toString());
// 结果是：1。
});
```

## 1.3 嵌套类型

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
create table Book
(
    id                bigint not null,
    author            varchar(255),
    publisher_country varchar(255),
    publisher_name    varchar(255),
    title             varchar(255),
    primary key (id)
)
```

Publisher嵌套类是Book的一部分。生成sql语句时，可以看见Book表中也有`publisher_country` `publisher_name`，而不是再生成一个Publisher表。

## 1.4 实体类型

Hibernate里面实体类有下面几个要求

- 实体类上需要添加`@Entity`注解
- 实体类必须有一个public或者protected的无参构造器
- 接口和枚举不能成为实体类
- 实体类不能是final，里面的映射字段也不能是final。
- 实体类可以是抽象类（abstract），实体类可以继承抽象类实体。
- 实体类的每个映射字段都需要有getter/setter

### 1.4.1 映射实体类

定义一个实体类第一件事就是添加`@Entity(name="选填，默认和类名相同")`。默认情况实体类的名字和你数据库的表名相同,如果你想指定表名可以使用`@Table(name="xxx")`。
确定好映射的表名后，你需要确定[主键]((#_1-5-主键))并且在主键字段上用`@Id`标识，如果是多个主键请参考[组合组件](#_1-5-2-组合主键)。
最后将类中的属性映射到表中的字段，根据属性的类型选择合适的[值类型](#_1-1-1-值类型-value-type)

```java
// 总结，首先查找是否存在@Table(name="Book_1")，若存在则映射到Book_1表。
// 其次，@Entity(name="Book_2")，若@Entity有指定实体类名称，则映射到Book_2表
// 最后，@Entity，若@Entity没有指定名称，则默认映射到类名即Book表。
@Entity
public class Book {

  @Id
  private Long id;

  private String title;

  private String author;

  //Getters and setters are omitted for brevity
}
```

## 1.5 主键

### 1.5.1 简单主键

**@ID**

每个实体类都需要有一个@Id注解来标识注解，或者实体类的父类是`mapped superclass`且也有@id。

> @Id只能作用在基础类型或者基础类型的包装类 *java.lang.String*; *java.util.Date*; *java.sql.Date*;
*java.math.BigDecimal*;



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

### 1.5.2 组合主键

*简单的组合主键例子*

```java

@Entity
public class Employee {

  @Id
  long empId;
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
  @Id
  String name;

  // 和 DependentId中的emp相匹配
  @Id
  @ManyToOne
  Employee emp;

  // ...
}
```

## 关联

基本概念：

- 父实体（parent）- 关系反方（inverse side）
- 子实体（child）- 关系拥有方（owning side）

Person拥有多个Phone，Phone对应一个Person。Person和Phone之间，Person是父实体，Phone是子实体。由于外键person_id是在Phone中，所以子实体又是关系的拥有方（owning side），父实体是关系的相反方（inverse side）。

### @ManyToOne

多对一是最常见的关系，`@ManyToOne`直接映射到数据库的外键，它建立起了子实体（Child）和父实体（Parent）之间的联系。

*@ManyToOne*案例

```java

@Entity(name = "Person")
public static class Person {

  @Id
  @GeneratedValue
  private Long id;

  //Getters and setters are omitted for brevity

}

@Entity(name = "Phone")
public static class Phone {

  @Id
  @GeneratedValue
  private Long id;

  @Column(name = "`number`")
  private String number;

  @ManyToOne
  @JoinColumn(name = "person_id")
  private Person person;

  //Getters and setters are omitted for brevity

}
```

关联phone和person

```java
// 新增Person记录
Person person=new Person();
entityManager.persist(person);

Phone phone=new Phone("123-456-7890");
// 将phone关联已存在的person
phone.setPerson(person);
// 插入到数据库
entityManager.persist(phone);
entityManager.flush();
phone.setPerson(null);
entityManager.persist(phone);
entityManager.flush();
```

生成对应的SQL

```sql
INSERT INTO Person (id)
VALUES (1)
    INSERT
INTO Phone (number, person_id, id)
VALUES ( '123-456-7890', 1, 2 )

UPDATE Phone
SET number    = '123-456-7890',
    person_id = NULL
WHERE id = 2
```

### @OneToMany

之前说了Person可以关联多个Phone。可以使用`@OneToMany`来管理所有的子实体。
在使用`@OneToMany`时有两种情况第一种情况是子实体没有`@ManyToOne`，这种情况`@OneToMany`建立起的关联是`unidirectional`。第二种情况是子实体一方有`@ManyToOne`此时建立起的联系`bidirectional`.

在使用时强烈建议不要用`unidirectional`的关联。

*@OneToMany bidirectional例子*

bidirectional @OneToMany顾名思义它需要同时存在`owning side`和`inverse（mappedBy） side`。

```java
@Entity(name = "Person")
public static class Person {

	@Id
	@GeneratedValue
	private Long id;
	// mappedBy的意思是子实体通过person关联到父实体，这样就可以知道子实体的外键字段是什么。left join phone t on t.person_id = id。 
	// 在关联中只有父实体可以级联更新/删除/创建子实体，反之不行。CascadeType.ALL就是代表级联触发所有的操作。
	//
	@OneToMany(mappedBy = "person", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Phone> phones = new ArrayList<>();

	//Getters and setters are omitted for brevity

	public void addPhone(Phone phone) {
		phones.add(phone);
		phone.setPerson(this);
	}

	public void removePhone(Phone phone) {
		phones.remove(phone);
		phone.setPerson(null);
	}
}

@Entity(name = "Phone")
public static class Phone {

	@Id
	@GeneratedValue
	private Long id;
	// 手机号在生活中不会重复，这种属于自然id，也可以唯一标识一行记录
	@NaturalId
	@Column(name = "`number`", unique = true)
	private String number;
	
	// 可以不写@JoinColumn，默认会以person_id作为外键。
	// 关联父实体
	@ManyToOne
	private Person person;

	//Getters and setters are omitted for brevity

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Phone phone = (Phone) o;
		return Objects.equals(number, phone.number);
	}

	@Override
	public int hashCode() {
		return Objects.hash(number);
	}
}
```



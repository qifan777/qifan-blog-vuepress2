# 商品

平常我们在购买奶茶的时候，左侧会有商品类别的选择，右侧会显示该类别下的商品。商品会有封面、价格和名称，点进商品可以看见商品的详情。购买商品可以选择不同的商品规格，比如手机的颜色维度上可以选择黑色、白色、红色，内存维度上可以选择6gb、8gb、12gb。
将上面不同维度的属性值排列组合之后就形成了商品的规格（如黑色-6gb，白色-6gb等），实际售卖时也是按照规格售卖。所以每个规格同样拥有价格，封面等信息。

## 表关系设计

<center>
    <img src="./img.png">

图0 表之间的关系
</center>

下图是新增商品时涉及的表，下面将会一一介绍每个表的设计。


<center>
    <img src="./img_5.png">

图1 操作逻辑上的关系
</center>

- `ProductCategory`：商品类别
- `ProductSku`：商品规格
- `ProductAttribute`：商品属性
- `Product`：商品
- `Attribute`：商品属性模板
- `AttributeCategory`：商品属性模板类别

`Product`和`ProductSku`是一对多的联系，如手机拥有多种规格（黑色-6gb，白色-6gb等）。
`Product`和`ProductAttribute`是一对多的联系，如手机拥有颜色属性和内存属性。
`Product`和`ProductCategory`是多对一的联系，一个商品只有一个类别，一个类别下可以有很多商品。
`Attribute`和`AttributeCategory`和商品属性模板类别是多对一的联系，一个类别下可以用有多个属性模板。

## 实体设计

在小程序展示的时候（图3）可能会对类别有排序需求和图标自定义需求，我增加了图标和排序字段。

::: info
id，创建时间，更新时间等字段。请参考[BaseEntity](../reference#baseentity)
:::

### ProductCategory

<center>
    <img src="./img_2.png" height="500">

图2 商品类别展示
</center>
<center>
    <img src="./img_3.png">

图3 商品类别创建
</center>

::: info
通过图1可以知道一个类别下有多个商品，一个商品只有一个类别。因此ProductCategory的实体内使用`@OneToMany`关联了子实体[Product]()

```java
@GenField(association = true, value = "产品列表")
@OneToMany(mappedBy = "category")
@ToString.Exclude
private List<Product> products;
```

详细用法请参考[`@OneToMany`](../../../knowledge/jpa/hibernate/#onetomany)
:::

```java
@GenEntity
@Entity
@Accessors(chain = true)
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ProductCategory extends BaseEntity {

  @GenField(value = "类别名称")
  private String name;
  @GenField(value = "图标", type = ItemType.PICTURE)
  private String icon;
  @GenField(value = "类别序号", type = ItemType.INPUT_NUMBER)
  private Integer sort;
  @GenField(association = true, value = "产品列表")
  @OneToMany(mappedBy = "category")
  @ToString.Exclude
  private List<Product> products;
  @GenField(ignoreRequest = true)
  private ValidStatus validStatus;


  public void valid() {
    setValidStatus(ValidStatus.VALID);
  }

  public void invalid() {
    setValidStatus(ValidStatus.INVALID);
  }

  @Override
  public final boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null) {
      return false;
    }
    Class<?> oEffectiveClass =
        o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer()
            .getPersistentClass() : o.getClass();
    Class<?> thisEffectiveClass =
        this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
            .getPersistentClass() : this.getClass();
    if (thisEffectiveClass != oEffectiveClass) {
      return false;
    }
    ProductCategory that = (ProductCategory) o;
    return getId() != null && Objects.equals(getId(), that.getId());
  }

  @Override
  public final int hashCode() {
    return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
        .getPersistentClass().hashCode() : getClass().hashCode();
  }
}
```

### ProductAttribute

<center>
    <img src="./img_4.png">

图4 商品属性展示
</center>

```java
@GenEntity
@Entity
@Accessors(chain = true)
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ProductAttribute extends BaseEntity {

  @GenField(value = "商品", association = true)
  @ManyToOne
  private Product product;
  @GenField(value = "属性名称")
  private String name;
  @GenField(value = "属性值")
  private String attributeValues;
  @GenField(ignoreRequest = true)
  private ValidStatus validStatus;


  public void valid() {
    setValidStatus(ValidStatus.VALID);
  }

  public void invalid() {
    setValidStatus(ValidStatus.INVALID);
  }

  @Override
  public final boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null) {
      return false;
    }
    Class<?> oEffectiveClass =
        o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer()
            .getPersistentClass() : o.getClass();
    Class<?> thisEffectiveClass =
        this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
            .getPersistentClass() : this.getClass();
    if (thisEffectiveClass != oEffectiveClass) {
      return false;
    }
    ProductAttribute that = (ProductAttribute) o;
    return getId() != null && Objects.equals(getId(), that.getId());
  }

  @Override
  public final int hashCode() {
    return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
        .getPersistentClass().hashCode() : getClass().hashCode();
  }
}
```

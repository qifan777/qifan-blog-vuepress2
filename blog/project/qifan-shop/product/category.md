# 商品类别

后台管理在商品类别中新增类别，当创建商品时可以从已有的类别中进行选择。为商品选择好类别后，小程序端点击对应的商品类别就可以加载该类别下的所有商品。

## 前端显示效果

<center>
    <img src="./img_1.png">

图2 后台商品类别管理
</center>

<center>
    <img src="./img_2.png" height="500">

图3 小程序端商品类别
</center>

## 实体设计

在小程序展示的时候（图3）可能会对类别有排序需求和图标自定义需求，我增加了图标和排序字段。

::: info
id，创建时间，更新时间等字段。请参考[BaseEntity](../reference#baseentity)
:::

```java

@GenEntity
@Entity
@Accessors(chain = true)
@Data
public class ProductCategory extends BaseEntity {

  @GenField(value = "类别名称")
  private String name;
  @GenField(value = "图标", type = ItemType.PICTURE)
  private String icon;
  @GenField(value = "类别序号", type = ItemType.INPUT_NUMBER)
  private Integer sort;
  @GenField(ignoreRequest = true)
  private ValidStatus validStatus;


  public void valid() {
    setValidStatus(ValidStatus.VALID);
  }

  public void invalid() {
    setValidStatus(ValidStatus.INVALID);
  }

}
```

# 商品

平常我们在电商网站买商品的时候，映入眼帘的就是商品的封面、价格和名称，点进商品可以看见商品的详情。购买商品可以选择不同的商品规格，比如手机的颜色维度上可以选择黑色、白色、红色，内存维度上可以选择6gb、8gb、12gb。
将上面不同维度的属性值排列组合之后就形成了商品的规格（如黑色-6gb，白色-6gb等），实际售卖时也是按照规格售卖。所以每个规格同样拥有价格，封面等信息。

## 业务设计

<center>
    <img src="./img.png">

图1 表之间的关系
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


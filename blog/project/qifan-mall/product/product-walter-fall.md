# 小程序商品瀑布流

:::center
![瀑布流](./walter-fall.png)
:::

## 分页加载商品

```ts
const { pageData } = usePageHelper(
  api.productController.query,
  api.productController,
  {},
);
```

pageData中的数据会在进入页面时自动加载，触底时也会自动加载下一页。

:::info
[usePageHelper](../reference/mp/page.md)是组合式api封装的分页加载工具
:::

## 瀑布流组件

瀑布流左右两列有插槽，在插槽上使用[商品封面组件](../reference/mp/product-cover.md)

```html
  <walter-fall :data-list="pageData.content" class="product-walter-fall">
  <!-- 左侧插槽 -->
    <template #itemLeft="{ item }">
      <product-cover :product="item"></product-cover>
    </template>
    <!-- 右侧插槽 -->
    <template #itemRight="{ item }">
      <product-cover :product="item"></product-cover>
    </template>
  </walter-fall>
```

:::info
[product-cover](../reference/mp/product-cover.md)商品封面组件
[walter-fall](../reference/mp/walter-fall.md)瀑布流布局组件
:::

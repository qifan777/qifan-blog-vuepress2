# 订单列表

![订单列表](image.png =x350)

## 用户订单分页查询

:::tabs
@tab 订单查询Dto

- `creator { id }`: 包含创建者的ID信息，可以按照创建者ID来筛选订单。

使用这个规格(Specification)进行查询时，可以根据用户提供的参数，灵活查询满足条件的所有订单记录，比如按订单备注部分文本、创建和修改时间范围以及创建者ID来过滤订单。

```text {9-11}
specification ProductOrderSpec {
    #allScalars
    like/i(remark)
    like/i(id)
    ge(createdTime)
    le(createdTime)
    ge(editedTime)
    le(editedTime)
    creator {
      id
    }
}
```

@tab 订单抓取器

1. `ProductOrderFetcher.COMPLEX_FETCHER`：创建了一个名为`COMPLEX_FETCHER`的复杂加载器，用于加载商品订单的详细信息。

2. `.allScalarFields()`：表示加载所有标量字段（如字符串、数字等基本属性）。

3. `.items(ProductOrderItemFetcher.$...)`：针对每个商品订单中的`items`（即商品订单项列表），进一步加载其相关联的详细信息：
   - `.productSku(ProductSkuFetcher.$...)`：加载每个商品订单项对应的`ProductSku`（商品SKU）信息，并进一步加载它的所有标量字段以及与其关联的：
     - `.product(ProductFetcher.$.allScalarFields())`：加载商品SKU所属的商品详细信息。
   - `.skuCount()`：加载商品订单项的数量。

4. `.address(AddressFetcher.$.allScalarFields())`：加载与订单关联的地址信息及其所有标量字段。

5. `.payment(PaymentFetcher.$.allScalarFields())`：加载与订单关联的支付详情及其所有标量字段。

6. `.creator(UserFetcher.$.phone().nickname())` 和 `.editor(UserFetcher.$.phone().nickname())`：分别加载创建和编辑此订单的用户的电话号码和昵称。

`COMPLEX_FETCHER`能够根据需要一次性从数据库加载商品订单及其相关实体（如商品SKU、商品、地址、支付详情、用户信息等）的完整信息，以提高数据读取效率，减少网络请求次数。

```java
public interface ProductOrderRepository extends JRepository<ProductOrder, String> {

  ProductOrderFetcher COMPLEX_FETCHER = ProductOrderFetcher.$.allScalarFields()
      .items(ProductOrderItemFetcher.$
          .productSku(ProductSkuFetcher.$
              .allScalarFields()
              .product(ProductFetcher.$.allScalarFields()))
          .skuCount())
      .address(AddressFetcher.$.allScalarFields())
      .payment(PaymentFetcher.$.allScalarFields())
      .creator(UserFetcher.$.phone().nickname())
      .editor(UserFetcher.$.phone().nickname());
}
```

@tab api

1. 方法参数：
   - `@RequestBody QueryRequest<ProductOrderSpec> queryRequest`：通过`@RequestBody`注解接收请求体中的JSON数据，并将其反序列化为`QueryRequest`对象，其中泛型类型是`ProductOrderSpec`，即订单查询规格对象，包含了查询条件和分页信息等。

2. 在方法内部：
   - 创建一个`TargetOf_creator`对象（[ProductOrderSpec](#用户订单分页查询)中定义的Creator），并使用`StpUtil.getLoginIdAsString()`获取当前登录用户的ID（SaToken）。
   - 将这个用户ID设置到订单查询规格的创建者字段上，这样在执行查询时，将会筛选出由当前登录用户创建的订单。

3. 调用`productOrderService.query(queryRequest)`：传入已设置好查询条件和分页信息的`queryRequest`对象，用于执行数据库查询操作。

4. 返回值类型为`Page<@FetchBy(value = "COMPLEX_FETCHER") ProductOrder>`：返回的是一个分页结果集，并用`@FetcherBy`声明返回类型，这样前端在同步API时可以根据`COMPLEX_FETCHER`中查询的内容获得类型，即订单的详细信息，如商品SKU、地址、支付详情以及与订单创建和编辑相关的用户信息等。

用户ID查询其创建的商品订单记录

```java
@RestController
@RequestMapping("productOrder")
@AllArgsConstructor
@DefaultFetcherOwner(ProductOrderRepository.class)
public class ProductOrderController {

  private final ProductOrderService productOrderService;

  @PostMapping("user")
  public Page<@FetchBy(value = "COMPLEX_FETCHER") ProductOrder> queryByUser(
      @RequestBody QueryRequest<ProductOrderSpec> queryRequest) {
    TargetOf_creator targetOfCreator = new TargetOf_creator();
    targetOfCreator.setId(StpUtil.getLoginIdAsString());
    queryRequest.getQuery().setCreator(targetOfCreator);
    return productOrderService.query(queryRequest);
  }
}
```

:::

## 路由配置

```ts
export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/user/index",
    "pages/address/address-list",
    "pages/address/address-save",
    "pages/order/order-create",
    "pages/order/order-list",
  ],
});

```

## 订单列表页面

### 小程序端字典

请参考[字典翻译](../dict|/README.md/#字典翻译) 和 [字典缓存](../dict/README.md/#字典缓存)

:::tabs
@tab 字典缓存

```ts
import type { DictSpec, Page } from "@/apis/__generated/model/static";
import type { DictDto } from "@/apis/__generated/model/dto";
import { api } from "@/utils/api-instance";

const dictMap: Record<
  number,
  Promise<Page<DictDto["DictRepository/COMPLEX_FETCHER"]>>
> = {};
export const queryDict = (dictSpec: DictSpec) => {
  if (!dictSpec.dictId) return;
  let res = dictMap[dictSpec.dictId];
  if (res) return res;
  res = api.dictController.query({
    body: {
      pageNum: 1,
      pageSize: 1000,
      likeMode: "ANYWHERE",
      query: dictSpec,
      sorts: [{ property: "dictId", direction: "ASC" }],
    },
  });
  dictMap[dictSpec.dictId] = res;
  return res;
};
```

@tab 字典翻译组件

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { DictDto } from "@/apis/__generated/model/dto";
import { queryDict } from "@/components/dict/dict";

const props = withDefaults(defineProps<{ dictId: number; value?: string }>(), {
  value: "",
});
const options = ref<DictDto["DictRepository/COMPLEX_FETCHER"][]>([]);
onMounted(async () => {
  const res = queryDict({ dictId: props.dictId });
  if (res) {
    options.value = (await res).content;
  }
});
const keyName = computed(() => {
  const option = options.value.find((option) => {
    return option.keyEnName === props.value;
  });
  return option ? option.keyName : "";
});
</script>

<template>
  <div>{{ keyName }}</div>
</template>

<style scoped lang="scss"></style>

```

### 订单展示

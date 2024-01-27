# 地址选择

## 源码解析

### 展示地址

:::tabs
@tab html

```html
<template>
  <div class="address-choose">
    <nut-popup
      :visible="visible"
      @update:visible="(value) => emit('update:visible', value)"
      position="bottom"
      closeable
      round
    >
      <div
        class="address-wrapper"
        :key="address.id"
        v-for="address in addressList"
        @click="handleChoose(address)"
      >
        <address-row class="address" :address="address"> </address-row>
      </div>
    </nut-popup>
  </div>
</template>
```

@tab ts

- props: `visible` 和 emit `update:visible`配合起来可以实现双向绑定。引用地址选择组件的时候`<address-choose v-model:visible="visible"></address-choose>`即可。
- 使用nut-popup组件，可以实现弹出层效果。接收到visible的改变事件继续向外emit`@update:visible="(value) => emit('update:visible', value)"`

```ts
import { ref } from "vue";
import { AddressDto } from "@/apis/__generated/model/dto";
import { api } from "@/utils/api-instance";
import Taro from "@tarojs/taro";
import { Check, Location2 } from "@nutui/icons-vue-taro";
type SimpleAddressDto = AddressDto["AddressRepository/SIMPLE_FETCHER"];
// 双向绑定
defineProps<{ visible: boolean }>();
const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();
const addressList = ref<SimpleAddressDto[]>([]);
Taro.useLoad(() => {
  api.addressController.getUserAddress().then((res) => {
    addressList.value = res;
  });
});
```

:::

:::info
[双向绑定](https://cn.vuejs.org/guide/components/v-model.html)
[地址展示组件`<address-row/>`](./address-row.md)
:::

### 选择事件

:::tabs
@tab html

```html {14,16-19}
<template>
  <div class="address-choose">
    <nut-popup
      :visible="visible"
      @update:visible="(value) => emit('update:visible', value)"
      position="bottom"
      closeable
      round
    >
      <div
        class="address-wrapper"
        :key="address.id"
        v-for="address in addressList"
        @click="handleChoose(address)"
      >
        <!-- 选中标识 ✔ -->
        <check color="red" v-if="address.id == chosenAddress.id"></check>
        <!-- 位置图标 -->
        <location2 color="red" v-else></location2>
        <address-row class="address" :address="address"> </address-row>
      </div>
    </nut-popup>
  </div>
</template>
```

@tab ts

处理选择事件，将选中的地址记录在`chosenAddress`中，并向外抛出选择事件，然后关闭弹出层。

```ts {10,17-21,24-28}
import { ref } from "vue";
import { AddressDto } from "@/apis/__generated/model/dto";
import { api } from "@/utils/api-instance";
import Taro from "@tarojs/taro";
import { Check, Location2 } from "@nutui/icons-vue-taro";
type SimpleAddressDto = AddressDto["AddressRepository/SIMPLE_FETCHER"];
defineProps<{ visible: boolean }>();
const emit = defineEmits<{
  "update:visible": [value: boolean];
  choose: [address: SimpleAddressDto];
}>();
const addressList = ref<SimpleAddressDto[]>([]);
const chosenAddress = ref({} as SimpleAddressDto);
Taro.useLoad(() => {
  api.addressController.getUserAddress().then((res) => {
    addressList.value = res;
    if (res.length > 0) {
      // 默认地址会在第一个
      chosenAddress.value = res[0];
      emit("choose", res[0]);
    }
  });
});
const handleChoose = (address: SimpleAddressDto) => {
  chosenAddress.value = address;
  emit("update:visible", false);
  emit("choose", address);
};
```

@tab css

```scss {2-7}
.address-choose {
  // 图标和地址垂直居中
  .address-wrapper {
    margin: 0 20px;
    display: flex;
    align-items: center;
  }
}
```

:::

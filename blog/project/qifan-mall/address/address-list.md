---
category:
  - 起凡商城
tag:
  - 地址
  - 地址列表
  - 小程序
order: 1
date: 2024-01-25
timeline: true
---
# 地址列表

![地址列表页面](./address-list.png =x350)

## 后端

### 建表

```sql
-- auto-generated definition
create table address
(
    id           varchar(36)  not null
        primary key,
    created_time datetime(6)  not null,
    edited_time  datetime(6)  not null,
    creator_id   varchar(36)  not null,
    editor_id    varchar(36)  not null,
    latitude     double       not null,
    longitude    double       not null,
    address      varchar(255) not null,
    province     varchar(255) not null,
    city         varchar(255) not null,
    district     varchar(255) not null,
    phone_number varchar(255) not null,
    real_name    varchar(255) not null,
    top          tinyint(1)   not null,
    details      varchar(255) not null
);
```

### 实体类

```java
@Entity
@GenEntity
public interface Address extends BaseEntity {

  @GenField(value = "维度", order = 0, type = ItemType.INPUT_NUMBER)
  double latitude();

  @GenField(value = "经度", order = 1, type = ItemType.INPUT_NUMBER)
  double longitude();

  @GenField(value = "地址信息", order = 2)
  String address();

  @GenField(value = "地址详情", order = 3)
  String details();

  @GenField(value = "省份", order = 4)
  String province();

  @GenField(value = "城市", order = 5)
  String city();

  @GenField(value = "区县", order = 6)
  String district();

  @GenField(value = "电话", order = 7)
  String phoneNumber();

  @GenField(value = "姓名", order = 8)
  String realName();

  @GenField(value = "是否置顶", order = 9)
  boolean top();
}
```

### 生成代码

请参照[开发流程](../start/develop.md)

### 用户地址查询/设置默认地址

:::tabs
@tab 简单抓取器
只需要返回基本字段就行了，不需要使用`COMPLEX_FETCHER`.

```java {7}
public interface AddressRepository extends JRepository<Address, String> {

  AddressTable addressTable = AddressTable.$;
  AddressFetcher COMPLEX_FETCHER = AddressFetcher.$.allScalarFields()
      .creator(UserFetcher.$.phone().nickname())
      .editor(UserFetcher.$.phone().nickname());
  AddressFetcher SIMPLE_FETCHER = AddressFetcher.$.allScalarFields();;

// 忽略...
}
```

@tab 查询方法/设置默认

```java {14-35}

当用户设置地址A为默认时，需要将其他地址设置为非默认，再将地址A设置为默认。

@Service
@Slf4j
@AllArgsConstructor
@Transactional
public class AddressService {

  private final AddressRepository addressRepository;

  // 忽略...

  public List<Address> getUserAddress() {
    AddressTable t = AddressTable.$;
    return addressRepository.sql().createQuery(t)
        .where(t.creator().id().eq(StpUtil.getLoginIdAsString()))
        // 默认地址排在上面
        .orderBy(t.top().desc())
        // 使用简单抓取器
        .select(t.fetch(AddressRepository.SIMPLE_FETCHER))
        .execute();
  }
  public Boolean top(String id) {
    AddressTable t = AddressTable.$;
    // 设置该用户的其他地址为非默认
    addressRepository.sql().createUpdate(t)
        .set(t.top(), false)
        .where(t.creator().id().eq(StpUtil.getLoginIdAsString()))
        .execute();
    // 设置传入的地址为默认
    addressRepository.update(AddressDraft.$.produce(draft -> draft.setId(id)
        .setTop(true)));
    return true;
  }
}
```

@tab API

返回类型需要使用`@FetchBy`声明返回的形状是什么，前端同步类型的时候，该接口返回的字段就会根据`SIMPLE_FETCHER`中抓取的字段来确定。

```java {10-18}
@RestController
@RequestMapping("address")
@AllArgsConstructor
@DefaultFetcherOwner(AddressRepository.class)
public class AddressController {

  private final AddressService addressService;
  // 忽略...

  @GetMapping("user")
  public List<@FetchBy(value = "SIMPLE_FETCHER") Address> getUserAddress() {
    return addressService.getUserAddress();
  }

  @PostMapping("top")
  public Boolean top(@RequestParam String id) {
    return addressService.top(id);
  }
}
```

:::

## 小程序端

### 地址展示

::::tabs
@tab html

```html
<template>
  <div class="address-list-page">
    <!-- 遍历地址列表并使用 address-row 组件展示地址 -->
    <address-row
      class="address"
      :key="address.id"
      :address="address"
      v-for="address in addressList"
    >
    </address-row>
  </div>
</template>

```

@tab css

```scss
page {
  background-color: #f5f5f5;
}
```

@tab ts

```ts
import { api } from "@/utils/api-instance";
import { switchPage } from "@/utils/common";
import AddressRow from "@/components/address/address-row.vue";
import Taro from "@tarojs/taro";
import { Edit, Del, Plus } from "@nutui/icons-vue-taro";
import { ref } from "vue";
import { AddressDto } from "@/apis/__generated/model/dto";
// 存储用户的地址列表
const addressList = ref<AddressDto["AddressRepository/SIMPLE_FETCHER"][]>([]);
const loadData = () => {
  api.addressController.getUserAddress().then((res) => {
    addressList.value = res;
  });
};
// 每次进入页面都会请求用户地址列表
Taro.useDidShow(() => {
  loadData();
});
```

::::

:::info
[地址详情展示组件(address-row)](../reference/mp/address-row.md)
:::

### 地址删除和编辑跳转

::::tabs
@tab html

```html {9-19}
<template>
  <div class="address-list-page">
    <address-row
      class="address"
      :key="address.id"
      :address="address"
      v-for="address in addressList"
    >
    <!-- 地址详情组件的插槽 -->
      <template #operation>
        <!-- 有两个操作按钮，删除和编辑 -->
        <div class="operations">
          <Del class="delete" @click="handleDelete(address.id)"></Del>
          <edit
            class="edit"
            @click="switchPage(`/pages/address/address-save?id=${address.id}`)"
          ></edit>
        </div>
      </template>
    </address-row>
  </div>
</template>
```

@tab css

```scss {2-10}
.address-list-page {
  // 让删除和编辑按钮垂直居中
  .operations {
    display: flex;
    justify-content: center;

    .edit {
      margin-left: 20px;
    }
  }
}
```

@tab ts

```ts {18-33}
import { api } from "@/utils/api-instance";
import { switchPage } from "@/utils/common";
import AddressRow from "@/components/address/address-row.vue";
import Taro from "@tarojs/taro";
import { Edit, Del, Plus } from "@nutui/icons-vue-taro";
import { ref } from "vue";
import { AddressDto } from "@/apis/__generated/model/dto";

const addressList = ref<AddressDto["AddressRepository/SIMPLE_FETCHER"][]>([]);
const loadData = () => {
  api.addressController.getUserAddress().then((res) => {
    addressList.value = res;
  });
};
Taro.useDidShow(() => {
  loadData();
});
const handleDelete = (id: string) => {
  //显示弹出框。有确认和取消两个按钮，不管点哪个都会进入success函数，需要判断是否点击了确认。
  Taro.showModal({
    title: "是否确认删除",
    showCancel: true,
    success: ({ confirm }) => {
      // 点击的是确认则删除地址
      if (confirm) {
        api.addressController.delete({ body: [id] }).then(() => {
          // 刷新数据
          loadData();
        });
      }
    },
  });
};
```

::::

### 新增地址跳转

::::tabs

@tab html

```html {4-10}
<template>
  <div class="address-list-page">
    <!-- 忽略... -->
    <div class="add-address" @click="switchPage('/pages/address/address-save')">
      <div class="btn">
        <plus></plus>
        添加收货地址
      </div>
    </div>
  </div>
</template>
```

@tab css

```scss {4-26}
.address-list-page {
  // 忽略 ...

  // 底部的白色区域
  .add-address {
    border-top: 1px solid rgba(black, 0.1);
    box-shadow: 10rpx -10rpx 10rpx rgba(black, 0.05);
    // 位置固定
    position: fixed;
    // 固定在底部
    bottom: 0;
    width: 100%;
    padding: 30rpx 0 60rpx 0;

    // 添加地址按钮
    .btn {
      margin: auto;
      justify-content: center;
      display: flex;
      align-items: center;
      background-image: linear-gradient(#fcd956, #f5d131);
      width: 600rpx;
      padding: 20rpx 0;
      border-radius: 10rpx;
    }
  }
}
```

::::

### 地址复制和默认

::::tabs
@tab html

```html {8,13-18}
<template>
  <div class="address-list-page">
    <address-row
      class="address"
      :key="address.id"
      :address="address"
      v-for="address in addressList"
      @longpress="showActionSheet(address)"
    >
    <!-- 忽略... -->
    </address-row>
    <!-- 忽略... -->
    <nut-action-sheet
      v-model:visible="show"
      :menu-items="actions"
      @choose="handleActionChoose"
    />
  </div>
</template>
```

@tab ts

```ts {1,3-35}
import { menuItems } from "@nutui/nutui-taro/dist/types/__VUE/actionsheet/index.taro.vue";
// 忽略...
// 控制是否显示操作菜单
const show = ref(false);
// 长按地址后这个值会变成目标地址
const activeAddress = ref({} as AddressDto["AddressRepository/SIMPLE_FETCHER"]);
// 菜单项
const actions = [{ name: "复制地址" }, { name: "设为默认" }] as menuItems[];
// 菜单项对应的操作
const actionMap = {
  ["复制地址"]: () => {
    // 复制地址到剪贴板
    const address = activeAddress.value;
    const value = `收件人：${address.realName}\n手机号码：${address.phoneNumber}\n详细地址：${address.address} ${address.details}`;
    Taro.setClipboardData({ data: value });
  },
  ["设为默认"]: () => {
    // 设置默认地址
    api.addressController.top({ id: activeAddress.value.id }).then(() => {
      loadData();
    });
  },
};
// 选择菜单后触发
const handleActionChoose = (action: menuItems) => {
  // 执行对应的操作
  actionMap[action.name]();
};
// 长按地址后触发，显示
const showActionSheet = (
  address: AddressDto["AddressRepository/SIMPLE_FETCHER"],
) => {
  activeAddress.value = address;
  show.value = true;
};
```

::::

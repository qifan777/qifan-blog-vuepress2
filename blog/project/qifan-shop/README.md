---
sidebar: heading
---

# 起凡小商店

## 前言

电商项目中的各种业务可以说是软件开发中的经典业务。比如多规格商品，优惠券，订单状态机，支付等等。每个一个经典业务都有它的设计思想，首先就是表的设计，表结构如何拆分。如果业务复杂的话还需要考虑到设计模式，比如策略模式，模板模式，状态模式，适配器模式。再深入到细节时就需要具备各种技术知识，比如ORM框架，Web框架（SpringMVC），多线程，IO，计算机基础知识，前端开发框架，UI框架等等。

而本项目没有深入到各种技术知识，不过在代码上看到也是会有注释的，主要是在于实现这些业务场景，理解其中业务设计思想。

## 技术栈

### 微信小程序端

在小程序端我选择使用京东的`Taro`小程序开发框架。其实采用`Taro`，`Uni-App`，`微信小程序官方语法`这三个框架开发并没有多大的差别。它们的配置，目录结构，API，都是遵循统一的规范。主要差别是在于`Taro`对于`Vue3`+`TypeScript`支持较好。

::: tip

在编写Vue代码时我大部分用的是[JSX(TSX)](https://cn.vuejs.org/guide/extras/render-function.html#jsx-tsx)。  其实就是Vue的渲染函数啦，相比于正常在`<template></template>` 中写的模板语法有一些改变，比如你看下面的`onClick={handleClick}`与模板语法中的`@click="handleClick"`就不太一样。总的来说你会写Vue只需要花一些时间学习一下JSX就行了，不用害怕这个JSX语法很困难之类的。

```vue

<script lang="tsx">
  import {ref} from "vue";
  import {defineComponent} from "vue";

  export default defineComponent({
    name: "User",
    components: {},
    setup() {
      const msg = ref("Hello World");
      const handleClick = () => {
        console.log("触发点击事件");
      };
      return () => (
          <div class="user">
            <div onClick={handleClick}>{msg.value}</div>
          </div>
      );
    },
  });
</script> 
<style lang="scss" scoped></style>
```

:::

| 技术         | 说明                                           | 官网                                                   |
|------------|----------------------------------------------|------------------------------------------------------|
| Taro       | 小程序统一开发框架                                    | <https://docs.taro.zone/>                              |
| NutUI      | 支持TypeScript提示的TaroUI组件库，80+ 高质量组件，覆盖移动端主流场景 | <https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/intro> |
| Pinia      | 全局状态管理框架                                     | <https://pinia.web3doc.top/>                           |
| TypeScript | 让 JS 具备类型声明                                  | <https://www.typescriptlang.org/>                      |
| ESLint     | 语法校验和格式整理                                    | <https://eslint.org/>                                  |

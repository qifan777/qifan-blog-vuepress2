# 起凡小商店

## 前言

电商项目中的各种业务可以说是软件开发中的经典业务。比如多规格商品，优惠券，订单状态机，支付等等。每个一个经典业务都有它的设计思想，首先就是表的设计，表结构如何拆分。如果业务复杂的话还需要考虑到设计模式，比如策略模式，模板模式，状态模式，适配器模式。再深入到细节时就需要具备各种技术知识，比如ORM框架，Web框架（SpringMVC），多线程，IO，计算机基础知识，前端开发框架，UI框架等等。

而本项目没有深入到各种技术知识，不过在代码上看到也是会有注释的，主要是在于实现这些业务场景，理解其中业务设计思想。

## 技术栈

### 微信小程序端

在小程序端我选择使用京东的`Taro`小程序开发框架。其实采用`Taro`，`Uni-App`，`微信小程序官方语法`这三个框架开发并没有多大的差别。它们的配置，目录结构，API，都是遵循统一的规范。主要差别是在于`Taro`对于`Vue3`+`TypeScript`支持较好。

::: tip

在编写Vue代码时我大部分用的是[`JSX(TSX)`](https://cn.vuejs.org/guide/extras/render-function.html#jsx-tsx)。 其实就是Vue的渲染函数啦，相比于正常在`<template></template>` 中写的模板语法有一些改变，比如你看下面的`onClick={handleClick}`与模板语法中的`@click="handleClick"`就不太一样。总的来说你会写Vue只需要花一些时间学习一下JSX就行了，不用害怕这个JSX语法很困难之类的。

```vue

<script lang="tsx">
  import {defineComponent, ref} from "vue";

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

| 技术         | 说明                                                                | 官网                                                     |
|------------|-------------------------------------------------------------------|--------------------------------------------------------|
| Taro       | 小程序统一开发框架                                                         | <https://docs.taro.zone/>                              |
| Vue3       | Vue 基于标准 HTML 拓展了一套模板语法。Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM | https://cn.vuejs.org/                                  |
| NutUI      | 支持TypeScript提示的TaroUI组件库，80+ 高质量组件，覆盖移动端主流场景                      | <https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/intro> |
| Pinia      | 全局状态管理框架，支持TypeScript类型提示                                         | <https://pinia.web3doc.top/>                           |
| TypeScript | 让 JS 具备类型声明                                                       | <https://www.typescriptlang.org/>                      |
| ESLint     | 语法校验和格式整理                                                         | <https://eslint.org/>                                  |

### Java服务端

以我做过十几个小程序项目和实际工作的经验来说，实际上大部分的需求都是增删改查，我前三年的所有项目的ORM框架都是选用`MyBatis（Plus）`。每次写动态查询、多表查询、字段映射、字段修改（增加/删除/修改）都需要耗费很多精力去修改Mapper。特别是当需求比较多时，大量的时间被这种无聊的增删改查SQL占用，写代码就变得很无趣。

最近的三个项目我都是用`JPA（Hibernate）`。`JPA`很好用但是国内用的人似乎不多，其实主要原因是因为`JPA`太难了，没有什么中文资料和好的开源项目。这个项目的ORM框架我依然选用`JPA`，大家放心我会详细的讲解`JPA`的基础知识，绝对会刷新大家对`JPA`的认知。

| 技术              | 说明                                                                             | 官网                                                                                     |
|-----------------|--------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| SpringBoot3     | Web应用开发框架，需要JDK17及以上版本                                                         | https://spring.io/projects/spring-boot                                                 |
| SaToken         | 一个轻量级 Java 权限认证框架，主要解决：登录认证、权限认证、单点登录、OAuth2.0、分布式Session会话、微服务网关鉴权 等一系列权限相关问题 | https://sa-token.cc/                                                                   |
| Spring Data JPA | 在Hibernate ORM框架上进行了增强。                                                        | https://spring.io/projects/spring-data-jpa/                                            |
| QiFanGenerator  | 自己写的代码生成器，快速生成前后端增删改查。                                                         | 无官网，在代码里面参考`@GenEentity`和`@GenField`就两个注解就行了                                           |
| Mapstruct       | DTO和Entity之间进行复杂的映射关系。                                                         | https://mapstruct.org/                                                                 |
| 阿里云OSS          | 存储图片，学习用途基本上免费。                                                                | [对象存储 OSS-阿里云帮助中心 (aliyun.com)](https://help.aliyun.com/zh/oss/)                       |
| 微信小程序服务端API     | 用户登录，订阅消息等接口                                                                   | [微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/)        |
| 微信支付V3          | 用户支付订单                                                                         | [微信支付开发者文档 (qq.com)](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/pages/index.shtml) |

### 后台管理端

后台管理端和小程序端使用的技术栈差不多。主要差别在后台管理的打包框架是`Vite`+`Vue官方插件`。小程序端是`Webpack`+`Taro插件`。当你了解各种技术的作用是什么之后就会发现，原来好多知识是可以复用的。只需要针对主要差别的地方去学习，这样才能够看懂官方文档。

::: tip

同样后台管理的模板语法也是`JSX`不是默认的`<template/>`模板语法。只需要重写学习模板语法这一章的内容就行了，剩下的内容一模一样。

:::

| 技术             | 说明                                                                | 官网                                   |
|----------------|-------------------------------------------------------------------|--------------------------------------|
| Vite           | 开箱即用的现代前端打包工具                                                     | https://cn.vitejs.dev/               |
| Vue3           | Vue 基于标准 HTML 拓展了一套模板语法。Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM | https://cn.vuejs.org/                |
| Vue Router     | Vue官方路由管理框架                                                       | https://router.vuejs.org/            |
| ElementUI Plus | 支持TypeScript提示的Vue3前端UI框架                                         | https://element-plus.gitee.io/zh-CN/ |
| Pinia          | 全局状态管理框架，支持TypeScript类型提示                                         | <https://pinia.web3doc.top/>         |
| TypeScript     | 让 JS 具备类型声明                                                       | <https://www.typescriptlang.org/>    |
| ESLint         | 语法校验和格式整理                                                         | <https://eslint.org/>                |
| DayJS          | 日期取值/赋值/运算等操作                                                     | https://dayjs.fenxianglu.cn/         |

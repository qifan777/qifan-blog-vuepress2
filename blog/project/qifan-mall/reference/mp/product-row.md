# 商品横向详情

::::tabs
@tab 骨架

```vue
<template>
   <!-- 左边显示封面，右边显示商品详情 -->
  <div class="qi-product">
    <!-- 封面 -->
    <image class="cover"></image>
    <!-- 商品详情，垂直展示详情 -->
    <div class="info">
      <!-- 商品名称 -->  
      <div class="name"></div>
      <!-- 商品描述 -->
      <div class="description">
      </div>
      <!-- 品牌 -->
      <div class="brand">
      </div>
      <!-- 商品价格 -->
      <div class="price-row">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
// 导入多行溢出scss函数
@import "../../app.scss";
.qi-product {
  padding: 15px 0;
  display: flex;
  align-items: flex-start;
  .cover {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }
  .info {
    // 撑开多余的空间
    flex: 1;
    margin-left: 20px;
    padding-right: 10px;
  }
}
</style>

```

@tab 封面/名称/描述

::::

```vue

```

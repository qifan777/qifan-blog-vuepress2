import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "起凡Code闲聊",
  description: "起凡Code闲聊",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});

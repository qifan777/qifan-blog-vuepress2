import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
    base: '/qifan-blog-vuepress2/',
    dest: 'blog/.vuepress/blog',
    lang: "zh-CN",
    title: "起凡Code闲聊",
    description: "起凡Code闲聊",

    theme,
    // Enable it with pwa
    // shouldPrefetch: false,
});

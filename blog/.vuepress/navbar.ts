import {navbar} from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "项目实战",
    icon: "pen-to-square",
    prefix: "/project/",
    children: [
      {text: '飞鸽邮筒', link: 'post-letter/'},
      {text: '多模块微服务实战', link: 'microservice-practice/book'},
      {text: 'ChatGPT助手', link: 'chatgpt-assistant/'}]
  },
  {
    text: '工具分享',
    icon:'screwdriver-wrench',
    prefix: "/tools/",
    children: [
      {text: '私有ChatGPT搭建', link: 'chatgpt/'},
      {text: '远程开发环境搭建', link: 'remote-develop/'},
      {text: 'vue-press2搭建博客', link: 'vue-press2/'},
      {text: 'CI/CD与Jenkins', link: 'jenkins/'},
    ]
  },
  {
    text: '知识分享',
    prefix: "/knowledge/",
    icon:"book",
    children: [
      {
        text: 'Spring',
        prefix: "spring/",
        children: [
          {text: 'AOP', link: 'aop'}, {text: '如何发送http请求各种参数', link: 'http'}
        ]
      },
      {
        text: 'JPA',
        prefix: "jpa/",
        children: [
          {
            text: 'Hibernate',
            link: 'hibernate/'
          }
        ]
      },
      {
        text: "Nginx博客/网站搭建",
        link: "website/"
      },
      {
        text: '前端工具链',
        link: "vite/"
      }
    ]
  },
]);

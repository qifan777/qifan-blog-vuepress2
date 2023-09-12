import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
  "/project/chatgpt-assistant":[
    {text: '项目介绍', link: '/project/chatgpt-assistant/'},
    {text: '第八期 websocket+stream请求+proxy', link: '/project/chatgpt-assistant/chapter8/'},
    {text: '第九期 Vue3/ElementUI Plus实现聊天面板', link: '/project/chatgpt-assistant/chapter9/'},
    {text: '第十期 消息发送和markdown显示消息记录', link: '/project/chatgpt-assistant/chapter10/'}
  ]
});

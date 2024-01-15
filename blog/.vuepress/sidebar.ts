import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/project/post-letter/": [
        {text: "飞鸽邮筒", link: "/project/post-letter/"},
        {text: "后端介绍", link: "/project/post-letter/springboot/"},
        {text: "小程序介绍", link: "/project/post-letter/uni-app/"},
        {text: "后台管理介绍", link: "/project/post-letter/vue3/"},
    ],
    "/project/chatgpt-assistant/": [
        {text: "项目介绍", link: "/project/chatgpt-assistant/"},
        {
            text: "第八期 websocket+stream请求+proxy",
            link: "/project/chatgpt-assistant/chapter8/",
        },
        {
            text: "第九期 Vue3/ElementUI Plus实现聊天面板",
            link: "/project/chatgpt-assistant/chapter9/",
        },
        {
            text: "第十期 消息发送和markdown显示消息记录",
            link: "/project/chatgpt-assistant/chapter10/",
        },
    ],
    "/project/qifan-shop/": [
        {text: "项目介绍", link: "/project/qifan-shop/"},
        {text: "参考", prefix: "reference/", children: "structure"},
        {text: "商品模块", prefix: "product/", children: "structure"},
    ],
    "/project/qifan-mall/": [
        "",
        {text: "快速上手", prefix: "start/", children: "structure"},
        {text: "登录注册", prefix: "login/", children: 'structure'},
        "dict",
        {text: "权限", prefix: "permission2/", children: "structure"},
        {text: "参考", prefix: "reference/", children: "structure"},
    ],
    "/knowledge/newland/": [
        {text: "云边实体登记自动化", link: "/knowledge/newland/"},
        {text: "脚本迁移登记自动化", link: "/knowledge/newland/script/"},
    ],
    "/knowledge/worker/": [
        {text: "平台开发组工作", link: "/knowledge/worker/"},
        {
            text: "一经开发工作",
            collapsible: true,
            children: [
                {text: "一经实体登记自动化", link: "/knowledge/worker/onebass/"},
                {
                    text: "一经脚本迁移自动化",
                    link: "/knowledge/worker/onebass/script/",
                },
            ],
        },
    ],
    "/knowledge/vite/": [
        {text: "Vite", link: "/knowledge/vite/"},
        {
            text: "Vue",
            link: "/knowledge/vite/vue",
        },
        {
            text: "ESLint",
            link: "/knowledge/vite/eslint",
        },
        {
            text: "TypeScript",
            link: "/knowledge/vite/typescript",
        },
    ],
    "/knowledge/jpa/hibernate": "structure",
    "/tools/idea": "structure",
});

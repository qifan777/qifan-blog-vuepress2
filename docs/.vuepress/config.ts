import {defaultTheme, defineUserConfig} from "vuepress";

export default defineUserConfig({
    lang: 'zh-CN',
    title: '起凡code闲聊',
    port:8081,
    description: '起凡全栈项目分享',
    theme: defaultTheme({
        logo: '/images/logo.jpg',
        navbar: [
            {
                text: '项目实战',
                children: [
                    {text: '飞鸽邮筒', link: '/project/post-letter/'},
                    {text: '多模块微服务实战', link: '/project/microservice-practice/book'},
                    {text: 'ChatGPT助手', link: '/project/chatgpt-assistant/'}
                ]
            },
            {
                text: '工具分享',
                children: [
                    {text: '私有ChatGPT搭建', link: '/tools/chatgpt/'}
                ]
            },
            {
                text: '知识分享',
                children: [
                    {
                        text: 'spring boot技巧',
                        children: [
                            {text: 'aop', link: '/knowledge/spring/aop/'}, {
                                text: '如何发送http请求各种参数',
                                link: '/knowledge/spring/http/'
                            }
                        ]
                    },
                    {
                        text: 'jpa',
                        children: [
                            {
                                text: 'hibernate',
                                link: '/knowledge/jpa/hibernate/'
                            }
                        ]
                    }
                ]
            }
        ],
        sidebar: {
            '/project/post-letter/': [
                {text: '飞鸽邮筒', link: '/project/post-letter/'},
                {text: '后端介绍', link: '/project/post-letter/springboot/'},
                {text: '小程序介绍', link: '/project/post-letter/uni-app/'},
                {text: '后台管理介绍', link: '/project/post-letter/vue3/'}
            ],
            '/project/chatgpt-assistant/': [
                {text: '项目介绍', link: '/project/chatgpt-assistant/'},
                {text: '第八期 websocket+stream请求+proxy', link: '/project/chatgpt-assistant/chapter8/'}
            ]
        }
    })
})
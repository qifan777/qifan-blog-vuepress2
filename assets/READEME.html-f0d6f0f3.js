const e=JSON.parse('{"key":"v-980eec4c","path":"/knowledge/mp/login/READEME.html","title":"小程序登录功能","lang":"zh-CN","frontmatter":{"description":"小程序登录功能 OpenID 登录 一个微信用户在不同的小程序中 openId 是不一样的。但是在同一个小程序中 openId 是固定的。也无法通过 openId 获取微信的用户信息。 用户点击登录按钮，小程序调用 wx.login 获取 code 小程序调用微信服务器，向微信服务器发送 code，获取 openid 小程序将 openid 存储在数据库，以便后续登录使用","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/knowledge/mp/login/READEME.html"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"小程序登录功能"}],["meta",{"property":"og:description","content":"小程序登录功能 OpenID 登录 一个微信用户在不同的小程序中 openId 是不一样的。但是在同一个小程序中 openId 是固定的。也无法通过 openId 获取微信的用户信息。 用户点击登录按钮，小程序调用 wx.login 获取 code 小程序调用微信服务器，向微信服务器发送 code，获取 openid 小程序将 openid 存储在数据库，以便后续登录使用"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-07T11:44:31.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:modified_time","content":"2024-01-07T11:44:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"小程序登录功能\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-07T11:44:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"OpenID 登录","slug":"openid-登录","link":"#openid-登录","children":[]},{"level":2,"title":"手机号+openId 登录","slug":"手机号-openid-登录","link":"#手机号-openid-登录","children":[{"level":3,"title":"微信小程序 API 获取手机号","slug":"微信小程序-api-获取手机号","link":"#微信小程序-api-获取手机号","children":[]},{"level":3,"title":"自己实现手机号输入框","slug":"自己实现手机号输入框","link":"#自己实现手机号输入框","children":[]}]},{"level":2,"title":"实现","slug":"实现","link":"#实现","children":[{"level":3,"title":"前端","slug":"前端","link":"#前端","children":[]},{"level":3,"title":"后端","slug":"后端","link":"#后端","children":[]}]}],"git":{"createdTime":1704627871000,"updatedTime":1704627871000,"contributors":[{"name":"linjiacheng","email":"1507906763@qq.com","commits":1}]},"readingTime":{"minutes":4.31,"words":1293},"filePathRelative":"knowledge/mp/login/READEME.md","localizedDate":"2024年1月7日","excerpt":"<h1> 小程序登录功能</h1>\\n<h2> OpenID 登录</h2>\\n<p>一个微信用户在不同的小程序中 openId 是不一样的。但是在同一个小程序中 openId 是固定的。也无法通过 openId 获取微信的用户信息。</p>\\n<ul>\\n<li>\\n<ol>\\n<li>用户点击登录按钮，小程序调用 wx.login 获取 code</li>\\n</ol>\\n</li>\\n<li>\\n<ol start=\\"2\\">\\n<li>小程序调用微信服务器，向微信服务器发送 code，获取 openid</li>\\n</ol>\\n</li>\\n<li>\\n<ol start=\\"3\\">\\n<li>小程序将 openid 存储在数据库，以便后续登录使用</li>\\n</ol>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
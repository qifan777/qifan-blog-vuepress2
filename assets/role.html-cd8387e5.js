const e=JSON.parse('{"key":"v-194494c6","path":"/project/qifan-mall/permission/role.html","title":"角色","lang":"zh-CN","frontmatter":{"description":"角色 角色的创建修改和用户的创建修改差不多是一个意思。 创建角色配置菜单 修改dto 增加menuIds input RoleInput { #allScalars(Role) id? // 用于接收菜单id列表 menuIds: Array&lt;String&gt; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/project/qifan-mall/permission/role.html"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"角色"}],["meta",{"property":"og:description","content":"角色 角色的创建修改和用户的创建修改差不多是一个意思。 创建角色配置菜单 修改dto 增加menuIds input RoleInput { #allScalars(Role) id? // 用于接收菜单id列表 menuIds: Array&lt;String&gt; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-07T11:44:31.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:modified_time","content":"2024-01-07T11:44:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"角色\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-07T11:44:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"创建角色配置菜单","slug":"创建角色配置菜单","link":"#创建角色配置菜单","children":[{"level":3,"title":"修改dto","slug":"修改dto","link":"#修改dto","children":[]},{"level":3,"title":"前端实现","slug":"前端实现","link":"#前端实现","children":[]},{"level":3,"title":"","slug":"","link":"#","children":[]}]}],"git":{"createdTime":1704627871000,"updatedTime":1704627871000,"contributors":[{"name":"linjiacheng","email":"1507906763@qq.com","commits":1}]},"readingTime":{"minutes":0.21,"words":63},"filePathRelative":"project/qifan-mall/permission/role.md","localizedDate":"2024年1月7日","excerpt":"<h1> 角色</h1>\\n<p>角色的创建修改和<a href=\\"/blog/project/qifan-mall/permission/user.html\\" target=\\"blank\\">用户的创建修改</a>差不多是一个意思。</p>\\n<h2> 创建角色配置菜单</h2>\\n<h3> 修改dto</h3>\\n<p>增加<code>menuIds</code></p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code>input <span class=\\"token class-name\\">RoleInput</span> <span class=\\"token punctuation\\">{</span>\\n    #<span class=\\"token function\\">allScalars</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Role</span><span class=\\"token punctuation\\">)</span>\\n    id<span class=\\"token operator\\">?</span>\\n    <span class=\\"token comment\\">// 用于接收菜单id列表</span>\\n    menuIds<span class=\\"token operator\\">:</span> <span class=\\"token class-name\\">Array</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};

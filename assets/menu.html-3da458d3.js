const n=JSON.parse('{"key":"v-f7546b58","path":"/project/qifan-mall/permission/menu.html","title":"角色菜单","lang":"zh-CN","frontmatter":{"category":["起凡商城"],"tag":["菜单","权限管理"],"order":2,"date":"2024-01-16T00:00:00.000Z","timeline":true,"description":"角色菜单 建表 菜单表 -- auto-generated definition create table menu ( id varchar(36) not null primary key, created_time datetime(6) not null, edited_time datetime(6) not null, creator_id varchar(36) not null, editor_id varchar(36) not null, name varchar(20) not null, path varchar(2000) not null, parent_id varchar(36) null, order_num int null, menu_type varchar(36) not null, icon varchar(255) null );","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/qifan-blog-vuepress2/project/qifan-mall/permission/menu.html"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"角色菜单"}],["meta",{"property":"og:description","content":"角色菜单 建表 菜单表 -- auto-generated definition create table menu ( id varchar(36) not null primary key, created_time datetime(6) not null, edited_time datetime(6) not null, creator_id varchar(36) not null, editor_id varchar(36) not null, name varchar(20) not null, path varchar(2000) not null, parent_id varchar(36) null, order_num int null, menu_type varchar(36) not null, icon varchar(255) null );"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-17T01:42:30.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:tag","content":"菜单"}],["meta",{"property":"article:tag","content":"权限管理"}],["meta",{"property":"article:published_time","content":"2024-01-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-17T01:42:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"角色菜单\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-17T01:42:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"建表","slug":"建表","link":"#建表","children":[{"level":3,"title":"菜单表","slug":"菜单表","link":"#菜单表","children":[]},{"level":3,"title":"角色菜单中间表","slug":"角色菜单中间表","link":"#角色菜单中间表","children":[]}]},{"level":2,"title":"实体建模","slug":"实体建模","link":"#实体建模","children":[{"level":3,"title":"菜单类型枚举","slug":"菜单类型枚举","link":"#菜单类型枚举","children":[]},{"level":3,"title":"菜单实体类","slug":"菜单实体类","link":"#菜单实体类","children":[]},{"level":3,"title":"角色菜单中间表实体类","slug":"角色菜单中间表实体类","link":"#角色菜单中间表实体类","children":[]}]},{"level":2,"title":"菜单父亲选择","slug":"菜单父亲选择","link":"#菜单父亲选择","children":[{"level":3,"title":"创建时选择父亲菜单","slug":"创建时选择父亲菜单","link":"#创建时选择父亲菜单","children":[]},{"level":3,"title":"编辑时回显菜单","slug":"编辑时回显菜单","link":"#编辑时回显菜单","children":[]}]},{"level":2,"title":"创建角色配置菜单","slug":"创建角色配置菜单","link":"#创建角色配置菜单","children":[{"level":3,"title":"Dto新增MenuIds","slug":"dto新增menuids","link":"#dto新增menuids","children":[]},{"level":3,"title":"后端保存角色","slug":"后端保存角色","link":"#后端保存角色","children":[]},{"level":3,"title":"创建角色时配置菜单","slug":"创建角色时配置菜单","link":"#创建角色时配置菜单","children":[]}]},{"level":2,"title":"修改角色回显菜单","slug":"修改角色回显菜单","link":"#修改角色回显菜单","children":[{"level":3,"title":"后端查询角色菜单","slug":"后端查询角色菜单","link":"#后端查询角色菜单","children":[]},{"level":3,"title":"前端回显","slug":"前端回显","link":"#前端回显","children":[]}]}],"git":{"createdTime":1704627871000,"updatedTime":1705455750000,"contributors":[{"name":"linjiacheng","email":"1507906763@qq.com","commits":2}]},"readingTime":{"minutes":3.89,"words":1167},"filePathRelative":"project/qifan-mall/permission/menu.md","localizedDate":"2024年1月16日","excerpt":"<h1> 角色菜单</h1>\\n<h2> 建表</h2>\\n<h3> 菜单表</h3>\\n<div class=\\"language-sql line-numbers-mode\\" data-ext=\\"sql\\"><pre class=\\"language-sql\\"><code><span class=\\"token comment\\">-- auto-generated definition</span>\\n<span class=\\"token keyword\\">create</span> <span class=\\"token keyword\\">table</span> menu\\n<span class=\\"token punctuation\\">(</span>\\n    id           <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span>\\n        <span class=\\"token keyword\\">primary</span> <span class=\\"token keyword\\">key</span><span class=\\"token punctuation\\">,</span>\\n    created_time <span class=\\"token keyword\\">datetime</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    edited_time  <span class=\\"token keyword\\">datetime</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    creator_id   <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    editor_id    <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    name         <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">20</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    path         <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2000</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    parent_id    <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    order_num    <span class=\\"token keyword\\">int</span>           <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    menu_type    <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    icon         <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>  <span class=\\"token boolean\\">null</span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};

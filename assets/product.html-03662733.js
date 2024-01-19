const n=JSON.parse('{"key":"v-0d4e9a24","path":"/project/qifan-mall/product/product.html","title":"商品管理","lang":"zh-CN","frontmatter":{"description":"商品管理 建表 -- auto-generated definition create table product ( id varchar(36) not null primary key, created_time datetime(6) not null, edited_time datetime(6) not null, creator_id varchar(36) not null, editor_id varchar(36) not null, name varchar(255) not null, price decimal(10, 2) not null, cover varchar(255) not null, brand varchar(255) not null, category_id varchar(36) not null, stock int not null, description text not null, tags varchar(255) not null, specifications text not null, attributes text not null );","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/qifan-blog-vuepress2/project/qifan-mall/product/product.html"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"商品管理"}],["meta",{"property":"og:description","content":"商品管理 建表 -- auto-generated definition create table product ( id varchar(36) not null primary key, created_time datetime(6) not null, edited_time datetime(6) not null, creator_id varchar(36) not null, editor_id varchar(36) not null, name varchar(255) not null, price decimal(10, 2) not null, cover varchar(255) not null, brand varchar(255) not null, category_id varchar(36) not null, stock int not null, description text not null, tags varchar(255) not null, specifications text not null, attributes text not null );"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-19T08:55:52.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:modified_time","content":"2024-01-19T08:55:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"商品管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-19T08:55:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"建表","slug":"建表","link":"#建表","children":[]}],"git":{"createdTime":1705654552000,"updatedTime":1705654552000,"contributors":[{"name":"linjiacheng","email":"1507906763@qq.com","commits":1}]},"readingTime":{"minutes":0.29,"words":87},"filePathRelative":"project/qifan-mall/product/product.md","localizedDate":"2024年1月19日","excerpt":"<h1> 商品管理</h1>\\n<h2> 建表</h2>\\n<div class=\\"language-sql line-numbers-mode\\" data-ext=\\"sql\\"><pre class=\\"language-sql\\"><code><span class=\\"token comment\\">-- auto-generated definition</span>\\n<span class=\\"token keyword\\">create</span> <span class=\\"token keyword\\">table</span> product\\n<span class=\\"token punctuation\\">(</span>\\n    id             <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span>\\n        <span class=\\"token keyword\\">primary</span> <span class=\\"token keyword\\">key</span><span class=\\"token punctuation\\">,</span>\\n    created_time   <span class=\\"token keyword\\">datetime</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    edited_time    <span class=\\"token keyword\\">datetime</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    creator_id     <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    editor_id      <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    name           <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    price          <span class=\\"token keyword\\">decimal</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    cover          <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    brand          <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    category_id    <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    stock          <span class=\\"token keyword\\">int</span>            <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    description    <span class=\\"token keyword\\">text</span>           <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    tags           <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    specifications <span class=\\"token keyword\\">text</span>           <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    attributes     <span class=\\"token keyword\\">text</span>           <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};

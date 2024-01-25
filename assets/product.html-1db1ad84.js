const n=JSON.parse('{"key":"v-0d4e9a24","path":"/project/qifan-mall/product/product.html","title":"商品管理","lang":"zh-CN","frontmatter":{"category":["起凡商城"],"tag":["商品管理","商品信息"],"order":2,"date":"2024-01-19T00:00:00.000Z","timeline":true,"description":"商品管理 商品信息 建表 -- auto-generated definition create table product ( id varchar(36) not null primary key, created_time datetime(6) not null, edited_time datetime(6) not null, creator_id varchar(36) not null, editor_id varchar(36) not null, name varchar(255) not null, price decimal(10, 2) not null, cover varchar(255) not null, brand varchar(255) not null, category_id varchar(36) not null, stock int not null, description text not null, tags varchar(255) not null, specifications text not null, attributes text not null );","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/qifan-blog-vuepress2/project/qifan-mall/product/product.html"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"商品管理"}],["meta",{"property":"og:description","content":"商品管理 商品信息 建表 -- auto-generated definition create table product ( id varchar(36) not null primary key, created_time datetime(6) not null, edited_time datetime(6) not null, creator_id varchar(36) not null, editor_id varchar(36) not null, name varchar(255) not null, price decimal(10, 2) not null, cover varchar(255) not null, brand varchar(255) not null, category_id varchar(36) not null, stock int not null, description text not null, tags varchar(255) not null, specifications text not null, attributes text not null );"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-25T11:24:46.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:tag","content":"商品管理"}],["meta",{"property":"article:tag","content":"商品信息"}],["meta",{"property":"article:published_time","content":"2024-01-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-25T11:24:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"商品管理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-25T11:24:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"建表","slug":"建表","link":"#建表","children":[]},{"level":2,"title":"实体类","slug":"实体类","link":"#实体类","children":[]},{"level":2,"title":"生成代码","slug":"生成代码","link":"#生成代码","children":[]},{"level":2,"title":"商品类别选择","slug":"商品类别选择","link":"#商品类别选择","children":[{"level":3,"title":"修改Dto","slug":"修改dto","link":"#修改dto","children":[]},{"level":3,"title":"远程选择器","slug":"远程选择器","link":"#远程选择器","children":[]}]},{"level":2,"title":"标签输入","slug":"标签输入","link":"#标签输入","children":[]},{"level":2,"title":"规格输入","slug":"规格输入","link":"#规格输入","children":[]},{"level":2,"title":"属性输入","slug":"属性输入","link":"#属性输入","children":[]}],"git":{"createdTime":1705654552000,"updatedTime":1706181886000,"contributors":[{"name":"linjiacheng","email":"1507906763@qq.com","commits":3}]},"readingTime":{"minutes":2.41,"words":722},"filePathRelative":"project/qifan-mall/product/product.md","localizedDate":"2024年1月19日","excerpt":"<h1> 商品管理</h1>\\n<figure><figcaption>商品信息</figcaption></figure>\\n<h2> 建表</h2>\\n<div class=\\"language-sql line-numbers-mode\\" data-ext=\\"sql\\"><pre class=\\"language-sql\\"><code><span class=\\"token comment\\">-- auto-generated definition</span>\\n<span class=\\"token keyword\\">create</span> <span class=\\"token keyword\\">table</span> product\\n<span class=\\"token punctuation\\">(</span>\\n    id             <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span>\\n        <span class=\\"token keyword\\">primary</span> <span class=\\"token keyword\\">key</span><span class=\\"token punctuation\\">,</span>\\n    created_time   <span class=\\"token keyword\\">datetime</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    edited_time    <span class=\\"token keyword\\">datetime</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    creator_id     <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    editor_id      <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    name           <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    price          <span class=\\"token keyword\\">decimal</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    cover          <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    brand          <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    category_id    <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">36</span><span class=\\"token punctuation\\">)</span>    <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    stock          <span class=\\"token keyword\\">int</span>            <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    description    <span class=\\"token keyword\\">text</span>           <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    tags           <span class=\\"token keyword\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">255</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    specifications <span class=\\"token keyword\\">text</span>           <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span><span class=\\"token punctuation\\">,</span>\\n    attributes     <span class=\\"token keyword\\">text</span>           <span class=\\"token operator\\">not</span> <span class=\\"token boolean\\">null</span>\\n<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};

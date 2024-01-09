const e=JSON.parse('{"key":"v-02b34382","path":"/knowledge/jpa/hibernate/criteria.html","title":"2. 动态SQL（Criteria）","lang":"zh-CN","frontmatter":{"category":["JPA"],"tag":["ORM","JPA","Hibernate","动态SQL","Criteria"],"date":"2023-09-27T00:00:00.000Z","timeline":true,"order":2,"description":"2. 动态SQL（Criteria） GitHub链接 在JPA中写SQL三种方式 JPQL 如果你的SQL语句不是动态的那建议使用JPQL，JPQL和SQL写起来差不多。主要区别是JPQL是面向实体类，SQL是直接面向底层的表。 Criteria Criteria 查询提供了用编程的形式去写JPQL，同时它也是类型安全的。通过它可以编写动态的JPQL，比如where条件动态拼接，order by 动态字段等操作。相比于传统的字符串SQL拼接，它的优点就是类型安全。Criteria你也可以说是JPQL的编程版本。 NativeSQL 由于JPQL提供的是所有数据库通用的写法，如果你想使用具体数据库的特性，可以写NativeSQL（原生SQL）。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/knowledge/jpa/hibernate/criteria.html"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"2. 动态SQL（Criteria）"}],["meta",{"property":"og:description","content":"2. 动态SQL（Criteria） GitHub链接 在JPA中写SQL三种方式 JPQL 如果你的SQL语句不是动态的那建议使用JPQL，JPQL和SQL写起来差不多。主要区别是JPQL是面向实体类，SQL是直接面向底层的表。 Criteria Criteria 查询提供了用编程的形式去写JPQL，同时它也是类型安全的。通过它可以编写动态的JPQL，比如where条件动态拼接，order by 动态字段等操作。相比于传统的字符串SQL拼接，它的优点就是类型安全。Criteria你也可以说是JPQL的编程版本。 NativeSQL 由于JPQL提供的是所有数据库通用的写法，如果你想使用具体数据库的特性，可以写NativeSQL（原生SQL）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-01T05:34:53.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:tag","content":"ORM"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:tag","content":"动态SQL"}],["meta",{"property":"article:tag","content":"Criteria"}],["meta",{"property":"article:published_time","content":"2023-09-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-01T05:34:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2. 动态SQL（Criteria）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-01T05:34:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"简单的JPQL例子","slug":"简单的jpql例子","link":"#简单的jpql例子","children":[{"level":3,"title":"连接（Join）","slug":"连接-join","link":"#连接-join","children":[]},{"level":3,"title":"路径导航（Path Navigation）","slug":"路径导航-path-navigation","link":"#路径导航-path-navigation","children":[]}]},{"level":2,"title":"简单的Criteria例子","slug":"简单的criteria例子","link":"#简单的criteria例子","children":[]},{"level":2,"title":"Select","slug":"select","link":"#select","children":[{"level":3,"title":"SelectExpression","slug":"selectexpression","link":"#selectexpression","children":[]},{"level":3,"title":"SelectMultiExpression","slug":"selectmultiexpression","link":"#selectmultiexpression","children":[]},{"level":3,"title":"SelectDto1","slug":"selectdto1","link":"#selectdto1","children":[]},{"level":3,"title":"SelectDto2","slug":"selectdto2","link":"#selectdto2","children":[]},{"level":3,"title":"SelectRoot","slug":"selectroot","link":"#selectroot","children":[]},{"level":3,"title":"SelectMultiRoot","slug":"selectmultiroot","link":"#selectmultiroot","children":[]}]},{"level":2,"title":"条件表达式（Conditional Expressions）","slug":"条件表达式-conditional-expressions","link":"#条件表达式-conditional-expressions","children":[{"level":3,"title":"比较运算","slug":"比较运算","link":"#比较运算","children":[]},{"level":3,"title":"逻辑运算","slug":"逻辑运算","link":"#逻辑运算","children":[]},{"level":3,"title":"Null运算","slug":"null运算","link":"#null运算","children":[]},{"level":3,"title":"Between","slug":"between","link":"#between","children":[]},{"level":3,"title":"In/Not In","slug":"in-not-in","link":"#in-not-in","children":[]},{"level":3,"title":"like","slug":"like","link":"#like","children":[]}]},{"level":2,"title":"Join","slug":"join","link":"#join","children":[]},{"level":2,"title":"GroupByHaving","slug":"groupbyhaving","link":"#groupbyhaving","children":[]},{"level":2,"title":"OrderBy","slug":"orderby","link":"#orderby","children":[]},{"level":2,"title":"子查询（SubQuery）","slug":"子查询-subquery","link":"#子查询-subquery","children":[]}],"git":{"createdTime":1695482163000,"updatedTime":1696138493000,"contributors":[{"name":"qifan","email":"1507906763@qq.com","commits":3},{"name":"起凡","email":"1507906763@qq.com","commits":2}]},"readingTime":{"minutes":10.35,"words":3105},"filePathRelative":"knowledge/jpa/hibernate/criteria.md","localizedDate":"2023年9月27日","excerpt":"<h1> 2. 动态SQL（Criteria）</h1>\\n<p><a href=\\"https://github.com/qifan777/JPA-Hibernate-SpringDataJPA\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">GitHub链接</a></p>\\n<p>在JPA中写SQL三种方式</p>\\n<ul>\\n<li>JPQL<br>\\n如果你的SQL语句不是动态的那建议使用JPQL，JPQL和SQL写起来差不多。主要区别是JPQL是面向实体类，SQL是直接面向底层的表。</li>\\n<li>Criteria<br>\\nCriteria 查询提供了用编程的形式去写JPQL，同时它也是类型安全的。通过它可以编写动态的JPQL，比如where条件动态拼接，order by 动态字段等操作。相比于传统的字符串SQL拼接，它的优点就是类型安全。Criteria你也可以说是JPQL的编程版本。</li>\\n<li>NativeSQL<br>\\n由于JPQL提供的是所有数据库通用的写法，如果你想使用具体数据库的特性，可以写NativeSQL（原生SQL）。</li>\\n</ul>","autoDesc":true}');export{e as data};

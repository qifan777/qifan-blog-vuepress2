const e=JSON.parse('{"key":"v-2cce667b","path":"/knowledge/jpa/hibernate/","title":"1. 领域模型（Domain Model）","lang":"zh-CN","frontmatter":{"category":["JPA"],"tag":["ORM","Hibernate","JPA建模"],"date":"2023-03-01T00:00:00.000Z","timeline":true,"description":"如何使用Hibernate进行Java到数据库的映射。映射完后程序员只需针对Java的对象进行操作就可以实现增删改查。因此如何用Hibernate建模是一个值得深入学习的内容，它主要影响的就是create table xxx (...)。当然也会影响到增删改查。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/knowledge/jpa/hibernate/"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"1. 领域模型（Domain Model）"}],["meta",{"property":"og:description","content":"如何使用Hibernate进行Java到数据库的映射。映射完后程序员只需针对Java的对象进行操作就可以实现增删改查。因此如何用Hibernate建模是一个值得深入学习的内容，它主要影响的就是create table xxx (...)。当然也会影响到增删改查。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-15T12:37:15.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:tag","content":"ORM"}],["meta",{"property":"article:tag","content":"Hibernate"}],["meta",{"property":"article:tag","content":"JPA建模"}],["meta",{"property":"article:published_time","content":"2023-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-15T12:37:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"1. 领域模型（Domain Model）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-15T12:37:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"1.1 Hibernate类型","slug":"_1-1-hibernate类型","link":"#_1-1-hibernate类型","children":[{"level":3,"title":"1.1.1 值类型(Value Type)","slug":"_1-1-1-值类型-value-type","link":"#_1-1-1-值类型-value-type","children":[]},{"level":3,"title":"1.1.2 实体类型（Entity Type）","slug":"_1-1-2-实体类型-entity-type","link":"#_1-1-2-实体类型-entity-type","children":[]}]},{"level":2,"title":"1.2 基本类型","slug":"_1-2-基本类型","link":"#_1-2-基本类型","children":[{"level":3,"title":"1.2.1 枚举类型","slug":"_1-2-1-枚举类型","link":"#_1-2-1-枚举类型","children":[]},{"level":3,"title":"1.2.2 Boolean","slug":"_1-2-2-boolean","link":"#_1-2-2-boolean","children":[]},{"level":3,"title":"1.2.3 Date/Time","slug":"_1-2-3-date-time","link":"#_1-2-3-date-time","children":[]},{"level":3,"title":"1.2.4 自定义映射规则","slug":"_1-2-4-自定义映射规则","link":"#_1-2-4-自定义映射规则","children":[]}]},{"level":2,"title":"1.3 嵌套类型","slug":"_1-3-嵌套类型","link":"#_1-3-嵌套类型","children":[]},{"level":2,"title":"1.4 实体类型","slug":"_1-4-实体类型","link":"#_1-4-实体类型","children":[{"level":3,"title":"1.4.1 映射实体类","slug":"_1-4-1-映射实体类","link":"#_1-4-1-映射实体类","children":[]}]},{"level":2,"title":"1.5 主键","slug":"_1-5-主键","link":"#_1-5-主键","children":[{"level":3,"title":"1.5.1 简单主键","slug":"_1-5-1-简单主键","link":"#_1-5-1-简单主键","children":[]},{"level":3,"title":"1.5.2 组合主键","slug":"_1-5-2-组合主键","link":"#_1-5-2-组合主键","children":[]}]},{"level":2,"title":"1.6 关联","slug":"_1-6-关联","link":"#_1-6-关联","children":[{"level":3,"title":"@ManyToOne","slug":"manytoone","link":"#manytoone","children":[]},{"level":3,"title":"@OneToMany","slug":"onetomany","link":"#onetomany","children":[]},{"level":3,"title":"@OneToOne","slug":"onetoone","link":"#onetoone","children":[]},{"level":3,"title":"@ManyToMany","slug":"manytomany","link":"#manytomany","children":[]},{"level":3,"title":"@OneToMany+中间表","slug":"onetomany-中间表","link":"#onetomany-中间表","children":[]}]}],"git":{"createdTime":1694651468000,"updatedTime":1697373435000,"contributors":[{"name":"qifan","email":"1507906763@qq.com","commits":6},{"name":"起凡","email":"1507906763@qq.com","commits":4}]},"readingTime":{"minutes":17.3,"words":5191},"filePathRelative":"knowledge/jpa/hibernate/README.md","localizedDate":"2023年3月1日","excerpt":"<p>如何使用Hibernate进行Java到数据库的映射。映射完后程序员只需针对Java的对象进行操作就可以实现增删改查。因此如何用Hibernate建模是一个值得深入学习的内容，它主要影响的就是create<br>\\ntable xxx (...)。当然也会影响到增删改查。</p>\\n","autoDesc":true}');export{e as data};

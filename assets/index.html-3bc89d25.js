const n=JSON.parse('{"key":"v-aae5c748","path":"/project/qifan-shop/reference/","title":"后端基础","lang":"zh-CN","frontmatter":{"category":["起凡小商店","后端基础"],"tag":["JPA","函数式抽象"],"date":"2023-09-10T00:00:00.000Z","timeline":true,"description":"后端基础 BaseEntity 所有的实体都会继承该基础实体，里面包含了主键Id和Id的 @MappedSuperclass @Getter @Setter @ToString @RequiredArgsConstructor public abstract class BaseEntity extends AbstractAggregateRoot&lt;BaseEntity&gt; { static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator(); // 主键 @Id // UUID生成策略 @GeneratedValue(strategy = GenerationType.UUID) private String id; // 创建时间不允许修改，且不能为空 @Column(name = \\"created_at\\", nullable = false, updatable = false) // 创建时自动填写当前时间 @CreationTimestamp private LocalDateTime createdAt; // 更新时间 @Column(name = \\"updated_at\\", nullable = false) // 更新时自动填写当前时间 @UpdateTimestamp private LocalDateTime updatedAt; // 乐观锁并发控制 @Version @Column(name = \\"version\\") private Integer version; // 实体插入到数据库之前的扩展点 @PrePersist public final void prePersist() { // 进行数据校验 doValidate(this, CreateGroup.class); preCreate0(); } // 实体更新到数据库前的扩展点 @PreUpdate public final void preUpdate() { // 进行数据校验 doValidate(this, UpdateGroup.class); preUpdate0(); } // 子类可以复写该方法 public void preCreate0() { } // 子类可以复习该方法 public void preUpdate0() { } @Override public boolean equals(Object o) { if (this == o) return true; if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false; BaseEntity that = (BaseEntity) o; return id != null &amp;&amp; Objects.equals(id, that.id); } @Override public int hashCode() { return getClass().hashCode(); } public &lt;T&gt; void doValidate(T t, Class&lt;? extends ValidateGroup&gt; group) { Set&lt;ConstraintViolation&lt;T&gt;&gt; constraintViolations = validator.validate(t, group, Default.class); if (!CollectionUtils.isEmpty(constraintViolations)) { throw new ConstraintViolationException(constraintViolations); } } }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/project/qifan-shop/reference/"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"后端基础"}],["meta",{"property":"og:description","content":"后端基础 BaseEntity 所有的实体都会继承该基础实体，里面包含了主键Id和Id的 @MappedSuperclass @Getter @Setter @ToString @RequiredArgsConstructor public abstract class BaseEntity extends AbstractAggregateRoot&lt;BaseEntity&gt; { static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator(); // 主键 @Id // UUID生成策略 @GeneratedValue(strategy = GenerationType.UUID) private String id; // 创建时间不允许修改，且不能为空 @Column(name = \\"created_at\\", nullable = false, updatable = false) // 创建时自动填写当前时间 @CreationTimestamp private LocalDateTime createdAt; // 更新时间 @Column(name = \\"updated_at\\", nullable = false) // 更新时自动填写当前时间 @UpdateTimestamp private LocalDateTime updatedAt; // 乐观锁并发控制 @Version @Column(name = \\"version\\") private Integer version; // 实体插入到数据库之前的扩展点 @PrePersist public final void prePersist() { // 进行数据校验 doValidate(this, CreateGroup.class); preCreate0(); } // 实体更新到数据库前的扩展点 @PreUpdate public final void preUpdate() { // 进行数据校验 doValidate(this, UpdateGroup.class); preUpdate0(); } // 子类可以复写该方法 public void preCreate0() { } // 子类可以复习该方法 public void preUpdate0() { } @Override public boolean equals(Object o) { if (this == o) return true; if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false; BaseEntity that = (BaseEntity) o; return id != null &amp;&amp; Objects.equals(id, that.id); } @Override public int hashCode() { return getClass().hashCode(); } public &lt;T&gt; void doValidate(T t, Class&lt;? extends ValidateGroup&gt; group) { Set&lt;ConstraintViolation&lt;T&gt;&gt; constraintViolations = validator.validate(t, group, Default.class); if (!CollectionUtils.isEmpty(constraintViolations)) { throw new ConstraintViolationException(constraintViolations); } } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-15T12:37:15.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"函数式抽象"}],["meta",{"property":"article:published_time","content":"2023-09-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-15T12:37:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"后端基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-10T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-15T12:37:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"BaseEntity","slug":"baseentity","link":"#baseentity","children":[]},{"level":2,"title":"EntityOperations","slug":"entityoperations","link":"#entityoperations","children":[]}],"git":{"createdTime":1694705846000,"updatedTime":1697373435000,"contributors":[{"name":"qifan","email":"1507906763@qq.com","commits":3},{"name":"起凡","email":"1507906763@qq.com","commits":2}]},"readingTime":{"minutes":2.28,"words":685},"filePathRelative":"project/qifan-shop/reference/README.md","localizedDate":"2023年9月10日","excerpt":"<h1> 后端基础</h1>\\n<h2> BaseEntity</h2>\\n<p>所有的实体都会继承该基础实体，里面包含了主键Id和Id的</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code>\\n<span class=\\"token annotation punctuation\\">@MappedSuperclass</span>\\n<span class=\\"token annotation punctuation\\">@Getter</span>\\n<span class=\\"token annotation punctuation\\">@Setter</span>\\n<span class=\\"token annotation punctuation\\">@ToString</span>\\n<span class=\\"token annotation punctuation\\">@RequiredArgsConstructor</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">abstract</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">BaseEntity</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">AbstractAggregateRoot</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">BaseEntity</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token punctuation\\">{</span>\\n\\n  <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">final</span> <span class=\\"token class-name\\">Validator</span> validator <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Validation</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">buildDefaultValidatorFactory</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getValidator</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token comment\\">// 主键</span>\\n  <span class=\\"token annotation punctuation\\">@Id</span>\\n  <span class=\\"token comment\\">// UUID生成策略</span>\\n  <span class=\\"token annotation punctuation\\">@GeneratedValue</span><span class=\\"token punctuation\\">(</span>strategy <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">GenerationType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">UUID</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> id<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token comment\\">// 创建时间不允许修改，且不能为空</span>\\n  <span class=\\"token annotation punctuation\\">@Column</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"created_at\\"</span><span class=\\"token punctuation\\">,</span> nullable <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">,</span> updatable <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token comment\\">// 创建时自动填写当前时间</span>\\n  <span class=\\"token annotation punctuation\\">@CreationTimestamp</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">LocalDateTime</span> createdAt<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token comment\\">// 更新时间</span>\\n  <span class=\\"token annotation punctuation\\">@Column</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"updated_at\\"</span><span class=\\"token punctuation\\">,</span> nullable <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token comment\\">// 更新时自动填写当前时间</span>\\n  <span class=\\"token annotation punctuation\\">@UpdateTimestamp</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">LocalDateTime</span> updatedAt<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token comment\\">// 乐观锁并发控制</span>\\n  <span class=\\"token annotation punctuation\\">@Version</span>\\n  <span class=\\"token annotation punctuation\\">@Column</span><span class=\\"token punctuation\\">(</span>name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"version\\"</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Integer</span> version<span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token comment\\">// 实体插入到数据库之前的扩展点</span>\\n  <span class=\\"token annotation punctuation\\">@PrePersist</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">prePersist</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 进行数据校验</span>\\n    <span class=\\"token function\\">doValidate</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">CreateGroup</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">preCreate0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token comment\\">// 实体更新到数据库前的扩展点</span>\\n  <span class=\\"token annotation punctuation\\">@PreUpdate</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">final</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">preUpdate</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 进行数据校验</span>\\n    <span class=\\"token function\\">doValidate</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">UpdateGroup</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">preUpdate0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token comment\\">// 子类可以复写该方法</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">preCreate0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token comment\\">// 子类可以复习该方法</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">preUpdate0</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token annotation punctuation\\">@Override</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">boolean</span> <span class=\\"token function\\">equals</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Object</span> o<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span> <span class=\\"token operator\\">==</span> o<span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token keyword\\">return</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>o <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">||</span> <span class=\\"token class-name\\">Hibernate</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getClass</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!=</span> <span class=\\"token class-name\\">Hibernate</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getClass</span><span class=\\"token punctuation\\">(</span>o<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token keyword\\">return</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">BaseEntity</span> that <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">BaseEntity</span><span class=\\"token punctuation\\">)</span> o<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> id <span class=\\"token operator\\">!=</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token class-name\\">Objects</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">equals</span><span class=\\"token punctuation\\">(</span>id<span class=\\"token punctuation\\">,</span> that<span class=\\"token punctuation\\">.</span>id<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token annotation punctuation\\">@Override</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">hashCode</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token function\\">getClass</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">hashCode</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">T</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">doValidate</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">T</span> t<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Class</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">ValidateGroup</span><span class=\\"token punctuation\\">&gt;</span></span> group<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Set</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">ConstraintViolation</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">T</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">&gt;</span></span> constraintViolations <span class=\\"token operator\\">=</span> validator<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">validate</span><span class=\\"token punctuation\\">(</span>t<span class=\\"token punctuation\\">,</span> group<span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token class-name\\">Default</span><span class=\\"token punctuation\\">.</span><span class=\\"token keyword\\">class</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span><span class=\\"token class-name\\">CollectionUtils</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">isEmpty</span><span class=\\"token punctuation\\">(</span>constraintViolations<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ConstraintViolationException</span><span class=\\"token punctuation\\">(</span>constraintViolations<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
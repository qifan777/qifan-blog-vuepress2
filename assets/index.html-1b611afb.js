import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,b as e,e as t,a as p}from"./app-21ba1c83.js";const o={},c=t("p",null,"如何使用Hibernate进行Java到数据库的映射。映射完后程序员只需针对Java的对象进行操作就可以实现增删改查。因此如何用Hibernate建模是一个值得深入学习的内容，它主要影响的就是create table xxx (...)。当然也会影响到增删改查。",-1),i=p(`<h1 id="_1-领域模型-domain-model" tabindex="-1"><a class="header-anchor" href="#_1-领域模型-domain-model" aria-hidden="true">#</a> 1. 领域模型（Domain Model）</h1><p>领域顾名思义，它指的是我们实际业务中一的一块业务也就是一个领域。对这个领域建模可能会有好几个相关联的类，他们都属于同一个领域。所以领域模型是比较范的概念，一般来说一个领域模型里面包含一个及以上的实体类（Entity），每个实体类都对应着数据库的一张表。</p><p>领域模型是Hibernate的核心，Hibernate的所有功能都是围绕着领域模型。Hibernate提供了许多的注解方便我们来建立领域模型。</p><h2 id="_1-1-hibernate类型" tabindex="-1"><a class="header-anchor" href="#_1-1-hibernate类型" aria-hidden="true">#</a> 1.1 Hibernate类型</h2><p>Hibernate类型的主要功能是联系Java中的对象和数据库中的记录，并且可以将Java对象与数据库的记录互相转换。</p><p>我们刚刚说了Hibernate需要在Entity类和数据库表直接做映射，而最直接的一个问题就是数据库中的类型如何与实体类中属性类型相对应。实体类里面可能存在枚举属性，如何映射到数据库？字符串类型如何映射到VARCHAR,CHAR？BigDecimal如何映射到Decimal?</p><p>搞清楚Hibernate一共有多少种类型是我们领域建模的最关键的点。</p><p><em><strong>简单的领域建模例子</strong></em></p><p>可以看到这个领域内有两张表，那意味着我们有两个实体类。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 联系方式</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> Contact
<span class="token punctuation">(</span>
    id      <span class="token keyword">integer</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    <span class="token keyword">first</span>   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">last</span>    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    middle  <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    notes   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    starred <span class="token keyword">boolean</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    website <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token comment">-- 地址</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> Address
<span class="token punctuation">(</span>
    id         <span class="token keyword">integer</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    province   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    city       <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    district   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    details    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    contact_id <span class="token keyword">integer</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先建立地址实体类，映射到Address表。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Address&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

  <span class="token comment">// @Basic可加可不加。用来标识该字段是基本类型</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> province<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> city<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> district<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> details<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再建立联系实体类，在这个类里面关联地址实体类。</p><p>同时观察发现 <code>fitst</code>, <code>middle</code>,<code>last</code>都是属于名字这一概念，所以我们可以再创建一个类把这三个字段包装起来，使得语义清晰。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Contact&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Contact</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

  <span class="token comment">// 表明该字段为嵌套类型</span>
  <span class="token annotation punctuation">@Embedded</span>
  <span class="token keyword">private</span> <span class="token class-name">Name</span> name<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> notes<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">URL</span> website<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token keyword">boolean</span> starred<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@OneToOne</span>
  <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;address_id&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">Address</span> address<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 表明该类为嵌套类型</span>
<span class="token annotation punctuation">@Embeddable</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">class</span> <span class="token class-name">Name</span> <span class="token punctuation">{</span>

  <span class="token comment">// 这边属性名称和表的字段名称不一样，需要手动指定。</span>
  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;first&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span>
  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;middle&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> middleName<span class="token punctuation">;</span>
  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;last&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述的领域模型可以发现以下这些Hibernate类型</p><ol><li>基本类型：<code>boolean</code>（Java基础类型）</li><li>基本类型 ：<code>Integer</code>（Java基础类型包装类）</li><li>基本类型：<code>String</code>（Java字符串）</li><li>嵌套类型：<code>Name</code>（Java简单对象（POJO）类，没有实际的表与之相关联）</li><li>实体类型：<code>Address</code>（Java简单对象（POJO）类，有实际的表与之相关联）</li></ol><p>上面的这些Hibernate类型又分为两大类 <code>值类型</code>和 <code>实体类型</code></p><h3 id="_1-1-1-值类型-value-type" tabindex="-1"><a class="header-anchor" href="#_1-1-1-值类型-value-type" aria-hidden="true">#</a> 1.1.1 值类型(Value Type)</h3><p>值类型是那些和实体类紧密关联，描述了实体状态的字段。</p><p>这些Hibernate类型都属于值类型：</p><ul><li><p>基本类型，详细看 1.2。</p></li><li><p>嵌套类型，Java简单对象（POJO）类，没有实际的表与之相关联。需要依附某个实体类型。</p><p>这个类里面又有一些基本类型，如上面的Contact中的Name字段。</p></li><li><p>集合类型，虽然前面没提到，但是偶尔也会用到。</p></li></ul><h3 id="_1-1-2-实体类型-entity-type" tabindex="-1"><a class="header-anchor" href="#_1-1-2-实体类型-entity-type" aria-hidden="true">#</a> 1.1.2 实体类型（Entity Type）</h3><p>实体类型描述了Java简单对象（POJO）类与数据库之间的映射关系。通过 <code>@Entity</code>来标识。</p><p>当实体作为属性存在在另一个实体对象时，他们只是存在联系，却各自维护自己的状态。如上面的Contact中的address属性。他们是两个实体，却又存在联系。他们各自维护自己的修改和删除。</p><p>实体类和Java简单对象（POJO）类最大的区别那就是实体类是由对应的数据库表，而普通java类型没有。</p><h2 id="_1-2-基本类型" tabindex="-1"><a class="header-anchor" href="#_1-2-基本类型" aria-hidden="true">#</a> 1.2 基本类型</h2><p>与基本类型搭配使用的注解：</p><blockquote><p>@Basic，@Column，@Id，@Enumerated，@Convert（自定义映射规则）</p></blockquote><p>低频次：</p><blockquote><p>@Type（自定义hibernate类型），@Lob（二进制数据），@Nationalized（国际化字符串），@Formula（计算字段），@ColumnTransformer（自定义列转化）</p></blockquote><p>下面的表格列出了Java中的哪些类型属于Hibernate的基础类型。</p><p>你可以通过 <code>@Basic</code>来指定属性类型为基本类型。也可以不添加该注解，上面的领域建模例子就没添加。</p><table><thead><tr><th>类别</th><th>类型</th></tr></thead><tbody><tr><td>java基本类型</td><td>boolean, int, double等</td></tr><tr><td>java基本类型包装类</td><td>Boolean, Integer, Double等</td></tr><tr><td>字符串</td><td>String</td></tr><tr><td>数字类型</td><td>BigInteger, BigDecimal</td></tr><tr><td>Java8 date/time (java.time)</td><td>LocalDate, LocalTime, LocalDateTime, Instant 等</td></tr><tr><td>不建议使用的date/time(java.util)</td><td>Date 和 Calendar</td></tr><tr><td>不建议使用的date/time(java.sql)</td><td>Date, Time, Timestamp</td></tr><tr><td>byte数组和char数组</td><td>byte[] 或者 Byte[], char[] 或者Character[]</td></tr><tr><td>java 枚举类型</td><td>任意的 enum</td></tr><tr><td>可序列化的类型</td><td>任意实现 java.io.Serializable的类</td></tr></tbody></table><p>下面详细介绍上述表格中的部分类型。</p><h3 id="_1-2-1-枚举类型" tabindex="-1"><a class="header-anchor" href="#_1-2-1-枚举类型" aria-hidden="true">#</a> 1.2.1 枚举类型</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">PhoneType</span> <span class="token punctuation">{</span>
  <span class="token constant">LAND_LINE</span><span class="token punctuation">,</span>
  <span class="token constant">MOBILE</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>@Enumerated(ORDINAL)</strong></em></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Phone&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;phone_number&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@Enumerated</span><span class="token punctuation">(</span><span class="token class-name">EnumType</span><span class="token punctuation">.</span><span class="token constant">ORDINAL</span><span class="token punctuation">)</span>
  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;phone_type&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">PhoneType</span> type<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们插入Java对象到数据库时，hibernate生成下面的sql语句。<br> 可以看见 <code>PhoneType.MOBILE</code> 映射到 <code>1</code>。@Enumerated(EnumType.ORDINAL)指定枚举到数据库的映射规则是按顺序。MOBILE在PhoneType中的顺序是1，所以就得到了1。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Phone</span> phone<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
phone<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
phone<span class="token punctuation">.</span><span class="token function">setNumber</span><span class="token punctuation">(</span><span class="token string">&quot;123-456-78990&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
phone<span class="token punctuation">.</span><span class="token function">setType</span><span class="token punctuation">(</span><span class="token class-name">PhoneType</span><span class="token punctuation">.</span><span class="token constant">MOBILE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Phone <span class="token punctuation">(</span>phone_number<span class="token punctuation">,</span> phone_type<span class="token punctuation">,</span> id<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;123-456-78990&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>@Enumerated(STRING)</strong></em></p><p>还有一种枚举映射规则是把枚举值变成字符串。</p><p>在属性上加上 <code>@Enumerated(STRING)</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Enumerated</span><span class="token punctuation">(</span><span class="token class-name">EnumType</span><span class="token punctuation">.</span><span class="token constant">STRING</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;phone_type&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">PhoneType</span> type<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入上面的例子到数据库，会生成下面的sql语句</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Phone <span class="token punctuation">(</span>phone_number<span class="token punctuation">,</span> phone_type<span class="token punctuation">,</span> id<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;123-456-78990&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;MOBILE&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>PhoneType.MOBILE</code>变成了 <code>&#39;MOBILE&#39;</code>字符串。</p><h3 id="_1-2-2-boolean" tabindex="-1"><a class="header-anchor" href="#_1-2-2-boolean" aria-hidden="true">#</a> 1.2.2 Boolean</h3><p>默认情况下，Java的Boolean映射到数据库的类型是 <code>BIT</code>、<code>TINYINT</code>。</p><p>Hibernate还提供了下面三种内置映射规则</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 把boolean映射成字符 \`Y\`, \`N\`</span>
<span class="token annotation punctuation">@Basic</span>
<span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>type<span class="token punctuation">.</span></span>YesNoConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">boolean</span> convertedYesNo<span class="token punctuation">;</span>

<span class="token comment">// 把boolean映射成字符 \`T\`, \`F\`</span>

<span class="token annotation punctuation">@Basic</span>
<span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>type<span class="token punctuation">.</span></span>TrueFalseConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">boolean</span> convertedTrueFalse<span class="token punctuation">;</span>

<span class="token comment">// 把boolean映射成 0，1。（默认就是这个）</span>
<span class="token annotation punctuation">@Basic</span>
<span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>hibernate<span class="token punctuation">.</span>type<span class="token punctuation">.</span></span>NumericBooleanConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">boolean</span> convertedNumeric<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-3-date-time" tabindex="-1"><a class="header-anchor" href="#_1-2-3-date-time" aria-hidden="true">#</a> 1.2.3 Date/Time</h3><p>在SQL里面定义了三个标准的日期类型</p><ol><li><p>DATE</p><p>存储日历时间，年月日。</p></li><li><p>TIME</p><p>存储小时，分钟，秒</p></li><li><p>TIMESTAMP</p><p>存储DATE和TIME并且还有毫秒，即年月日小时分钟秒毫秒。</p></li></ol><p><em><strong>@Temporal</strong></em></p><p>因为上面三种类型是数据库中的标准类型，如果我们在Java中使用的是 <code>java.util.Date</code><br> 来标识时间，Hibernate不知道应该将 <code>java.util.Date</code>映射到三种数据库时间类型中的哪一种。因此我们需要使用 <code>@Temporal</code><br> 来显示的指定映射到哪一个类型。</p><p><em>映射java.util.Date 到 DATE</em></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Temporal</span><span class="token punctuation">(</span><span class="token class-name">TemporalType</span><span class="token punctuation">.</span><span class="token constant">DATE</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Date</span> timestamp<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>映射java.util.Date 到 TIME</em></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Temporal</span><span class="token punctuation">(</span><span class="token class-name">TemporalType</span><span class="token punctuation">.</span><span class="token constant">TIME</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Date</span> timestamp<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>映射java.util.Date 到 TIMESTAMP</em></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Temporal</span><span class="token punctuation">(</span><span class="token class-name">TemporalType</span><span class="token punctuation">.</span><span class="token constant">TIMESTAMP</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Date</span> timestamp<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，如果你使用的是 <code>java.util.Calendar</code>，也需要指定映射到哪一种时间类型。</p><p><em><strong>映射 Java 8 Date/Time</strong></em></p><p>前面我们提到了在Java中使用 <code>java.util.Calendar</code>或者 <code>java.util.Date</code>来标识时间时应该如何映射。</p><p>如果我们使用的是Java8新增的Date/Time就不需要去指定映射规则了。因为Java8的Date/Time和数据库的三种日期格式刚刚好对应，映射规则如下：</p><ol><li><p>DATE</p><p><code>java.time.LocalDate</code></p></li><li><p>TIME</p><p><code>java.time.LocalTime</code>, <code>java.time.OffsetTime</code></p></li><li><p>TIMESTAMP</p><p><code>java.time.Instant</code>, <code>java.time.LocalDateTime</code>, <code>java.time.OffsetDateTime</code>, <code>java.time.ZonedDateTime</code></p></li></ol><p>如果我们使用 <code>LocalDateTime</code>来标识日期，那将被自动映射到 <code>TIMESTAMP</code>。不需要添加 <code>@Temporal</code>。使用上述的其他类型同理。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> timestamp<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-4-自定义映射规则" tabindex="-1"><a class="header-anchor" href="#_1-2-4-自定义映射规则" aria-hidden="true">#</a> 1.2.4 自定义映射规则</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">UserType</span> <span class="token punctuation">{</span>
  <span class="token function">PERSON</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;个人&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">ENTERPRISE</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;企业&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> code<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

  <span class="token class-name">UserType</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> code<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>code <span class="token operator">=</span> code<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> code<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UserType</span> <span class="token function">nameOf</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token class-name">UserType</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>userType <span class="token operator">-&gt;</span> userType<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">findFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;枚举不存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Accessors</span><span class="token punctuation">(</span>chain <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">AUTO</span><span class="token punctuation">)</span>
  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> nullable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> createTime<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">UserType</span> userType<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用户拥有用户类型，如果我们希望用户类型这个属性在数据库存储的是 <code>UserType</code>的name,例如 <code>个人</code>，<code>企业</code>这样的字符串， 那我们就需要自定义映射规则。</p><p><em><strong>@Convert</strong></em></p><p>编写 <code>Converter</code>类，定义两种类型之间的映射规则。我们这边是 <code>UserType</code>与 <code>String</code>的映射规则。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserTypeConverter</span> <span class="token keyword">implements</span> <span class="token class-name">AttributeConverter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserType</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">convertToDatabaseColumn</span><span class="token punctuation">(</span><span class="token class-name">UserType</span> attribute<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> attribute<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token class-name">UserType</span> <span class="token function">convertToEntityAttribute</span><span class="token punctuation">(</span><span class="token class-name">String</span> dbData<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">UserType</span><span class="token punctuation">.</span><span class="token function">nameOf</span><span class="token punctuation">(</span>dbData<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在需要映射的字段上添加上 <code>@Convert</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Convert</span><span class="token punctuation">(</span>converter <span class="token operator">=</span> <span class="token class-name">UserTypeConverter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">UserType</span> userType<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>测试案例</em></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;起凡&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">setCreateTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">setUserType</span><span class="token punctuation">(</span><span class="token class-name">UserType</span><span class="token punctuation">.</span><span class="token constant">PERSON</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 将UserType.PERSON 转成 字符串</span>
<span class="token comment">// insert into user (create_time, name, user_type) values (2022-12-04 11:38:46, &#39;起凡&#39;, &#39;个人&#39;)</span>
userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>

userRepository<span class="token punctuation">.</span><span class="token function">findUserByNameIs</span><span class="token punctuation">(</span><span class="token string">&quot;起凡&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>res<span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
<span class="token comment">// 在数据库从字符串变成 UserType.PERSON。</span>
   log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span><span class="token function">getUserType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 结果是：1。</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-3-嵌套类型" tabindex="-1"><a class="header-anchor" href="#_1-3-嵌套类型" aria-hidden="true">#</a> 1.3 嵌套类型</h2><p>在前面的领域建模中，我们使用到了值类型中的嵌套类型。嵌套类型一般是对几个实体类都公用的属性进行包装方便复用，或者是几个属性属于同一个概念把它们放到一个类里面使得语义清晰。</p><blockquote><p>嵌套类型需要 <code>@Embeddable</code>和 <code>@Embedded</code>搭配使用</p><p><code>@Embeddable</code>表明类本身是一个嵌套类型。</p><p><code>@Embedded</code>在实体类中的属性上面标识该属性的类型是嵌套类型。</p></blockquote><p><em>简单的嵌套类型案例</em></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Book&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token annotation punctuation">@GeneratedValue</span>
  <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">Publisher</span> publisher<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Embeddable</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Publisher</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;publisher_name&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;publisher_country&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> country<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> Book
<span class="token punctuation">(</span>
    id                <span class="token keyword">bigint</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    author            <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    publisher_country <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    publisher_name    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    title             <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Publisher嵌套类是Book的一部分。生成sql语句时，可以看见Book表中也有 <code>publisher_country</code> <code>publisher_name</code>，而不是再生成一个Publisher表。</p><h2 id="_1-4-实体类型" tabindex="-1"><a class="header-anchor" href="#_1-4-实体类型" aria-hidden="true">#</a> 1.4 实体类型</h2><p>Hibernate里面实体类有下面几个要求</p><ul><li>实体类上需要添加 <code>@Entity</code>注解</li><li>实体类必须有一个public或者protected的无参构造器</li><li>接口和枚举不能成为实体类</li><li>实体类不能是final，里面的映射字段也不能是final。</li><li>实体类可以是抽象类（abstract），实体类可以继承抽象类实体。</li><li>实体类的每个映射字段都需要有getter/setter</li></ul><h3 id="_1-4-1-映射实体类" tabindex="-1"><a class="header-anchor" href="#_1-4-1-映射实体类" aria-hidden="true">#</a> 1.4.1 映射实体类</h3><p>定义一个实体类第一件事就是添加 <code>@Entity(name=&quot;选填，默认和类名相同&quot;)</code>。默认情况实体类的名字和你数据库的表名相同,如果你想指定表名可以使用 <code>@Table(name=&quot;xxx&quot;)</code>。<br> 确定好映射的表名后，你需要确定<a href="#_1-5-%E4%B8%BB%E9%94%AE">主键</a>)并且在主键字段上用 <code>@Id</code>标识，如果是多个主键请参考<a href="#_1-5-2-%E7%BB%84%E5%90%88%E4%B8%BB%E9%94%AE">组合组件</a>。<br> 最后将类中的属性映射到表中的字段，根据属性的类型选择合适的<a href="#_1-1-1-%E5%80%BC%E7%B1%BB%E5%9E%8B-value-type">值类型</a></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 总结，首先查找是否存在@Table(name=&quot;Book_1&quot;)，若存在则映射到Book_1表。</span>
<span class="token comment">// 其次，@Entity(name=&quot;Book_2&quot;)，若@Entity有指定实体类名称，则映射到Book_2表</span>
<span class="token comment">// 最后，@Entity，若@Entity没有指定名称，则默认映射到类名即Book表。</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

  <span class="token comment">//Getters and setters are omitted for brevity</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-5-主键" tabindex="-1"><a class="header-anchor" href="#_1-5-主键" aria-hidden="true">#</a> 1.5 主键</h2><h3 id="_1-5-1-简单主键" tabindex="-1"><a class="header-anchor" href="#_1-5-1-简单主键" aria-hidden="true">#</a> 1.5.1 简单主键</h3><p><strong>@ID</strong></p><p>每个实体类都需要有一个@Id注解来标识注解，或者实体类的父类是 <code>mapped superclass</code>且也有@id。</p><blockquote><p>@Id只能作用在基础类型或者基础类型的包装类 <em>java.lang.String</em>; <em>java.util.Date</em>; <em>java.sql.Date</em>;<br><em>java.math.BigDecimal</em>;</p></blockquote><p><strong>@GeneratedValue</strong></p><p>GeneratedValue提供了生成主键的规范，只能作用于有 <code>@Id</code>标识的属性（类型是基本类型）。当插入实体类到数据库时会自动根据策略填充实体类的主键。</p><p>GenerationType定义了3种主键生成类型。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public enum GenerationType { TABLE, SEQUENCE, IDENTITY, AUTO };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li><p>TABLE</p><p>为每张表生成一张额外的表来记录主键的生成。</p></li><li><p>SEQUENCE</p><p>主键自增（Mysql支持），部分数据库不支持。</p></li><li><p>IDENTITY</p><p>为插入的每条记录生成一个唯一的标识id，数据库层面支持（Oracle，SQL Server），部分数据库不支持（Mysql）。</p></li></ol><h3 id="_1-5-2-组合主键" tabindex="-1"><a class="header-anchor" href="#_1-5-2-组合主键" aria-hidden="true">#</a> 1.5.2 组合主键</h3><p><em>简单的组合主键例子</em></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token keyword">long</span> empId<span class="token punctuation">;</span>
  <span class="token class-name">String</span> empName<span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DependentId</span> <span class="token punctuation">{</span>

  <span class="token class-name">String</span> name<span class="token punctuation">;</span> <span class="token comment">// 和 Dependent中@Id String name 相对于。必须同类型且同名。</span>
  <span class="token keyword">long</span> emp<span class="token punctuation">;</span> <span class="token comment">// Dependent 中的 emp名字相同。Dependent中的emp用@ManyToOne注解，这边的emp类型必须和Employee的id同类型。 </span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span>
<span class="token comment">// 使用@组合id</span>
<span class="token annotation punctuation">@IdClass</span><span class="token punctuation">(</span><span class="token class-name">DependentId</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dependent</span> <span class="token punctuation">{</span>

  <span class="token comment">// 和 DependentId中的name相匹配</span>
  <span class="token annotation punctuation">@Id</span>
  <span class="token class-name">String</span> name<span class="token punctuation">;</span>

  <span class="token comment">// 和 DependentId中的emp相匹配</span>
  <span class="token annotation punctuation">@Id</span>
  <span class="token annotation punctuation">@ManyToOne</span>
  <span class="token class-name">Employee</span> emp<span class="token punctuation">;</span>

  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-6-关联" tabindex="-1"><a class="header-anchor" href="#_1-6-关联" aria-hidden="true">#</a> 1.6 关联</h2><p>基本概念：</p><ul><li>父实体（parent）- 关系反方（inverse（mapped） side）</li><li>子实体（child）- 关系拥有方（owning side）</li></ul><div class="hint-container tip"><p class="hint-container-title">重点</p><p>父实体可以将创建/删除/更新等操作级联触发给子实体。反之则不行。</p></div><p>如何判断父实体和子实体呢？答：通过关系的拥有方来判断。<br> 如何判断谁是关系的拥有方呢？答：通过外键来判断。<br> 如：Person拥有多个Phone，Phone对应一个Person。很明显外键person_id是在Phone中，那Phone就是关系的拥有方，所以它是子实体。关系的反方显然就是Person，所以它是父实体。</p><h3 id="manytoone" tabindex="-1"><a class="header-anchor" href="#manytoone" aria-hidden="true">#</a> @ManyToOne</h3><p>多对一是最常见的关系，<code>@ManyToOne</code>直接映射到数据库的外键，它建立起了子实体和父实体之间的多对一关联。</p><p><em>@ManyToOne</em>案例</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Person&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token annotation punctuation">@GeneratedValue</span>
  <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

  <span class="token comment">//Getters and setters are omitted for brevity</span>

<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Phone&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>

  <span class="token annotation punctuation">@Id</span>
  <span class="token annotation punctuation">@GeneratedValue</span>
  <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;\`number\`&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@ManyToOne</span>
  <span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;person_id&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">Person</span> person<span class="token punctuation">;</span>

  <span class="token comment">//Getters and setters are omitted for brevity</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关联phone和person</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 新增Person记录</span>
<span class="token class-name">Person</span> person<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Phone</span> phone<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token string">&quot;123-456-7890&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 将phone关联已存在的person</span>
phone<span class="token punctuation">.</span><span class="token function">setPerson</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 插入到数据库</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
phone<span class="token punctuation">.</span><span class="token function">setPerson</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成对应的SQL</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Person <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token keyword">INSERT</span>
<span class="token keyword">INTO</span> Phone <span class="token punctuation">(</span>number<span class="token punctuation">,</span> person_id<span class="token punctuation">,</span> id<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span> <span class="token string">&#39;123-456-7890&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span>

<span class="token keyword">UPDATE</span> Phone
<span class="token keyword">SET</span> number    <span class="token operator">=</span> <span class="token string">&#39;123-456-7890&#39;</span><span class="token punctuation">,</span>
    person_id <span class="token operator">=</span> <span class="token boolean">NULL</span>
<span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@ManyToOne</span>
<span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;person_id&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Person</span> person<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用过MyBatis的人对于JPA的关系映射一开始肯定有些迷糊。这里的Person为什么可以映射到数据库中的person_id呢？Person明明是一个实体类，而person_id是一个varchar/int等类型。<br> 你可以观察一下上面的SQL语句。在新增phone时，person_id的值就是person对象的id。所以其实本质上还是Person实体类的id映射到person_id。</p></div><h3 id="onetomany" tabindex="-1"><a class="header-anchor" href="#onetomany" aria-hidden="true">#</a> @OneToMany</h3><p>之前说了Person可以关联多个Phone。可以使用 <code>@OneToMany</code>来管理所有的子实体。 在使用 <code>@OneToMany</code>时有两种情况：</p><ul><li>第一种情况是子实体有 <code>@ManyToOne</code>此时建立起的联系bidirectional（双向）.</li><li>第二种情况是子实体没有 <code>@ManyToOne</code>，这种情况 <code>@OneToMany</code>建立起的关联是unidirectional（单向）。（建议不要使用这种关联）</li></ul><p>需要注意的是，外键只在 <code>@ManyToOne</code>的一方，<code>@OneToMany</code>的一方不存在外键。</p><p><em>Bidirectional <code>@OneToMany</code>例子</em></p><p>Bidirectional <code>@OneToMany</code> 顾名思义它需要同时存在 <code>owning side</code>（子实体@ManyToOne）和 <code>inverse（mappedBy） side</code>（父实体OneToMany）这样才能达成双向关系。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>mappedBy <span class="token operator">=</span> <span class="token string">&quot;person&quot;</span><span class="token punctuation">,</span> cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span> orphanRemoval <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>mappedBy：的意思是子实体通过person关联到父实体，这样就可以知道子实体的外键字段是什么。正如我们手写sql一样，如果需要查询Person拥有的Phone显然需要知道Phone里面的外键是这么。</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> person t1 <span class="token keyword">left</span> <span class="token keyword">join</span> phone t2 <span class="token keyword">on</span> t1<span class="token punctuation">.</span>id<span class="token operator">=</span>t2<span class="token punctuation">.</span>person_id <span class="token comment">--外键 person_id</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>cascade：CascadeType.ALL就是代表级联触发所有的操作。在关联中只有父实体可以级联更新/删除/创建子实体，反之不行。</li><li>orphanRemoval：的意思是当你更改phones数组内的Phone后，保存到数据库数据库也会删除掉子实体。参考下面的案例就理解了。</li></ul></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Person&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>mappedBy <span class="token operator">=</span> <span class="token string">&quot;person&quot;</span><span class="token punctuation">,</span> cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span> orphanRemoval <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Phone</span><span class="token punctuation">&gt;</span></span> phones <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addPhone</span><span class="token punctuation">(</span><span class="token class-name">Phone</span> phone<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		phones<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
		phone<span class="token punctuation">.</span><span class="token function">setPerson</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removePhone</span><span class="token punctuation">(</span><span class="token class-name">Phone</span> phone<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		phones<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
		phone<span class="token punctuation">.</span><span class="token function">setPerson</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Phone&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
	<span class="token comment">// 手机号在生活中不会重复，这种属于自然id，也可以唯一标识一行记录</span>
	<span class="token annotation punctuation">@NaturalId</span>
	<span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;\`number\`&quot;</span><span class="token punctuation">,</span> unique <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>

	<span class="token comment">// 可以不写@JoinColumn，默认会以person_id作为外键。</span>
	<span class="token comment">// 关联父实体</span>
	<span class="token annotation punctuation">@ManyToOne</span>
	<span class="token keyword">private</span> <span class="token class-name">Person</span> person<span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> o<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">Phone</span> phone <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Phone</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>number<span class="token punctuation">,</span> phone<span class="token punctuation">.</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将两个phone对象和person对象关联，插入person到数据库时，会将两个phone对象一起级联插入到数据库。随后删除其中一个phone对象和person对象的关联。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Phone</span> phone1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token string">&quot;123-456-7890&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Phone</span> phone2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token string">&quot;321-654-0987&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 项数组内增加phone，当将person插入到数据库时会触发级联操作CascadeType.ALL将phones也一起插入到数据库</span>
person<span class="token punctuation">.</span><span class="token function">addPhone</span><span class="token punctuation">(</span>phone1<span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span><span class="token function">addPhone</span><span class="token punctuation">(</span>phone2<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 数组内删除了phone1，由于配置了orphanRemoval，所以更新person时会触发删除操作。</span>
person<span class="token punctuation">.</span><span class="token function">removePhone</span><span class="token punctuation">(</span>phone1<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Person
       <span class="token punctuation">(</span> id <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Phone
       <span class="token punctuation">(</span> <span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> person_id<span class="token punctuation">,</span> id <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span> <span class="token string">&#39;123-456-7890&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Phone
       <span class="token punctuation">(</span> <span class="token string">&quot;number&quot;</span><span class="token punctuation">,</span> person_id<span class="token punctuation">,</span> id <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span> <span class="token string">&#39;321-654-0987&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">)</span>

<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> Phone
<span class="token keyword">WHERE</span>  id <span class="token operator">=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="onetoone" tabindex="-1"><a class="header-anchor" href="#onetoone" aria-hidden="true">#</a> @OneToOne</h3><p>在使用 <code>@OneToOne</code>同样有 bidirectional 和 unidirectional 两种情况。依然是不推荐使用 unidirectional。</p><p><em>Unidirectional <code>@OneToOne</code></em></p><p>下面的Phone关联了PhoneDetails，在PhoneDetails并没有 <code>@OneToOne</code>。在Phone里面 <code>@OneToOne</code>映射到了外键details_id，这种就属于单向关系。</p><p>在一对一的关联中，外键放在哪一边比较合适是新手比较少思考的问题。在这个例子里面我的推荐是放在PhoneDetails，因为PhoneDetails无法脱离Phone而存在，所以它适合作为子实体，Phone做为父实体。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Phone&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;\`number\`&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@OneToOne</span>
	<span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;details_id&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">PhoneDetails</span> details<span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;PhoneDetails&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PhoneDetails</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> provider<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> technology<span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Bidirectional @OneToOne</em></p><p>可以看见现在外键phone_id是在PhoneDetails，同时Phone里面也多了 <code>@OneToOne</code>关联子实体，形成了双向关联。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Phone&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;\`number\`&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@OneToOne</span><span class="token punctuation">(</span>
		mappedBy <span class="token operator">=</span> <span class="token string">&quot;phone&quot;</span><span class="token punctuation">,</span>
		cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span>
		orphanRemoval <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">PhoneDetails</span> details<span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addDetails</span><span class="token punctuation">(</span><span class="token class-name">PhoneDetails</span> details<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		details<span class="token punctuation">.</span><span class="token function">setPhone</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>details <span class="token operator">=</span> details<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>details <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			details<span class="token punctuation">.</span><span class="token function">setPhone</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>details <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;PhoneDetails&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PhoneDetails</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> provider<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> technology<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@OneToOne</span>
	<span class="token comment">// 可以不写@JoinColumn</span>
	<span class="token annotation punctuation">@JoinColumn</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;phone_id&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">Phone</span> phone<span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Phone</span> phone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token string">&quot;123-456-7890&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PhoneDetails</span> details <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhoneDetails</span><span class="token punctuation">(</span><span class="token string">&quot;T-Mobile&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GSM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

phone<span class="token punctuation">.</span><span class="token function">addDetails</span><span class="token punctuation">(</span>details<span class="token punctuation">)</span><span class="token punctuation">;</span>
entityManager<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Phone <span class="token punctuation">(</span> number<span class="token punctuation">,</span> id <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span> <span class="token string">&#39;123-456-7890&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> PhoneDetails <span class="token punctuation">(</span> phone_id<span class="token punctuation">,</span> provider<span class="token punctuation">,</span> technology<span class="token punctuation">,</span> id <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;T-Mobile&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;GSM&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="manytomany" tabindex="-1"><a class="header-anchor" href="#manytomany" aria-hidden="true">#</a> @ManyToMany</h3><p>@ManyToMany不够灵活性能也比较差。 建议使用@OneToMany关联中间表。PersonAddress是Person和Address的中间表。</p><p>这样你可以随时向中间表添加字段，使用@ManyToMany就没有办法了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Person&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@NaturalId</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> registrationNumber<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>
		mappedBy <span class="token operator">=</span> <span class="token string">&quot;person&quot;</span><span class="token punctuation">,</span>
		cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span>
		orphanRemoval <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PersonAddress</span><span class="token punctuation">&gt;</span></span> addresses <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addAddress</span><span class="token punctuation">(</span><span class="token class-name">Address</span> address<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">PersonAddress</span> personAddress <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PersonAddress</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> address<span class="token punctuation">)</span><span class="token punctuation">;</span>
		addresses<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>personAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
		address<span class="token punctuation">.</span><span class="token function">getOwners</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>personAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">removeAddress</span><span class="token punctuation">(</span><span class="token class-name">Address</span> address<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">PersonAddress</span> personAddress <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PersonAddress</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> address<span class="token punctuation">)</span><span class="token punctuation">;</span>
		address<span class="token punctuation">.</span><span class="token function">getOwners</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>personAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
		addresses<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>personAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
		personAddress<span class="token punctuation">.</span><span class="token function">setPerson</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		personAddress<span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> o<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>registrationNumber<span class="token punctuation">,</span> person<span class="token punctuation">.</span>registrationNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>registrationNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;PersonAddress&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">PersonAddress</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@ManyToOne</span>
	<span class="token keyword">private</span> <span class="token class-name">Person</span> person<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@ManyToOne</span>
	<span class="token keyword">private</span> <span class="token class-name">Address</span> address<span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> o<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">PersonAddress</span> that <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">PersonAddress</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span> that<span class="token punctuation">.</span>person<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
				<span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> that<span class="token punctuation">.</span>address<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span> address<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Entity</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Address&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Id</span>
	<span class="token annotation punctuation">@GeneratedValue</span>
	<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> street<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@Column</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;\`number\`&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> number<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> postalCode<span class="token punctuation">;</span>

	<span class="token annotation punctuation">@OneToMany</span><span class="token punctuation">(</span>
		mappedBy <span class="token operator">=</span> <span class="token string">&quot;address&quot;</span><span class="token punctuation">,</span>
		cascade <span class="token operator">=</span> <span class="token class-name">CascadeType</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span>
		orphanRemoval <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PersonAddress</span><span class="token punctuation">&gt;</span></span> owners <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//Getters and setters are omitted for brevity</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> o<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">Address</span> address <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Address</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>street<span class="token punctuation">,</span> address<span class="token punctuation">.</span>street<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
				<span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>number<span class="token punctuation">,</span> address<span class="token punctuation">.</span>number<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
				<span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>postalCode<span class="token punctuation">,</span> address<span class="token punctuation">.</span>postalCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>street<span class="token punctuation">,</span> number<span class="token punctuation">,</span> postalCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,149);function l(u,d){return s(),a("div",null,[c,e(" more "),i])}const v=n(o,[["render",l],["__file","index.html.vue"]]);export{v as default};

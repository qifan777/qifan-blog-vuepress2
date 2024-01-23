import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-27981918.js";const p={},o=t(`<h1 id="分页工具类" tabindex="-1"><a class="header-anchor" href="#分页工具类" aria-hidden="true">#</a> 分页工具类</h1><p>使用组合式API的思想，将小程序分页加载数据的逻辑封装成一个工具类，使用起来非常简单。</p><ol><li>加载动画</li><li>触底加载下页</li><li>下拉刷新</li><li>首次加载</li></ol><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token keyword">type</span> <span class="token class-name">Ref</span><span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Page<span class="token punctuation">,</span> QueryRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/apis/__generated/model/static&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">&quot;lodash&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Taro <span class="token keyword">from</span> <span class="token string">&quot;@tarojs/taro&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">PageResult<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>
  Page<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;content&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;number&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;size&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;totalElements&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;totalPages&quot;</span>
<span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> usePageHelper <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token constant">E</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token comment">// 调用后端的查询接口</span>
  <span class="token function-variable function">queryApi</span><span class="token operator">:</span> <span class="token punctuation">(</span>options<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> body<span class="token operator">:</span> QueryRequest<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>PageResult<span class="token operator">&lt;</span><span class="token constant">E</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  object<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span>
  <span class="token comment">// 查询条件</span>
  initQuery<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  <span class="token comment">// 分页数据后置处理</span>
  postProcessor<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> PageResult<span class="token operator">&lt;</span><span class="token constant">E</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> pageData <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    content<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token constant">E</span><span class="token punctuation">,</span>
    <span class="token builtin">number</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    size<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    totalElements<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    totalPages<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Ref<span class="token operator">&lt;</span>PageResult<span class="token operator">&lt;</span><span class="token constant">E</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> queryRequest <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    query<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">...</span>initQuery <span class="token punctuation">}</span> <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    pageNum<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    pageSize<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    likeMode<span class="token operator">:</span> <span class="token string">&quot;ANYWHERE&quot;</span><span class="token punctuation">,</span>
    sorts<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> property<span class="token operator">:</span> <span class="token string">&quot;createdTime&quot;</span><span class="token punctuation">,</span> direction<span class="token operator">:</span> <span class="token string">&quot;DESC&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Ref<span class="token operator">&lt;</span>QueryRequest<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> loading <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> finish <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 请求分页数据</span>
  <span class="token keyword">const</span> <span class="token function-variable function">loadPageData</span> <span class="token operator">=</span> <span class="token punctuation">(</span>request<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>QueryRequest<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 通用查询对象，防止传入空值</span>
    queryRequest<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>queryRequest<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
      <span class="token operator">...</span>_<span class="token punctuation">.</span><span class="token function">omitBy</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> _<span class="token punctuation">.</span>isNil<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 如果查询条件为null，undefined，空字符串则过滤不提交</span>
    queryRequest<span class="token punctuation">.</span>value<span class="token punctuation">.</span>query <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span>_<span class="token punctuation">.</span><span class="token function">omitBy</span><span class="token punctuation">(</span>queryRequest<span class="token punctuation">.</span>value<span class="token punctuation">.</span>query<span class="token punctuation">,</span> <span class="token punctuation">(</span>row<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>_<span class="token punctuation">.</span><span class="token function">isString</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> _<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> _<span class="token punctuation">.</span><span class="token function">isNil</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token constant">T</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>finish<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token comment">// 显示加载动画</span>
    loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用查询接口</span>
    <span class="token function">queryApi</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> body<span class="token operator">:</span> queryRequest<span class="token punctuation">.</span>value <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>res<span class="token operator">:</span> PageResult<span class="token operator">&lt;</span><span class="token constant">E</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>postProcessor <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">postProcessor</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 返回结果</span>
        pageData<span class="token punctuation">.</span>value<span class="token punctuation">.</span>content<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>res<span class="token punctuation">.</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
        finish<span class="token punctuation">.</span>value <span class="token operator">=</span> res<span class="token punctuation">.</span>content<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> res<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
        queryRequest<span class="token punctuation">.</span>value<span class="token punctuation">.</span>pageNum <span class="token operator">=</span> <span class="token punctuation">(</span>queryRequest<span class="token punctuation">.</span>value<span class="token punctuation">.</span>pageNum <span class="token operator">||</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 取消加载动画</span>
        loading<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 重新请求分页数据，pageNum=1, pageSize=10</span>
  <span class="token keyword">const</span> <span class="token function-variable function">reloadPageData</span> <span class="token operator">=</span> <span class="token punctuation">(</span>
    queryRequest<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>QueryRequest<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span> pageNum<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> pageSize<span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">loadPageData</span><span class="token punctuation">(</span>queryRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 下拉刷新</span>
  Taro<span class="token punctuation">.</span><span class="token function">usePullDownRefresh</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    finish<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    pageData<span class="token punctuation">.</span>value<span class="token punctuation">.</span>content <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">reloadPageData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      Taro<span class="token punctuation">.</span><span class="token function">stopPullDownRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 触底加载</span>
  Taro<span class="token punctuation">.</span><span class="token function">useReachBottom</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">loadPageData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 首次进入页面加载</span>
  Taro<span class="token punctuation">.</span><span class="token function">useLoad</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">loadPageData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    loading<span class="token punctuation">,</span>
    queryRequest<span class="token punctuation">,</span>
    pageData<span class="token punctuation">,</span>
    loadPageData<span class="token punctuation">,</span>
    reloadPageData<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),e=[o];function c(l,u){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","page.html.vue"]]);export{r as default};

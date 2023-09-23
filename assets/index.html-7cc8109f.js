import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-437702de.js";const p={},e=t(`<h1 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript" aria-hidden="true">#</a> typescript</h1><p>vite对typescript的支持是内置的，因此不需要配置typescript的编译，只需要在代码中增加tsconfig.json控制typescript的提示效果。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>修改package.json中的依赖，然后执行<code>npm install</code>。</p><p><code>package.json</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;vite&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.4.9&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@vitejs/plugin-vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.3.4&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@rushstack/eslint-patch&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.3.3&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@vue/eslint-config-prettier&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^8.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@vue/eslint-config-standard-with-typescript&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^8.0.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@vue/tsconfig&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^0.4.0&quot;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@vue/tsconfig</code>是Vue官方提供的typescript配置，所以我们只需要继承整个配置就可以在代码里面写typescript了。</p><p><code>tsconfig.json</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;extends&quot;</span><span class="token operator">:</span> <span class="token string">&quot;@vue/tsconfig/tsconfig.dom.json&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@vue/eslint-config-standard-with-typescript</code>是Vue官方提供的ESLint+TypeScript+Vue共享配置，里面已经配置了这三个插件并解决了冲突的规则。</p><p><code>.eslintrc.cjs</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用CommonJS是使用 require 导入，ESM是使用 import 导入</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;@rushstack/eslint-patch/modern-module-resolution&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// Vue语法的ESLint插件</span>
    <span class="token string">&quot;plugin:vue/vue3-recommended&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// ESLint+TypeScript Lint+Vue Lint三个插件的集合与配置 </span>
    <span class="token string">&quot;@vue/eslint-config-standard-with-typescript&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// 继承Vue官方提供的ESLintPrettier标准配置</span>
    <span class="token string">&quot;@vue/eslint-config-prettier&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><p><code>vite.config.js</code>-&gt;<code>vite.config.ts</code></p><p><code>index.js</code>-&gt; 删除</p><p><code>index.html</code>-&gt;</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/src/main.ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>src/main.js</code> -&gt; <code>src/main.ts</code></p><p><code>App.vue</code> -&gt;</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>当前计数器：{{ counter }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleCounterChange(counter + 1)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>点击增加<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleCounterChange(counter - 1)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>点击减少<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> counter <span class="token operator">=</span> ref<span class="token operator">&lt;</span>number<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> handleCounterChange <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> number<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter"><span class="token keyword">void</span></span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  counter<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","index.html.vue"]]);export{k as default};

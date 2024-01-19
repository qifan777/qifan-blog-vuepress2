import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as e}from"./app-de3a5301.js";const t={},o=e(`<h1 id="商品类别" tabindex="-1"><a class="header-anchor" href="#商品类别" aria-hidden="true">#</a> 商品类别</h1><h2 id="建表" tabindex="-1"><a class="header-anchor" href="#建表" aria-hidden="true">#</a> 建表</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- auto-generated definition</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> product_category
<span class="token punctuation">(</span>
    id           <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span>
        <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span>
    created_time <span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    edited_time  <span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    creator_id   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    editor_id    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    name         <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span>  <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    parent_id    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>  <span class="token boolean">null</span><span class="token punctuation">,</span>
    image        <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    description  <span class="token keyword">text</span>         <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    sort_order   <span class="token keyword">int</span>          <span class="token operator">not</span> <span class="token boolean">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","product-category.html.vue"]]);export{d as default};

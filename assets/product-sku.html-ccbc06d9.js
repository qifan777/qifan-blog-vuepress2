import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as e}from"./app-de3a5301.js";const p={},t=e(`<h1 id="商品sku" tabindex="-1"><a class="header-anchor" href="#商品sku" aria-hidden="true">#</a> 商品SKU</h1><h2 id="建表" tabindex="-1"><a class="header-anchor" href="#建表" aria-hidden="true">#</a> 建表</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- auto-generated definition</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> product_sku
<span class="token punctuation">(</span>
    id           <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>    <span class="token operator">not</span> <span class="token boolean">null</span>
        <span class="token keyword">primary</span> <span class="token keyword">key</span><span class="token punctuation">,</span>
    created_time <span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>    <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    edited_time  <span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>    <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    creator_id   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>    <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    editor_id    <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>    <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">\`</span>values<span class="token punctuation">\`</span></span>     <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>   <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    name         <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>   <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    product_id   <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>   <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    cover        <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>   <span class="token boolean">null</span><span class="token punctuation">,</span>
    price        <span class="token keyword">decimal</span><span class="token punctuation">(</span><span class="token number">38</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    stock        <span class="token keyword">int</span>            <span class="token boolean">null</span><span class="token punctuation">,</span>
    description  <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span>   <span class="token boolean">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[t];function c(l,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","product-sku.html.vue"]]);export{k as default};

import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as d,e,f as a,d as r,a as n}from"./app-1c9dc73b.js";const c="/qifan-blog-vuepress2/assets/1486954448882339842-542dc9bd.jpg",l="/qifan-blog-vuepress2/assets/home-1f179909.jpg",h="/qifan-blog-vuepress2/assets/letter-2447d23f.jpg",p="/qifan-blog-vuepress2/assets/address-0554b507.jpg",u="/qifan-blog-vuepress2/assets/goods-23727a3b.jpg",_="/qifan-blog-vuepress2/assets/cart-bb1734d5.jpg",g="/qifan-blog-vuepress2/assets/order_detail-2d1f1a69.jpg",f="/qifan-blog-vuepress2/assets/order_list-29fc1af9.jpg",b="/qifan-blog-vuepress2/assets/user-060e7b0b.jpg",m="/qifan-blog-vuepress2/assets/userinfo-f9227472.jpg",x="/qifan-blog-vuepress2/assets/spread_code-69b48110.jpg",v="/qifan-blog-vuepress2/assets/spread_history-ccd44fb8.jpg",j="/qifan-blog-vuepress2/assets/wallet-b7ab80e4.jpg",q={},w=e("h1",{id:"在线邮筒",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#在线邮筒","aria-hidden":"true"},"#"),a(" 在线邮筒")],-1),k=e("h2",{id:"项目介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#项目介绍","aria-hidden":"true"},"#"),a(" 项目介绍")],-1),y={href:"https://gitee.com/jarcheng/post-letter/tree/master/springboot-letter",target:"_blank",rel:"noopener noreferrer"},N={href:"https://gitee.com/jarcheng/post-letter/tree/master/uniapp-letter",target:"_blank",rel:"noopener noreferrer"},V={href:"https://gitee.com/jarcheng/post-letter/tree/master/vue3-letter",target:"_blank",rel:"noopener noreferrer"},B=n('<figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>在线寄信</li><li>微信支付</li><li>富文本编辑（需要有管理员权限）</li><li>快递查询</li><li>购物车</li><li>小商店</li><li>推广拉新</li><li>提现（需要有权限才能开通）</li></ul><h3 id="技术栈" tabindex="-1"><a class="header-anchor" href="#技术栈" aria-hidden="true">#</a> 技术栈</h3><p>小程序端：</p><ul><li><code>vue2</code></li><li><code>uni-app</code></li><li><code>typescript</code></li></ul><p>后端：</p><ul><li><code>sa-token</code> 权限认证框架</li><li><code>mybati-plus</code></li><li><code>springboot</code></li><li><code>mysql</code></li><li><code>redis</code></li><li><code>rabbitmq</code></li></ul><p>后台管理页面：</p><ul><li><code>vue3</code></li><li><code>element-ui</code></li><li><code>typescript</code></li><li><code>vuex</code></li><li><code>router</code></li></ul><h2 id="页面设计" tabindex="-1"><a class="header-anchor" href="#页面设计" aria-hidden="true">#</a> 页面设计</h2><h3 id="首页" tabindex="-1"><a class="header-anchor" href="#首页" aria-hidden="true">#</a> 首页</h3><p>一共有三种类型的订单</p><p>普通信件，明信片，商品。</p><img src="'+l+'" width="200"><h3 id="寄信页面" tabindex="-1"><a class="header-anchor" href="#寄信页面" aria-hidden="true">#</a> 寄信页面</h3><p>填写信件</p><img src="'+h+'" width="200"><h3 id="地址簿" tabindex="-1"><a class="header-anchor" href="#地址簿" aria-hidden="true">#</a> 地址簿</h3><p>在寄信页面中可以选择地址</p><img src="'+p+'" width="200"><h3 id="商品页面" tabindex="-1"><a class="header-anchor" href="#商品页面" aria-hidden="true">#</a> 商品页面</h3><p>可以单独寄商品也可以在寄信中随寄商品</p><img src="'+u+'" width="200"><h3 id="购物车页面" tabindex="-1"><a class="header-anchor" href="#购物车页面" aria-hidden="true">#</a> 购物车页面</h3><p>在商品页面中选取好商品，然后结算</p><img src="'+_+'" width="200"><h3 id="订单详情" tabindex="-1"><a class="header-anchor" href="#订单详情" aria-hidden="true">#</a> 订单详情</h3><p>提交订单后进入详情页面。<br> 在支付完成后，商家会在后台发货。如果15分账内未支付会自动取消订单。</p><img src="'+g+'" width="200"><h3 id="订单列表" tabindex="-1"><a class="header-anchor" href="#订单列表" aria-hidden="true">#</a> 订单列表</h3><p>历史订单展示</p><img src="'+f+'" width="200"><h3 id="用户页面" tabindex="-1"><a class="header-anchor" href="#用户页面" aria-hidden="true">#</a> 用户页面</h3><img src="'+b+'" width="200"><h3 id="用户详情页面" tabindex="-1"><a class="header-anchor" href="#用户详情页面" aria-hidden="true">#</a> 用户详情页面</h3><img src="'+m+'" width="200"><h3 id="推广码" tabindex="-1"><a class="header-anchor" href="#推广码" aria-hidden="true">#</a> 推广码</h3><p>每个用户可以生成自己的推广码，用于推广。<br> 新用户扫这个码就可以赚取推广费用</p><img src="'+x+'" width="200"><h3 id="推广记录" tabindex="-1"><a class="header-anchor" href="#推广记录" aria-hidden="true">#</a> 推广记录</h3><img src="'+v+'" width="200"><h3 id="钱包" tabindex="-1"><a class="header-anchor" href="#钱包" aria-hidden="true">#</a> 钱包</h3><ol><li>通过邀请新用户赚取的推广费</li><li>你邀请的新用户下单后从中得到一部分抽成<br><img src="'+j+'" width="200"></li></ol><p>有问题可以联系wx：ljc666max<br> qq：1507906763</p>',44);function E(I,L){const i=t("ExternalLinkIcon");return o(),d("div",null,[w,k,e("p",null,[e("a",y,[a("springboot后端链接 "),r(i)])]),e("p",null,[e("a",N,[a("uni-app小程序链接"),r(i)])]),e("p",null,[e("a",V,[a("vue3后台管理页面"),r(i)])]),B])}const S=s(q,[["render",E],["__file","index.html.vue"]]);export{S as default};

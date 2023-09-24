import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as l,c,d as s,w as o,a as i,e,f as n}from"./app-f44b90e5.js";const _="/blog/assets/Search-66345e9f.png",r="/blog/assets/start-session-9bd9b061.png",h="/blog/assets/full-access-3496c7bf.png",p="/blog/assets/gateway-memory-503c1012.png",u="/blog/assets/idea-memory-25b615d6.png",m="/blog/assets/gatway-panel-5fecb62e.png",g="/blog/assets/accept-62dfa370.png",b="/blog/assets/ping-fc7ecb51.png",f="/blog/assets/port-foward-2995c2b1.png",w="/blog/assets/add-port-025101ab.png",I={},D=i('<h1 id="远程开发工具分享" tabindex="-1"><a class="header-anchor" href="#远程开发工具分享" aria-hidden="true">#</a> 远程开发工具分享</h1><p>想到远程开发工具，大家必然会想到远程操控软件如TeamView，向日葵远程操控，ToDesk等等。在使用远程操控我们可以明显感觉到以下几个缺点</p><h5 id="_1-画质低" tabindex="-1"><a class="header-anchor" href="#_1-画质低" aria-hidden="true">#</a> 1. 画质低</h5><p>大部人是使用免费的远程操控软件，平常我们写代码的时候字体本来就不是很大加上画面一糊根本就看不见代码。即使看得见也很难受，我自己是很难接受长时间在这种画质下写代码。</p><h5 id="_2-延迟高" tabindex="-1"><a class="header-anchor" href="#_2-延迟高" aria-hidden="true">#</a> 2. 延迟高</h5><p>我在使用远程操控写代码时候经常因为输入了一段代码但是还没反应过来导致我以为还没输入，然后又重新输入了一遍。更难受的时候，这个时候我删除也会出现同样的情况</p><h5 id="_3-无法访问服务" tabindex="-1"><a class="header-anchor" href="#_3-无法访问服务" aria-hidden="true">#</a> 3. 无法访问服务</h5><p>我们在远程电脑假设运行了一个后端服务，或者前端项目，因为远程电脑没有拥有公网IP，我们没有办法在本机上访问到远程电脑上运行的服务。</p><p>当然远程操控软件也有很明显的有点，那就是你可以拥有你电脑完整的操控权，你可以打开电脑上的各种软件，文档，随时的复制粘贴等。<br> 所以如果我们能在远程操控软件的基础上解决画质低，延迟高，公网访问那岂不是完美了！</p><p>ps：其实还有一个文件传输，这个只能通过微信QQ这种通讯工具解决了。</p><h2 id="idea插件code-with-me" tabindex="-1"><a class="header-anchor" href="#idea插件code-with-me" aria-hidden="true">#</a> Idea插件Code With Me</h2><p>Jetbrains 下面的旗舰版IDE如 IDEA，Pycharm，Webstorm都自带这个插件。也是可以和IDE一起破解的。</p><p>使用介绍：在上诉介绍的IDE（2023版本）中，双击 <code>SHIFT</code> 输入<code>Code With Me</code>（图 1）。随后在右上角的弹出框中选择<code>Start Session</code>（图<br> 2）。然后我们再选择第三个选项<code>Full Access</code>开放所有权限（图 3），最后点击 <code>Start Session</code><br> 。启动后会自动把控制链接复制到粘贴板。然后你就可以在本机电脑的IDEA打开<code>Code With Me</code>然后<code>Join Session</code><br> 在弹出框中输入刚刚远程机上得到是链接就可以远程开发了。</p>',13),E=e("img",{src:_,width:"500"},null,-1),y=e("p",null,"图 1",-1),x=e("img",{src:r,width:"500"},null,-1),A=e("p",null,"图 2",-1),G=e("img",{src:h,width:"500"},null,-1),S=e("p",null,"图 3",-1),C=e("h2",{id:"jetbrains-gateway",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#jetbrains-gateway","aria-hidden":"true"},"#"),n(" Jetbrains Gateway")],-1),B=e("p",null,[n("总所周知，IDEA的内存占用至少那就是3，4个G。如果我们在本机电脑上打开IDEA去控制远程电脑上的IDEA这样本机电脑的IDEA内存占用就有些浪费了，因为我们没有在本机电脑的IDEA上写代码，现在本机电脑的IDEA只是一个远程操控软件。所以针对这种需求场景，JetBrains有一款产品叫"),e("code",null,"JetBrains Gateway"),e("br"),n(" 它就是专门用来操控远程JetBrains下的IDE，内存占用也会少。")],-1),J=e("p",null,"下面们就对比下IDEA和JetBrains的内存占用情况。可以看到Gateway的内存占用1G不到，IDEA内存占用高达4.5G。所以我们如果只是为了远程控制IDEA只需要在本机开Gateway就行了。",-1),V=e("img",{src:p,width:"500"},null,-1),W=e("p",null,"图 4 Gateway内存占用",-1),k=e("img",{src:u,width:"500"},null,-1),M=e("p",null,"图 5 Idea 内存占用",-1),N=e("p",null,[n("使用介绍：我们在Gateway的首页上点击左侧菜单栏"),e("code",null,"Connect with a Link"),n("（图6），将我们之前远程机中开启"),e("code",null,"Code With Me"),n("得到的链接复制到里面再点击"),e("code",null,"Connect"),n("。随后我们需要在远程机同意控制（图7）。")],-1),T=e("img",{src:m,width:"500"},null,-1),v=e("p",null,"图 6 Gateway首页面板",-1),F=e("img",{src:g,width:"500"},null,-1),P=e("p",null,"图 7 远程机同意控制",-1),j=e("p",null,"Gateway的右下角可以看见延迟，我目前最高在100以内，大部分都是在30左右非常稳定。",-1),Q=e("img",{src:b,width:"500"},null,-1),H=e("p",null,"图 8 ping延迟",-1),L=e("p",null,[n("如果你需要开启远程端口访问，来访问远程机上的服务，你可以在远程机的IDEA上双击Shift输入"),e("code",null,"Port Foward"),n("。在右侧的面板中添加需要转发的端口，比如我的后端服务端口是8890。开启后你在本机上就可以通过localhost:8890来访访问远程机上的8890了。")],-1),q=e("img",{src:f,width:"500"},null,-1),z=e("p",null,"图 9 显示端口转发面板",-1),K=e("img",{src:w,width:"500"},null,-1),O=e("p",null,"图 10 添加需要转发的端口",-1);function R(U,X){const t=d("center");return l(),c("div",null,[D,s(t,null,{default:o(()=>[E,y]),_:1}),s(t,null,{default:o(()=>[x,A]),_:1}),s(t,null,{default:o(()=>[G,S]),_:1}),C,B,J,s(t,null,{default:o(()=>[V,W]),_:1}),s(t,null,{default:o(()=>[k,M]),_:1}),N,s(t,null,{default:o(()=>[T,v]),_:1}),s(t,null,{default:o(()=>[F,P]),_:1}),j,s(t,null,{default:o(()=>[Q,H]),_:1}),L,s(t,null,{default:o(()=>[q,z]),_:1}),s(t,null,{default:o(()=>[K,O]),_:1})])}const $=a(I,[["render",R],["__file","index.html.vue"]]);export{$ as default};

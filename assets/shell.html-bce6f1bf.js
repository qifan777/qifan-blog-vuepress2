import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as _,o as i,c as a,d as e,w as l,e as s,f as n,a as d}from"./app-f44b90e5.js";const c="/blog/assets/img-98f540ba.png",h="/blog/assets/img_1-6ca16dab.png",r="/blog/assets/img_2-9838e570.png",p="/blog/assets/img_3-fc4b7850.png",u="/blog/assets/img_4-cf4a6ad0.png",g="/blog/assets/img_5-198829b6.png",m="/blog/assets/img_6-4214ffa8.png",f="/blog/assets/img_7-4d05fb4b.png",b="/blog/assets/img_8-f5f4b132.png",S="/blog/assets/img_9-646c286d.png",x="/blog/assets/img_10-4b4cb06f.png",H="/blog/assets/img_11-d846a60b.png",N="/blog/assets/img_12-bc14fb78.png",V={},v=s("h1",{id:"idea——强大的shell工具",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#idea——强大的shell工具","aria-hidden":"true"},"#"),n(" IDEA——强大的Shell工具")],-1),B=s("h2",{id:"ssh",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#ssh","aria-hidden":"true"},"#"),n(" SSH")],-1),k=s("p",null,"在使用Shell工具时最常用的是SSH输入命令操控远程服务器。在idea中使用SSH也是很简单的事情。",-1),w=s("p",null,"settings -> tools -> ssh congratulations",-1),y=s("img",{src:c},null,-1),C=s("p",null,"图1 配置SSH",-1),D=s("p",null,"alt+f12打开命令行，在右上角的下拉框中选择上面配置好的SSH会话。之后直接在命令行中就可以向服务器发送命令了。",-1),E=s("img",{src:h},null,-1),T=s("p",null,"图2 命令行连接SSH",-1),A=s("h2",{id:"sftp",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#sftp","aria-hidden":"true"},"#"),n(" SFTP")],-1),F=s("p",null,"在控制远程服务器时除了发送命令行，自然少不了互传文件，文件预览编辑的功能。幸运的是强大的idea也有这个功能",-1),I=s("p",null,"settings -> deployment。点击左上角的➕添加sftp服务器，可以从之前已经配置的ssh session中选择。",-1),P=s("img",{src:r},null,-1),j=s("p",null,"图3 配置sftp",-1),q=s("p",null,"默认情况下idea没有显示远程sftp服务器的菜单，需要手动打开。",-1),z=s("img",{src:p},null,-1),G=s("p",null,"图4 显示sftp服务器",-1),J=s("p",null,"在右侧的菜单栏中打开sftp服务器列表，选择已经配置好的sftp服务器，确认后下面就可以显示服务器内的文件了，可以编辑，可以下载，可以拖动本地文件到远程文件夹。",-1),K=s("img",{src:u},null,-1),L=s("p",null,"图5 显示sftp服务器",-1),M=s("h2",{id:"database",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#database","aria-hidden":"true"},"#"),n(" Database")],-1),O=s("p",null,"作为一名软件开发程序员，经常需要远程查看服务器上的数据库。所以除了shell工具之外还需准备数据库连接工具。",-1),Q=s("img",{src:g},null,-1),R=s("p",null,"图6 选择数据库",-1),U=s("p",null,"在ssh/ssl页签中选择已经配置好的ssh。之后切换到general页签输入数据库的账号密码，记住不需要修改host。",-1),W=s("img",{src:m},null,-1),X=s("p",null,"图7 连接数据库",-1),Y=d('<p>连接数据库后你使用这</p><ul><li><p>数据库迁移<br> 在服务器上部署新项目的时候需要在服务器上新建数据库，然后把本地的表迁移到服务器上，在idea中就可以实现这个操作。</p></li><li><p>结构对比<br> 如果你在本地的数据库修改了某个字段，然后想同步到服务器上，idea的数据库/表结构对比非常好用。</p></li><li><p>数据导出导入</p></li></ul><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><p>settings -&gt; deployment</p><p>将本地编译后的文件映射到服务器的目录。</p>',5),Z=s("img",{src:f},null,-1),$=s("p",null,"图8 映射路径",-1),ss=s("p",null,"在本地映射到服务器的文件上右键，上传。",-1),ts=s("img",{src:b},null,-1),es=s("p",null,"图9 上传本地文件",-1),ls=s("h2",{id:"远程命令",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#远程命令","aria-hidden":"true"},"#"),n(" 远程命令")],-1),ns=s("p",null,"在部署完之后一般需要执行命令或者脚本，这边我演示将远程服务器的nginx命令映射到idea里面。",-1),os=s("img",{src:S},null,-1),_s=s("p",null,"图10 配置远程命令",-1),is=s("img",{src:x},null,-1),as=s("img",{src:H},null,-1),ds=s("p",null,"图11 执行远程命令",-1),cs=s("h2",{id:"远程执行",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#远程执行","aria-hidden":"true"},"#"),n(" 远程执行")],-1),hs=s("p",null,"如果大家有做过支付功能可以知道它必须用于公网ip，我们在本地调试不了支付功能（除非内网穿透），只能将应用打包放到服务器上运行。这样做每次修改代码都需要重新打包部署很费时间。这个远程执行的功能就很好用了，可以直接指定你的应用运行机器。",-1),rs=s("img",{src:N},null,-1),ps=s("p",null,"图12 远程运行应用",-1);function us(gs,ms){const t=_("center");return i(),a("div",null,[v,B,k,w,e(t,null,{default:l(()=>[y,C]),_:1}),D,e(t,null,{default:l(()=>[E,T]),_:1}),A,F,I,e(t,null,{default:l(()=>[P,j]),_:1}),q,e(t,null,{default:l(()=>[z,G]),_:1}),J,e(t,null,{default:l(()=>[K,L]),_:1}),M,O,e(t,null,{default:l(()=>[Q,R]),_:1}),U,e(t,null,{default:l(()=>[W,X]),_:1}),Y,e(t,null,{default:l(()=>[Z,$]),_:1}),ss,e(t,null,{default:l(()=>[ts,es]),_:1}),ls,ns,e(t,null,{default:l(()=>[os,_s]),_:1}),e(t,null,{default:l(()=>[is,as,ds]),_:1}),cs,hs,e(t,null,{default:l(()=>[rs,ps]),_:1})])}const Ss=o(V,[["render",us],["__file","shell.html.vue"]]);export{Ss as default};

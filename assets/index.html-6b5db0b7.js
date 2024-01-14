import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as c,c as o,e as n,f as e,d as i,w as l,a}from"./app-ae4ba736.js";const v="/qifan-blog-vuepress2/assets/confirm-f78dae97.png",u="/qifan-blog-vuepress2/assets/finish-b73bf9b8.png",m="/qifan-blog-vuepress2/assets/img-6f5c119b.png",_="/qifan-blog-vuepress2/assets/img_1-c9f2f965.png",p="/qifan-blog-vuepress2/assets/img_2-316d1bf3.png",b="/qifan-blog-vuepress2/assets/img_3-43b6920b.png",g="/qifan-blog-vuepress2/assets/img_4-2f55055a.png",h="/qifan-blog-vuepress2/assets/img_5-b6d51cd1.png",f="/qifan-blog-vuepress2/assets/img_6-5292019d.png",x={},w=a('<h1 id="手把手教你搭建静态-博客网站" tabindex="-1"><a class="header-anchor" href="#手把手教你搭建静态-博客网站" aria-hidden="true">#</a> 手把手教你搭建静态/博客网站</h1><p>在搭建静态网站中，搭建博客是一个很典型的应用场景。我们一般用markdown写好博客内容，通过webpack打包成前端的html，jss，css等其他静态资源。然后我们需要将这些静态资源放到服务器上供他人阅读。本期的教程就是教搭建如何使用Nginx将我们的博客搭建起来。</p><h2 id="宝塔面板" tabindex="-1"><a class="header-anchor" href="#宝塔面板" aria-hidden="true">#</a> 宝塔面板</h2><p>宝塔面板是一个很好用的软件管理工具可以帮助你快速的安装各种软件并且可视化的配置这些软件，也包含了一些常用的运维监控。比如防火墙，CPU占用异常，定时任务等。</p><p>如果不使用宝塔面板，你需要手工输入命令安装各类软件，操作起来费时费力并且容易出错，而且需要记住很多Linux的命令，非常复杂。</p><p>使用宝塔后，比如你安装Nginx，Docker，Mysql只需要在软件商店里面点击安装就行了。</p><h3 id="安装宝塔" tabindex="-1"><a class="header-anchor" href="#安装宝塔" aria-hidden="true">#</a> 安装宝塔</h3>',7),E={href:"https://www.bt.cn/new/download.html",target:"_blank",rel:"noopener noreferrer"},B=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span> <span class="token operator">&amp;&amp;</span> <span class="token function">wget</span> <span class="token parameter variable">-O</span> install.sh https://download.bt.cn/install/install_6.0.sh <span class="token operator">&amp;&amp;</span> <span class="token function">sh</span> install.sh ed8484bec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装的过程中会询问是否同意安装到/www目录，选择y同意（图1）。</p>`,2),k=n("img",{src:v,width:"500"},null,-1),A=n("p",null,"图 1 确认安装宝塔",-1),y=n("p",null,"安装结束后，会出现以下提示（图2）。复制外网地址，且需要在云服务器的安全组中开放35402（下面有提示，每个人需要开放端口不一样）。打开网站后输入下面的账号密码。",-1),z=n("p",null,"如果你忘记了下面的网址和密码，只需要在服务器上输入bt，再根据提示输入 14 查看面板默认信息，就会出现安装成功后提示的信息。",-1),C=n("img",{src:u,width:"500"},null,-1),q=n("p",null,"图 2 宝塔安装完成",-1),$=n("h3",{id:"安装nginx",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装nginx","aria-hidden":"true"},"#"),e(" 安装Nginx")],-1),j=n("p",null,[e("在宝塔面板的左侧菜单中找到软件商店（图3），点击右侧的安装按钮然后选择极速安装等待安装完成。"),n("br"),n("img",{src:m,alt:"img.png",loading:"lazy"})],-1),F=a('<h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h2><p>Nginx是我不管自己学习时还是工作后都经常用到的一个服务器，负载均衡，SSL证书，K8S Ingress<br> Controller，反向代理，静态内容缓存，网站搭建等等。作为个人开发者反向代理，网站搭建，SSL证书配置这三个的使用频率是最高的，在工作中上诉的功能都经常会用到。</p><p>那这次我们要讲的网站搭建就是把Nginx当作静态资源服务器，访问nginx的时候它会根据我们配置的规则读取网页html，js，css，等其他图片媒体资源。</p><h3 id="上传静态网站文件" tabindex="-1"><a class="header-anchor" href="#上传静态网站文件" aria-hidden="true">#</a> 上传静态网站文件</h3><p>可以看到这是我打包后的博客，你们的目录不必和我的一样，只需要确保你的网站里面有index.html。</p><figure><img src="'+_+'" alt="img_1.png" tabindex="0" loading="lazy"><figcaption>img_1.png</figcaption></figure>',6),N=n("p",null,[e("在宝塔面板的左侧菜单栏中找到"),n("code",null,"文件"),e("菜单，并切换目录到"),n("code",null,"/www/server/nginx/html"),e("。我们在这个目录下新建一个文件夹"),n("code",null,"blog"),e("。")],-1),S=n("figure",null,[n("img",{src:p,alt:"img_2.png",tabindex:"0",loading:"lazy"}),n("figcaption",null,"img_2.png")],-1),D=n("p",null,"点击左上角的上传，上传你网站内容的压缩包，然后解压到blog中，上传完后的目录结构。确保blog下有index.html",-1),L=n("figure",null,[n("img",{src:b,alt:"img_3.png",tabindex:"0",loading:"lazy"}),n("figcaption",null,"img_3.png")],-1),I=a(`<h3 id="nginx配置" tabindex="-1"><a class="header-anchor" href="#nginx配置" aria-hidden="true">#</a> nginx配置</h3><p>我们已经上传完博客，当用户访问我们网站的时候我们希望把博客内容从服务器上读取并返回给用户的浏览器。</p><p>按照（图7）的指示点开nginx的配置文件，我们在<code>http{}</code>下新增一个sever监听80端口，并且匹配<code>/</code>开头的请求，将<code>/</code><br> 后的路径在root目录下查找，查找成功则返回内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
  listen 80;
  server_name qifan;
  index index.html index.htm;
  location / {
    root /www/server/nginx/html/blog;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+g+'" alt="img_4.png" tabindex="0" loading="lazy"><figcaption>img_4.png</figcaption></figure>',5),V=a(`<p>完整版的配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user  www www;
worker_processes auto;
error_log  /www/wwwlogs/nginx_error.log  crit;
pid        /www/server/nginx/logs/nginx.pid;
worker_rlimit_nofile 51200;

stream {
    log_format tcp_format &#39;$time_local|$remote_addr|$protocol|$status|$bytes_sent|$bytes_received|$session_time|$upstream_addr|$upstream_bytes_sent|$upstream_bytes_received|$upstream_connect_time&#39;;
  
    access_log /www/wwwlogs/tcp-access.log tcp_format;
    error_log /www/wwwlogs/tcp-error.log;
    include /www/server/panel/vhost/nginx/tcp/*.conf;
}

events
    {
        use epoll;
        worker_connections 51200;
        multi_accept on;
    }

http
    {
        include       mime.types;
		#include luawaf.conf;

		include proxy.conf;

        default_type  application/octet-stream;

        server_names_hash_bucket_size 512;
        client_header_buffer_size 32k;
        large_client_header_buffers 4 32k;
        client_max_body_size 50m;

        sendfile   on;
        tcp_nopush on;

        keepalive_timeout 60;

        tcp_nodelay on;

        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
        fastcgi_temp_file_write_size 256k;
		fastcgi_intercept_errors on;

        gzip on;
        gzip_min_length  1k;
        gzip_buffers     4 16k;
        gzip_http_version 1.1;
        gzip_comp_level 2;
        gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
        gzip_vary on;
        gzip_proxied   expired no-cache no-store private auth;
        gzip_disable   &quot;MSIE [1-6]\\.&quot;;

        limit_conn_zone $binary_remote_addr zone=perip:10m;
		limit_conn_zone $server_name zone=perserver:10m;

        server_tokens off;
        access_log off;
# 下面的这个server{}是新增的
server {
  listen 80;
  server_name qifan;
  index index.html index.htm;
  location / {
    root /www/server/nginx/html/blog;
  }
}
server
    {
        listen 888;
        server_name phpmyadmin;
        index index.html index.htm index.php;
        root  /www/server/phpmyadmin;

        #error_page   404   /404.html;
        include enable-php.conf;

        location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location ~ .*\\.(js|css)?$
        {
            expires      12h;
        }

        location ~ /\\.
        {
            deny all;
        }

        access_log  /www/wwwlogs/access.log;
    }
include /www/server/panel/vhost/nginx/*.conf;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),M=n("br",null,null,-1),O={href:"//192.168.0.1/images/logo.jpg%EF%BC%88%E9%BB%98%E8%AE%A480%E7%AB%AF%E5%8F%A3%EF%BC%89%E3%80%82%E5%9B%A0%E4%B8%BA%E6%88%91%E4%BB%AC%E5%9C%A8nginx%E4%B8%AD%E9%85%8D%E7%BD%AE%E4%BA%86server%EF%BC%8C%E5%AE%83%E5%9C%A880%E7%AB%AF%E5%8F%A3%E4%B8%8B%E7%9B%91%E5%90%AC%E3%80%82%E6%89%80%E4%BB%A5%E6%88%91%E4%BB%AC%E9%A6%96%E5%85%88%E6%98%AF%E8%AE%BF%E9%97%AE%E5%88%B0%E4%BA%86nginx%EF%BC%8C%E5%8F%88%E5%9B%A0%E4%B8%BA%E6%88%91%E4%BB%AC%E9%85%8D%E7%BD%AE%E4%BA%86location%E5%8C%B9%E9%85%8D",target:"_blank",rel:"noopener noreferrer"},K=n("code",null,"/",-1),P=n("br",null,null,-1),T=n("code",null,"/",-1),U=n("code",null,"/www/server/nginx/html/blog",-1),G=n("br",null,null,-1),H=n("code",null,"/www/server/nginx/html/blog/images/logo.jpg",-1),J=n("p",null,"重启nginx，输入服务器的ip地址。如果访问不到请查看是否开放80端口。",-1),Q=n("figure",null,[n("img",{src:h,alt:"img_5.png",tabindex:"0",loading:"lazy"}),n("figcaption",null,"img_5.png")],-1),R=n("figure",null,[n("img",{src:f,alt:"img_6.png",tabindex:"0",loading:"lazy"}),n("figcaption",null,"img_6.png")],-1);function W(X,Y){const d=r("ExternalLinkIcon"),s=r("center");return c(),o("div",null,[w,n("p",null,[e("根据你的系统在"),n("a",E,[e("官网"),i(d)]),e("这边选择对应的脚本。我这边以CentOS7为例子")]),B,i(s,null,{default:l(()=>[k,A]),_:1}),y,z,i(s,null,{default:l(()=>[C,q]),_:1}),$,j,i(s,null,{default:l(()=>[e(" 图 3 安装nginx ")]),_:1}),F,i(s,null,{default:l(()=>[e(" 图 4 待上传的博客 ")]),_:1}),N,S,i(s,null,{default:l(()=>[e(" 图 5 新建blog文件夹 ")]),_:1}),D,L,i(s,null,{default:l(()=>[e(" 图 6 上传博客内容 ")]),_:1}),I,i(s,null,{default:l(()=>[e(" 图 7 修改nginx配置文件 ")]),_:1}),V,n("blockquote",null,[n("p",null,[e("举个例子，假设我的服务器ip地址是，192.168.0.1。我现在访问http:"),M,n("a",O,[e("//192.168.0.1/images/logo.jpg（默认80端口）。因为我们在nginx中配置了server，它在80端口下监听。所以我们首先是访问到了nginx，又因为我们配置了location匹配"),i(d)]),K,P,e(" 开头的请求，所以所有的请求会被拦截。拦截后nginx将"),T,e("后的路径拼接到root"),U,G,e(" 上，去服务的目录里面找是否存在该资源。因此我们实际访问的是"),H,e("。")])]),J,Q,i(s,null,{default:l(()=>[e(" 图 8 重启nginx ")]),_:1}),R,i(s,null,{default:l(()=>[e(" 图 9 访问效果 ")]),_:1})])}const en=t(x,[["render",W],["__file","index.html.vue"]]);export{en as default};

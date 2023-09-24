const e=JSON.parse('{"key":"v-755a1fc5","path":"/knowledge/spring/aop/","title":"1. aop","lang":"zh-CN","frontmatter":{"sidebar":"heading","description":"1. aop 面向切面编程（aop），是对传统面向对象编程（oop）的一种补充。 oop的最小单位是类（class），aop的最小单位是切面（aspect）。切面可以在不改变原来代码的情况下，对某些类进行功能加强。比如：spring事务管理，仅仅只要在需要事务的方法上加上@Transactional就可以得到加强。 1.1 aop概念 Aspect：在spring里面，一个切面相当于一个类带上@Aspect注解。在这个切面里面写你想增强哪些类，以及增强的内容。 Join point：连接点就是代表具体要增强的方法，比如方法A加上了@Transactional，那么方法A在事务切面眼中就是一个连接点。 Advice: advice代表的是增强，在上面那个例子中，方法A需要事务增强，那么这个事务 就是advice了。通过在连接点执行前后将增强分为前置（before），后置（after），环绕（around）增强。所以说可以把增强（advice）理解为拦截器（interceptor）。 Pointcut：切入点就像正则表达式，它匹配了一组连接点。advice就是作用在Pointcut匹配的一组Join point上。 Target object：目标对象是指被一个或者多个切面增强的对象，又称增强对象。这些对象是通过动态代理实现的，所以说本质上是代理对象。 AOP proxy：spring为了实现aop，使用了jdk动态代理和cglib代理来创建增强对象。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/knowledge/spring/aop/"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"1. aop"}],["meta",{"property":"og:description","content":"1. aop 面向切面编程（aop），是对传统面向对象编程（oop）的一种补充。 oop的最小单位是类（class），aop的最小单位是切面（aspect）。切面可以在不改变原来代码的情况下，对某些类进行功能加强。比如：spring事务管理，仅仅只要在需要事务的方法上加上@Transactional就可以得到加强。 1.1 aop概念 Aspect：在spring里面，一个切面相当于一个类带上@Aspect注解。在这个切面里面写你想增强哪些类，以及增强的内容。 Join point：连接点就是代表具体要增强的方法，比如方法A加上了@Transactional，那么方法A在事务切面眼中就是一个连接点。 Advice: advice代表的是增强，在上面那个例子中，方法A需要事务增强，那么这个事务 就是advice了。通过在连接点执行前后将增强分为前置（before），后置（after），环绕（around）增强。所以说可以把增强（advice）理解为拦截器（interceptor）。 Pointcut：切入点就像正则表达式，它匹配了一组连接点。advice就是作用在Pointcut匹配的一组Join point上。 Target object：目标对象是指被一个或者多个切面增强的对象，又称增强对象。这些对象是通过动态代理实现的，所以说本质上是代理对象。 AOP proxy：spring为了实现aop，使用了jdk动态代理和cglib代理来创建增强对象。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-14T00:31:08.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:modified_time","content":"2023-09-14T00:31:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"1. aop\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-14T00:31:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"1.1 aop概念","slug":"_1-1-aop概念","link":"#_1-1-aop概念","children":[]},{"level":2,"title":"1.2 编写切面","slug":"_1-2-编写切面","link":"#_1-2-编写切面","children":[{"level":3,"title":"1.2.1 声明切面（Aspect）","slug":"_1-2-1-声明切面-aspect","link":"#_1-2-1-声明切面-aspect","children":[]},{"level":3,"title":"1.2.2 声明切入点（Pointcut）","slug":"_1-2-2-声明切入点-pointcut","link":"#_1-2-2-声明切入点-pointcut","children":[]},{"level":3,"title":"1.2.3 声明增强（Advice）","slug":"_1-2-3-声明增强-advice","link":"#_1-2-3-声明增强-advice","children":[]}]},{"level":2,"title":"1.3 测试","slug":"_1-3-测试","link":"#_1-3-测试","children":[{"level":3,"title":"1.3.1 编写 controler","slug":"_1-3-1-编写-controler","link":"#_1-3-1-编写-controler","children":[]},{"level":3,"title":"1.3.2 测试结果","slug":"_1-3-2-测试结果","link":"#_1-3-2-测试结果","children":[]}]}],"git":{"createdTime":1694651468000,"updatedTime":1694651468000,"contributors":[{"name":"起凡","email":"1507906763@qq.com","commits":1}]},"readingTime":{"minutes":3.04,"words":913},"filePathRelative":"knowledge/spring/aop/README.md","localizedDate":"2023年9月14日","excerpt":"<h1> 1. aop</h1>\\n<p>面向切面编程（aop），是对传统面向对象编程（oop）的一种补充。<br>\\noop的最小单位是类（class），aop的最小单位是切面（aspect）。切面可以在不改变原来代码的情况下，对某些类进行功能加强。比如：spring事务管理，仅仅只要在需要事务的方法上加上@Transactional就可以得到加强。</p>\\n<h2> 1.1 aop概念</h2>\\n<ul>\\n<li><code>Aspect</code>：在spring里面，一个切面相当于一个类带上<code>@Aspect</code>注解。在这个切面里面写你想增强哪些类，以及增强的内容。</li>\\n<li><code>Join point</code>：连接点就是代表具体要增强的方法，比如方法A加上了@Transactional，那么方法A在事务切面眼中就是一个连接点。</li>\\n<li><code>Advice</code>: advice代表的是增强，在上面那个例子中，方法A需要事务增强，那么这个<code>事务</code><br>\\n就是advice了。通过在连接点执行前后将增强分为前置（before），后置（after），环绕（around）增强。所以说可以把增强（advice）理解为拦截器（interceptor）。</li>\\n<li><code>Pointcut</code>：切入点就像正则表达式，它匹配了一组连接点。advice就是作用在Pointcut匹配的一组Join point上。</li>\\n<li><code>Target object</code>：目标对象是指被一个或者多个切面增强的对象，又称<code>增强对象</code>。这些对象是通过动态代理实现的，所以说本质上是代理对象。</li>\\n<li><code>AOP proxy</code>：spring为了实现aop，使用了jdk动态代理和cglib代理来创建增强对象。</li>\\n</ul>","autoDesc":true}');export{e as data};

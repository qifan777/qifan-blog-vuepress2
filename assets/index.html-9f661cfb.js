const t=JSON.parse('{"key":"v-39bce191","path":"/knowledge/worker/onebass/","title":"云边实体登记自动化","lang":"zh-CN","frontmatter":{"description":"云边实体登记自动化 手动登记实体流程 登记实体的步骤如下 从脚本中获取到需要登记的实体 如果脚本内容过多提取出需要登记的实体很消耗精力， 人无法长时间专注，也有可能出现漏掉。 图片 从省内批量采集实体 1. 需要切换网络，使用VPN登录省内，导致云边网络失效。这样一来一回非常耗时。 网络卡顿很影响云桌面的操作。 2. 采集的时候需要分不同的周期，月，日，无周期需要分开采集。采集完到资产 管理中发布实体, 发布完还需要导出发布包，再通过邮件发送出去。 图片] 云边导入发布包 重新登录云边VPN和云边。 开始登记实体 &nbsp; 实体基本信息 实体分区和HASH策略 接口规范 &nbsp; 填写业务口径 去规范手册寻找该接口的业务描述。规范手册又有好几册，寻找起来较为费时。 填写技术口径 去原脚本寻找该表的插入SQL语句。 填写中文字段名称 从规范手册中寻找每个字段对应的中文名称，这步是最耗时的。首先有些表的字段很多， 其次有些接口临时表很多，每次都需要重复填写。 主键HASH策略 从规范手册中寻找主键字段 建立分区 根据不同的统计日期建立不同的分区。 提交发布上线完成实体登记 实体列表 发布包","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/qifan-blog-vuepress2/knowledge/worker/onebass/"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"云边实体登记自动化"}],["meta",{"property":"og:description","content":"云边实体登记自动化 手动登记实体流程 登记实体的步骤如下 从脚本中获取到需要登记的实体 如果脚本内容过多提取出需要登记的实体很消耗精力， 人无法长时间专注，也有可能出现漏掉。 图片 从省内批量采集实体 1. 需要切换网络，使用VPN登录省内，导致云边网络失效。这样一来一回非常耗时。 网络卡顿很影响云桌面的操作。 2. 采集的时候需要分不同的周期，月，日，无周期需要分开采集。采集完到资产 管理中发布实体, 发布完还需要导出发布包，再通过邮件发送出去。 图片] 云边导入发布包 重新登录云边VPN和云边。 开始登记实体 &nbsp; 实体基本信息 实体分区和HASH策略 接口规范 &nbsp; 填写业务口径 去规范手册寻找该接口的业务描述。规范手册又有好几册，寻找起来较为费时。 填写技术口径 去原脚本寻找该表的插入SQL语句。 填写中文字段名称 从规范手册中寻找每个字段对应的中文名称，这步是最耗时的。首先有些表的字段很多， 其次有些接口临时表很多，每次都需要重复填写。 主键HASH策略 从规范手册中寻找主键字段 建立分区 根据不同的统计日期建立不同的分区。 提交发布上线完成实体登记 实体列表 发布包"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-14T00:31:08.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:modified_time","content":"2023-09-14T00:31:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"云边实体登记自动化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-14T00:31:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"手动登记实体流程","slug":"手动登记实体流程","link":"#手动登记实体流程","children":[]},{"level":2,"title":"自动化登记实体","slug":"自动化登记实体","link":"#自动化登记实体","children":[{"level":3,"title":"材料准备","slug":"材料准备","link":"#材料准备","children":[]},{"level":3,"title":"登记流程","slug":"登记流程","link":"#登记流程","children":[]}]}],"git":{"createdTime":1694651468000,"updatedTime":1694651468000,"contributors":[{"name":"起凡","email":"1507906763@qq.com","commits":1}]},"readingTime":{"minutes":25.85,"words":7756},"filePathRelative":"knowledge/worker/onebass/README.md","localizedDate":"2023年9月14日","excerpt":"<h1> 云边实体登记自动化</h1>\\n<h2> 手动登记实体流程</h2>\\n<p>登记实体的步骤如下</p>\\n<div>\\n<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" contentstyletype=\\"text/css\\" preserveAspectRatio=\\"none\\" style=\\"background:#FFFFFF;\\" version=\\"1.1\\" viewBox=\\"0 0 1287 1832\\" zoomAndPan=\\"magnify\\"><defs></defs><g><ellipse cx=\\"184.5\\" cy=\\"28.8\\" fill=\\"#222222\\" rx=\\"18\\" ry=\\"18\\" style=\\"stroke:none;stroke-width:1.8;\\"></ellipse><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"343.8\\" x=\\"12.6\\" y=\\"128.7\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"302.4\\" x=\\"30.6\\" y=\\"170.0086\\">\\n从脚本中获取到需要登记的实体</text><g id=\\"elem_GMN5\\"><path d=\\"M392.4,120.6 L392.4,153.9 L356.508,161.1 L392.4,168.3 L392.4,200.8477 A0,0 0 0 0 392.4,200.8477 L991.8,200.8477 A0,0 0 0 0 991.8,200.8477 L991.8,138.6 L973.8,120.6 L392.4,120.6 A0,0 0 0 0 392.4,120.6 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M973.8,120.6 L973.8,138.6 L991.8,138.6 L973.8,120.6 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"561.6\\" x=\\"403.2\\" y=\\"154.851\\">\\n如果脚本内容过多提取出需要登记的实体很消耗精力，</text><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"421.2\\" x=\\"403.2\\" y=\\"185.9748\\">\\n人无法长时间专注，也有可能出现漏掉。</text><a xlink:href=\\"/blog/images/knowledge/newland/img.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\img.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"46.8\\" x=\\"824.4\\" y=\\"185.9748\\">\\n图片</text></a></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"230.4\\" x=\\"69.3\\" y=\\"356.4\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"194.4\\" x=\\"87.3\\" y=\\"397.7086\\">\\n从省内批量采集实体</text><g id=\\"elem_GMN10\\"><path d=\\"M336.6,302.4 L336.6,381.6 L300.006,388.8 L336.6,396 L336.6,476.0191 A0,0 0 0 0 336.6,476.0191 L1245.6,476.0191 A0,0 0 0 0 1245.6,476.0191 L1245.6,320.4 L1227.6,302.4 L336.6,302.4 A0,0 0 0 0 336.6,302.4 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M1227.6,302.4 L1227.6,320.4 L1245.6,320.4 L1227.6,302.4 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"871.2\\" x=\\"347.4\\" y=\\"336.651\\">\\n1.\\n需要切换网络，使用VPN登录省内，导致云边网络失效。这样一来一回非常耗时。</text><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"327.6\\" x=\\"376.2\\" y=\\"367.7748\\">\\n网络卡顿很影响云桌面的操作。</text><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"822.6\\" x=\\"347.4\\" y=\\"398.8986\\">\\n2.\\n采集的时候需要分不同的周期，月，日，无周期需要分开采集。采集完到资产</text><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"693\\" x=\\"376.2\\" y=\\"430.0225\\">\\n管理中发布实体,\\n发布完还需要导出发布包，再通过邮件发送出去。</text><a xlink:href=\\"/blog/images/knowledge/newland/img_2.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\img_2.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"46.8\\" x=\\"347.4\\" y=\\"461.1463\\">\\n图片</text></a><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"7.2\\" x=\\"394.2\\" y=\\"461.1463\\">]</text></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"187.2\\" x=\\"90.9\\" y=\\"576\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"151.2\\" x=\\"108.9\\" y=\\"617.3086\\">\\n云边导入发布包</text><g id=\\"elem_GN15\\"><path d=\\"M314.1,584.1 L314.1,601.2 L278.46,608.4 L314.1,615.6 L314.1,633.2238 A0,0 0 0 0 314.1,633.2238 L634.5,633.2238 A0,0 0 0 0 634.5,633.2238 L634.5,602.1 L616.5,584.1 L314.1,584.1 A0,0 0 0 0 314.1,584.1 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M616.5,584.1 L616.5,602.1 L634.5,602.1 L616.5,584.1 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"282.6\\" x=\\"324.9\\" y=\\"618.351\\">\\n重新登录云边VPN和云边。</text></g><rect fill=\\"#555555\\" height=\\"14.4\\" style=\\"stroke:none;stroke-width:1.8;\\" width=\\"144\\" x=\\"112.5\\" y=\\"714.6\\"></rect><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"165.6\\" x=\\"101.7\\" y=\\"856.8\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"129.6\\" x=\\"119.7\\" y=\\"898.1086\\">\\n开始登记实体</text><g id=\\"elem_GMN22\\"><path d=\\"M303.3,802.8 L303.3,882 L267.678,889.2 L303.3,896.4 L303.3,976.4191 A0,0 0 0 0 303.3,976.4191 L569.7,976.4191 A0,0 0 0 0 569.7,976.4191 L569.7,820.8 L551.7,802.8 L303.3,802.8 A0,0 0 0 0 303.3,802.8 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M551.7,802.8 L551.7,820.8 L569.7,820.8 L551.7,802.8 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"7.2\\" x=\\"314.1\\" y=\\"837.051\\">\\n&nbsp;</text><a xlink:href=\\"/blog/images/knowledge/newland/img_4.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\img_4.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"140.4\\" x=\\"314.1\\" y=\\"868.1748\\">\\n实体基本信息</text></a><a xlink:href=\\"/blog/images/knowledge/newland/img_5.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\img_5.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"228.6\\" x=\\"314.1\\" y=\\"899.2986\\">\\n实体分区和HASH策略</text></a><a xlink:href=\\"/blog/images/knowledge/newland/img_3.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\img_3.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"93.6\\" x=\\"314.1\\" y=\\"930.4225\\">\\n接口规范</text></a><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"7.2\\" x=\\"314.1\\" y=\\"961.5463\\">\\n&nbsp;</text></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"165.6\\" x=\\"101.7\\" y=\\"1049.4\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"129.6\\" x=\\"119.7\\" y=\\"1090.7086\\">\\n填写业务口径</text><g id=\\"elem_GN27\\"><path d=\\"M303.3,1057.5 L303.3,1074.6 L267.336,1081.8 L303.3,1089 L303.3,1106.6238 A0,0 0 0 0 303.3,1106.6238 L1160.1,1106.6238 A0,0 0 0 0 1160.1,1106.6238 L1160.1,1075.5 L1142.1,1057.5 L303.3,1057.5 A0,0 0 0 0 303.3,1057.5 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M1142.1,1057.5 L1142.1,1075.5 L1160.1,1075.5 L1142.1,1057.5 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"819\\" x=\\"314.1\\" y=\\"1091.751\\">\\n去规范手册寻找该接口的业务描述。规范手册又有好几册，寻找起来较为费时。</text></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"165.6\\" x=\\"101.7\\" y=\\"1188\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"129.6\\" x=\\"119.7\\" y=\\"1229.3086\\">\\n填写技术口径</text><g id=\\"elem_GN32\\"><path d=\\"M304.2,1196.1 L304.2,1213.2 L267.858,1220.4 L304.2,1227.6 L304.2,1245.2238 A0,0 0 0 0 304.2,1245.2238 L716.4,1245.2238 A0,0 0 0 0 716.4,1245.2238 L716.4,1214.1 L698.4,1196.1 L304.2,1196.1 A0,0 0 0 0 304.2,1196.1 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M698.4,1196.1 L698.4,1214.1 L716.4,1214.1 L698.4,1196.1 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"374.4\\" x=\\"315\\" y=\\"1230.351\\">\\n去原脚本寻找该表的插入SQL语句。</text></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"208.8\\" x=\\"80.1\\" y=\\"1334.7\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"172.8\\" x=\\"98.1\\" y=\\"1376.0086\\">\\n填写中文字段名称</text><g id=\\"elem_GMN37\\"><path d=\\"M324.9,1326.6 L324.9,1359.9 L289.098,1367.1 L324.9,1374.3 L324.9,1406.8477 A0,0 0 0 0 324.9,1406.8477 L1275.3,1406.8477 A0,0 0 0 0 1275.3,1406.8477 L1275.3,1344.6 L1257.3,1326.6 L324.9,1326.6 A0,0 0 0 0 324.9,1326.6 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M1257.3,1326.6 L1257.3,1344.6 L1275.3,1344.6 L1257.3,1326.6 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"912.6\\" x=\\"335.7\\" y=\\"1360.851\\">\\n从规范手册中寻找每个字段对应的中文名称，这步是最耗时的。首先有些表的字段很多，</text><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"514.8\\" x=\\"342.9\\" y=\\"1391.9748\\">\\n其次有些接口临时表很多，每次都需要重复填写。</text></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"181.8\\" x=\\"93.6\\" y=\\"1481.4\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"145.8\\" x=\\"111.6\\" y=\\"1522.7086\\">\\n主键HASH策略</text><g id=\\"elem_GN42\\"><path d=\\"M311.4,1489.5 L311.4,1506.6 L275.616,1513.8 L311.4,1521 L311.4,1538.6238 A0,0 0 0 0 311.4,1538.6238 L630,1538.6238 A0,0 0 0 0 630,1538.6238 L630,1507.5 L612,1489.5 L311.4,1489.5 A0,0 0 0 0 311.4,1489.5 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M612,1489.5 L612,1507.5 L630,1507.5 L612,1489.5 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"280.8\\" x=\\"322.2\\" y=\\"1523.751\\">\\n从规范手册中寻找主键字段</text></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"122.4\\" x=\\"123.3\\" y=\\"1620\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"86.4\\" x=\\"141.3\\" y=\\"1661.3086\\">\\n建立分区</text><g id=\\"elem_GN47\\"><path d=\\"M281.7,1628.1 L281.7,1645.2 L246.024,1652.4 L281.7,1659.6 L281.7,1677.2238 A0,0 0 0 0 281.7,1677.2238 L717.3,1677.2238 A0,0 0 0 0 717.3,1677.2238 L717.3,1646.1 L699.3,1628.1 L281.7,1628.1 A0,0 0 0 0 281.7,1628.1 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><path d=\\"M699.3,1628.1 L699.3,1646.1 L717.3,1646.1 L699.3,1628.1 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.9;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"23.4\\" lengthAdjust=\\"spacing\\" textLength=\\"397.8\\" x=\\"292.5\\" y=\\"1662.351\\">\\n根据不同的统计日期建立不同的分区。</text></g><rect fill=\\"#F1F1F1\\" height=\\"64.7297\\" rx=\\"22.5\\" ry=\\"22.5\\" style=\\"stroke:#181818;stroke-width:0.9;\\" width=\\"295.2\\" x=\\"36.9\\" y=\\"1758.6\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"21.6\\" lengthAdjust=\\"spacing\\" textLength=\\"259.2\\" x=\\"54.9\\" y=\\"1799.9086\\">\\n提交发布上线完成实体登记</text><!--link start to ?????????????? --><g id=\\"link_start_从脚本中获取到需要登记的实体 \\"><path d=\\"M184.5,46.908 C184.5,64.926 184.5,94.662 184.5,119.016 \\" fill=\\"none\\" id=\\"start-to-从脚本中获取到需要登记的实体 \\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,128.394,191.7,112.194,184.5,119.394,177.3,112.194,184.5,128.394\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link ??????????????  to ?????????--><g id=\\"link_从脚本中获取到需要登记的实体 _从省内批量采集实体\\"><path d=\\"M184.5,193.59 C184.5,233.262 184.5,302.472 184.5,346.446 \\" fill=\\"none\\" id=\\"从脚本中获取到需要登记的实体 -to-从省内批量采集实体\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,355.968,191.7,339.768,184.5,346.968,177.3,339.768,184.5,355.968\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"19.8\\" lengthAdjust=\\"spacing\\" textLength=\\"79.2\\" x=\\"186.3\\" y=\\"260.7662\\">\\n实体列表</text></g><!--link ????????? to ???????--><g id=\\"link_从省内批量采集实体_云边导入发布包\\"><path d=\\"M184.5,421.542 C184.5,459.72 184.5,524.7 184.5,566.622 \\" fill=\\"none\\" id=\\"从省内批量采集实体-to-云边导入发布包\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,575.712,191.7,559.512,184.5,566.712,177.3,559.512,184.5,575.712\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"19.8\\" lengthAdjust=\\"spacing\\" textLength=\\"59.4\\" x=\\"186.3\\" y=\\"534.3662\\">\\n发布包</text></g><!--link ??????? to s1--><g id=\\"link_云边导入发布包_s1\\"><path d=\\"M184.5,641.376 C184.5,662.166 184.5,688.608 184.5,704.916 \\" fill=\\"none\\" id=\\"云边导入发布包-to-s1\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,714.006,191.7,697.806,184.5,705.006,177.3,697.806,184.5,714.006\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link s1 to ??????--><g id=\\"link_s1_开始登记实体\\"><path d=\\"M184.5,729.054 C184.5,747.144 184.5,806.346 184.5,847.008 \\" fill=\\"none\\" id=\\"s1-to-开始登记实体\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,856.404,191.7,840.204,184.5,847.404,177.3,840.204,184.5,856.404\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link ?????? to ??????--><g id=\\"link_开始登记实体_填写业务口径\\"><path d=\\"M184.5,922.212 C184.5,954.414 184.5,1004.76 184.5,1039.896 \\" fill=\\"none\\" id=\\"开始登记实体-to-填写业务口径\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,1049.364,191.7,1033.164,184.5,1040.364,177.3,1033.164,184.5,1049.364\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link ?????? to ??????--><g id=\\"link_填写业务口径_填写技术口径\\"><path d=\\"M184.5,1114.236 C184.5,1133.262 184.5,1157.922 184.5,1178.496 \\" fill=\\"none\\" id=\\"填写业务口径-to-填写技术口径\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,1187.622,191.7,1171.422,184.5,1178.622,177.3,1171.422,184.5,1187.622\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link ?????? to ????????--><g id=\\"link_填写技术口径_填写中文字段名称\\"><path d=\\"M184.5,1253.25 C184.5,1274.256 184.5,1302.192 184.5,1324.926 \\" fill=\\"none\\" id=\\"填写技术口径-to-填写中文字段名称\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,1334.304,191.7,1318.104,184.5,1325.304,177.3,1318.104,184.5,1334.304\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link ???????? to ??HASH??--><g id=\\"link_填写中文字段名称_主键HASH策略\\"><path d=\\"M184.5,1399.95 C184.5,1420.956 184.5,1448.892 184.5,1471.626 \\" fill=\\"none\\" id=\\"填写中文字段名称-to-主键HASH策略\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,1481.004,191.7,1464.804,184.5,1472.004,177.3,1464.804,184.5,1481.004\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link ??HASH?? to ????--><g id=\\"link_主键HASH策略_建立分区\\"><path d=\\"M184.5,1546.236 C184.5,1565.262 184.5,1589.922 184.5,1610.496 \\" fill=\\"none\\" id=\\"主键HASH策略-to-建立分区\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,1619.622,191.7,1603.422,184.5,1610.622,177.3,1603.422,184.5,1619.622\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--link ???? to ????????????--><g id=\\"link_建立分区_提交发布上线完成实体登记\\"><path d=\\"M184.5,1684.836 C184.5,1703.862 184.5,1728.522 184.5,1749.096 \\" fill=\\"none\\" id=\\"建立分区-to-提交发布上线完成实体登记\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></path><polygon fill=\\"#181818\\" points=\\"184.5,1758.222,191.7,1742.022,184.5,1749.222,177.3,1742.022,184.5,1758.222\\" style=\\"stroke:#181818;stroke-width:1.8;\\"></polygon></g><!--SRC=[lLLDRnfN5DtpAqPPjLKTrsuhHPPSjL8NMLHLgqZT6Ajop0HReGmrfDvYO_DX0uDZ0p6C3PE2RJM18OsDX-7hn_IzEszM_GkzRnvWK9EjMGn-ZtkFpptttZEVVFRftDmtqWFIpRAz4cXlYTbWsLkg5cYovMXHTh5ZdtPPisMNzcZpdFIFfGUUe1AHfQrD_qR4GozsuLmJgJI-JviTDapGMWdK7CT8M1_4e8Caj9CiMhJ_7j23yh-zj8TO5XIhy3xlv8TGR3l5Qs8Um_ih_8rqAg2bg6gmM1yHxMmBUYfaK_z4TrTMDYAHqDByV41PNmjiAE78qgCl7YtCV_iiFF_zadTRsNeU2gojozvrnITxbP0S32iljl3y- -QpjU3Squ3Yd_lZXHpQaiFXHQzFMGzxdmULxO3iyylUeBmTM0lwl9k_-H-6Wdw9bWTsAh6wwf63Febhu47fLaOL9OjClrgLK4TRsq4b8DLn4ggJI3Zbk0YPbctXeII4eSa4P5xR_IExg_5I-qFxvEgNdtv4mMW_Bw3mdXezbhWcrX4RT4GmhRs3V18bOCDJgDuICmfdTNpIyhbpTavD4zL57J708-5db9JH7Ns8wjF-EtgSGJpGqyxPQsmCuB6lyV15vERIvhV5DesUZgd6YPcXkJHluz4LQ1Ka1bgIFujrzraLzvDuseiAACGTIv76mM8tUyIw5CIQkfr3u0PLZwWP4r9zBerFQJPyDO8pUjZyqNtQ5IMUSQ8bd3TdjqcwRVp9YUxmc6oNrt5Vi_7huinqp8w7j39Xl2hQn-lOhqzkfwPY2NNFGA4bUY-YSHJeoxJucnV58PUNbwNm0lzoZoWolJmK6_R_IRi_6RuICeXrg5ZSIuOwx1YeoBrn-7gQ0yvVsaBr7d_tvB7TADZv-drI-TAb0bbizP_iSe-bO_ZVxsP3j4v_G-Edn2pH0nt3w61lPXnma4Kcf0vf74sW2wa1C-e25DTGP8Agic6BMy5qi9hafbb7nwpYqVKGD_tc5es23MB4jDXrPsGHTsJW80gQyM4oD5iPEVsO2NeUTmdr9Oxqavz_O0QkSNqM45SR2WdQA4BpXkOozcLhUZpvUsUADVS15niCbPX_ZRAC3hLEt79TA1S42-BErwZ3AmFG85otmnZkD1S5ki-h9rPP41pXeE_LIlnb8z7zDhpLHOXGavZN283XaoYaW35Eh2_y1tUJrZAY9bxXp9OJi-kSDEy6RKQvZzKeaWGt8LZNijySYhcTGO1g1pBDYVlQtGfhwcYwwBKYvywOtUHn1_0jJAoQy1fY7jZM41qLaZcn8C8oFFy1]--></g></svg>\\n</div>","autoDesc":true}');export{t as data};

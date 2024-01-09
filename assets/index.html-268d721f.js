const t=JSON.parse('{"key":"v-ec827454","path":"/knowledge/newland/script/","title":"脚本迁移自动化","lang":"zh-CN","frontmatter":{"description":"脚本迁移自动化 手动迁移流程图 迁移流程图 脚本迁移中，提取SQL片段，提取注释，替换变量，改造常见语法这些都是十分重复的工作，而这些重复的工作占用了80%的工作时间。 只有少量的时间在修改逻辑性的片段，所以如果能用脚本解决掉这大量的重复工作，那效率的提升是显而易见的的。 oracle原始脚本正则匹配代码块识别正则匹配V_SQL提取正则匹配注释提取替换规则变量替换比如 alter table truncate partition改成 delete from常见语法改造Oracle校验规则Gbase校验规则校验规则改造统一清空稽核表","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/knowledge/newland/script/"}],["meta",{"property":"og:site_name","content":"起凡Code闲聊"}],["meta",{"property":"og:title","content":"脚本迁移自动化"}],["meta",{"property":"og:description","content":"脚本迁移自动化 手动迁移流程图 迁移流程图 脚本迁移中，提取SQL片段，提取注释，替换变量，改造常见语法这些都是十分重复的工作，而这些重复的工作占用了80%的工作时间。 只有少量的时间在修改逻辑性的片段，所以如果能用脚本解决掉这大量的重复工作，那效率的提升是显而易见的的。 oracle原始脚本正则匹配代码块识别正则匹配V_SQL提取正则匹配注释提取替换规则变量替换比如 alter table truncate partition改成 delete from常见语法改造Oracle校验规则Gbase校验规则校验规则改造统一清空稽核表"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-30T12:47:34.000Z"}],["meta",{"property":"article:author","content":"起凡"}],["meta",{"property":"article:modified_time","content":"2023-09-30T12:47:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"脚本迁移自动化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-30T12:47:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"起凡\\",\\"url\\":\\"https://www.jarcheng.top\\"}]}"]]},"headers":[{"level":2,"title":"手动迁移流程图","slug":"手动迁移流程图","link":"#手动迁移流程图","children":[]},{"level":2,"title":"迁移流程图","slug":"迁移流程图","link":"#迁移流程图","children":[]}],"git":{"createdTime":1694651468000,"updatedTime":1696078054000,"contributors":[{"name":"起凡","email":"1507906763@qq.com","commits":2}]},"readingTime":{"minutes":6.87,"words":2062},"filePathRelative":"knowledge/newland/script/README.md","localizedDate":"2023年9月14日","excerpt":"<h1> 脚本迁移自动化</h1>\\n<h2> 手动迁移流程图</h2>\\n<h2> 迁移流程图</h2>\\n<p>脚本迁移中，提取SQL片段，提取注释，替换变量，改造常见语法这些都是十分重复的工作，而这些重复的工作占用了80%的工作时间。<br>\\n只有少量的时间在修改逻辑性的片段，所以如果能用脚本解决掉这大量的重复工作，那效率的提升是显而易见的的。</p>\\n<div>\\n<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" contentstyletype=\\"text/css\\" preserveAspectRatio=\\"none\\" style=\\"background:#FFFFFF;\\" version=\\"1.1\\" viewBox=\\"0 0 354 539\\" zoomAndPan=\\"magnify\\"><defs></defs><g><ellipse cx=\\"63\\" cy=\\"20\\" fill=\\"#222222\\" rx=\\"10\\" ry=\\"10\\" style=\\"stroke:#222222;stroke-width:1.0;\\"></ellipse><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"102\\" x=\\"12\\" y=\\"50\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"82\\" x=\\"22\\" y=\\"72.9492\\">oracle原始脚本</text><path d=\\"M123,110.2959 L123,119.9414 L103,123.9414 L123,127.9414 L123,137.5869 A0,0 0 0 0 123,137.5869 L196,137.5869 A0,0 0 0 0 196,137.5869 L196,120.2959 L186,110.2959 L123,110.2959 A0,0 0 0 0 123,110.2959 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><path d=\\"M186,110.2959 L186,120.2959 L196,120.2959 L186,110.2959 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><a xlink:href=\\"/blog/images/knowledge/newland/script/img_1.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\script\\\\img_1.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"52\\" x=\\"129\\" y=\\"129.3242\\">正则匹配</text></a><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"80\\" x=\\"23\\" y=\\"105.9609\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"60\\" x=\\"33\\" y=\\"128.9102\\">代码块识别</text><path d=\\"M124,166.2568 L124,175.9023 L104,179.9023 L124,183.9023 L124,193.5479 A0,0 0 0 0 124,193.5479 L197,193.5479 A0,0 0 0 0 197,193.5479 L197,176.2568 L187,166.2568 L124,166.2568 A0,0 0 0 0 124,166.2568 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><path d=\\"M187,166.2568 L187,176.2568 L197,176.2568 L187,166.2568 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><a xlink:href=\\"/blog/images/knowledge/newland/script/img_2.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\script\\\\img_2.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"52\\" x=\\"130\\" y=\\"185.2852\\">正则匹配</text></a><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"82\\" x=\\"22\\" y=\\"161.9219\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"62\\" x=\\"32\\" y=\\"184.8711\\">V_SQL提取</text><path d=\\"M118.5,222.2178 L118.5,231.8633 L98.5,235.8633 L118.5,239.8633 L118.5,249.5088 A0,0 0 0 0 118.5,249.5088 L191.5,249.5088 A0,0 0 0 0 191.5,249.5088 L191.5,232.2178 L181.5,222.2178 L118.5,222.2178 A0,0 0 0 0 118.5,222.2178 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><path d=\\"M181.5,222.2178 L181.5,232.2178 L191.5,232.2178 L181.5,222.2178 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><a xlink:href=\\"/blog/images/knowledge/newland/script/img_3.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\script\\\\img_3.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"52\\" x=\\"124.5\\" y=\\"241.2461\\">正则匹配</text></a><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"71\\" x=\\"27.5\\" y=\\"217.8828\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"48\\" x=\\"37.5\\" y=\\"240.832\\">注释提取</text><path d=\\"M117,278.1787 L117,287.8242 L97,291.8242 L117,295.8242 L117,305.4697 A0,0 0 0 0 117,305.4697 L190,305.4697 A0,0 0 0 0 190,305.4697 L190,288.1787 L180,278.1787 L117,278.1787 A0,0 0 0 0 117,278.1787 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><path d=\\"M180,278.1787 L180,288.1787 L190,288.1787 L180,278.1787 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><a xlink:href=\\"/blog/images/knowledge/newland/script/img_4.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\script\\\\img_4.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"52\\" x=\\"123\\" y=\\"297.207\\">替换规则</text></a><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"68\\" x=\\"29\\" y=\\"273.8438\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"48\\" x=\\"39\\" y=\\"296.793\\">变量替换</text><path d=\\"M129,325.4941 L129,343.7852 L109,347.7852 L129,351.7852 L129,370.0762 A0,0 0 0 0 129,370.0762 L342,370.0762 A0,0 0 0 0 342,370.0762 L342,335.4941 L332,325.4941 L129,325.4941 A0,0 0 0 0 129,325.4941 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><path d=\\"M332,325.4941 L332,335.4941 L342,335.4941 L332,325.4941 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" textLength=\\"192\\" x=\\"135\\" y=\\"344.5225\\">比如 alter table  truncate partition</text><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" textLength=\\"94\\" x=\\"135\\" y=\\"361.8135\\">改成 delete from</text><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"92\\" x=\\"17\\" y=\\"329.8047\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"72\\" x=\\"27\\" y=\\"352.7539\\">常见语法改造</text><path d=\\"M129,385.7656 L129,404.0566 L109,408.0566 L129,412.0566 L129,430.3477 A0,0 0 0 0 129,430.3477 L240,430.3477 A0,0 0 0 0 240,430.3477 L240,395.7656 L230,385.7656 L129,385.7656 A0,0 0 0 0 129,385.7656 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><path d=\\"M230,385.7656 L230,395.7656 L240,395.7656 L230,385.7656 \\" fill=\\"#FEFFDD\\" style=\\"stroke:#181818;stroke-width:0.5;\\"></path><a xlink:href=\\"/blog/images/knowledge/newland/script/img_5.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\script\\\\img_5.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"90\\" x=\\"135\\" y=\\"404.7939\\">Oracle校验规则</text></a><a xlink:href=\\"/blog/images/knowledge/newland/script/img_6.png\\" target=\\"_top\\" xlink:title=\\"http://localhost:8081/@fs/D:\\\\workplace\\\\code\\\\opensource\\\\qifan-blog-vuepress2\\\\docs\\\\knowledge\\newland\\\\script\\\\img_6.png\\" xlink:actuate=\\"onRequest\\" xlink:show=\\"new\\" xlink:type=\\"simple\\"><text fill=\\"#0000FF\\" font-family=\\"sans-serif\\" font-size=\\"13\\" lengthAdjust=\\"spacing\\" text-decoration=\\"underline\\" textLength=\\"90\\" x=\\"135\\" y=\\"422.085\\">Gbase校验规则</text></a><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"92\\" x=\\"17\\" y=\\"390.0762\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"72\\" x=\\"27\\" y=\\"413.0254\\">校验规则改造</text><rect fill=\\"#F1F1F1\\" height=\\"35.9609\\" rx=\\"12.5\\" ry=\\"12.5\\" style=\\"stroke:#181818;stroke-width:0.5;\\" width=\\"104\\" x=\\"11\\" y=\\"450.3477\\"></rect><text fill=\\"#000000\\" font-family=\\"sans-serif\\" font-size=\\"12\\" lengthAdjust=\\"spacing\\" textLength=\\"84\\" x=\\"21\\" y=\\"473.2969\\">统一清空稽核表</text><ellipse cx=\\"63\\" cy=\\"517.3086\\" fill=\\"none\\" rx=\\"11\\" ry=\\"11\\" style=\\"stroke:#222222;stroke-width:1.0;\\"></ellipse><ellipse cx=\\"63\\" cy=\\"517.3086\\" fill=\\"#222222\\" rx=\\"6\\" ry=\\"6\\" style=\\"stroke:#111111;stroke-width:1.0;\\"></ellipse><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"30\\" y2=\\"50\\"></line><polygon fill=\\"#181818\\" points=\\"59,40,63,50,67,40,63,44\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"85.9609\\" y2=\\"105.9609\\"></line><polygon fill=\\"#181818\\" points=\\"59,95.9609,63,105.9609,67,95.9609,63,99.9609\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"141.9219\\" y2=\\"161.9219\\"></line><polygon fill=\\"#181818\\" points=\\"59,151.9219,63,161.9219,67,151.9219,63,155.9219\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"197.8828\\" y2=\\"217.8828\\"></line><polygon fill=\\"#181818\\" points=\\"59,207.8828,63,217.8828,67,207.8828,63,211.8828\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"253.8438\\" y2=\\"273.8438\\"></line><polygon fill=\\"#181818\\" points=\\"59,263.8438,63,273.8438,67,263.8438,63,267.8438\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"309.8047\\" y2=\\"329.8047\\"></line><polygon fill=\\"#181818\\" points=\\"59,319.8047,63,329.8047,67,319.8047,63,323.8047\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"365.7656\\" y2=\\"390.0762\\"></line><polygon fill=\\"#181818\\" points=\\"59,380.0762,63,390.0762,67,380.0762,63,384.0762\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"426.0371\\" y2=\\"450.3477\\"></line><polygon fill=\\"#181818\\" points=\\"59,440.3477,63,450.3477,67,440.3477,63,444.3477\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><line style=\\"stroke:#181818;stroke-width:1.0;\\" x1=\\"63\\" x2=\\"63\\" y1=\\"486.3086\\" y2=\\"506.3086\\"></line><polygon fill=\\"#181818\\" points=\\"59,496.3086,63,506.3086,67,496.3086,63,500.3086\\" style=\\"stroke:#181818;stroke-width:1.0;\\"></polygon><!--SRC=[nTFBIWCn50RWVPuYBw3LUa6c6nU26q54SECKIMVIwT2OZ4bgjofLYxUwy7x1gc3hZIxSJ2tYopJfp5iujWkhY4kxp27XVFmvHqZ49J0OHnR1QkzALRQ3mfc-U4e0O3GRjwtoghey3ceRglYO09H93BdhP2IOdyz8wHcn664M8Xacf34sC3OO6q-Bs8HXvXdFUWHPsBIOZKtcOIfOZaVd9JUDQ5-ACATlEOSzZeM8cpQpX9cbB4-mxM2JuZn1r3Q5nLrFckwYip3Oxr47wkTRLJnLE_LmVJUP19ZQyDC4ZBc5sPafNTfNfQEUCkD_C_LBDTpSwZXXJw53VqDLwIJSBEdpTxrx4ur23w737MXR4bGA4VSxrFU3ocfGUzOlX_gW7gwKlyMgQmVgRWqY8Z674gK8Xb3o7BLGTCMBPj-LBgCWUgcB-z3614VrD6UBtPzMlWuVTZgzVsdntu6Cj0EPRcziDosAvRyfestAP0g9dvAlz5gDgwQ_eltrrlrhg_gcotvmNKq08Pdt0G00]--></g></svg>\\n</div>","autoDesc":true}');export{t as data};

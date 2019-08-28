---
title: Express 4.0 with EJS ใครตั้งให้ Jade เป็น Default นะคงจะดีมั้ง แต่เราชอบ EJS มากกว่านี่หน่า
date: 2016-08-02T03:01:22
description: ส่วนตัวผมใช้ ExpressJS มาซักระยะ แต่ติดปัญหาตรงที่ตัว View Jade นั้นใช้ยากพอสมควรวันนี้จะมาเสนอวิธีง่ายๆ ในการใช้ EJS Template ซึ่งน่าจะคุ้นเคยได้ง่ายกว่าเพราใช้  Tag   
1. Express gerner
---

ส่วนตัวผมใช้ ExpressJS มาซักระยะ แต่ติดปัญหาตรงที่ตัว View Jade นั้นใช้ยากพอสมควร
วันนี้จะมาเสนอวิธีง่ายๆ ในการใช้ EJS Template ซึ่งน่าจะคุ้นเคยได้ง่ายกว่าเพราใช้  Tag <%-  %>  <% %>

1. Express gernerator อันนี้ไม่ต้องสอนแล้วกันนะไปดูที่ expressjs ได้เลย

2. ติดตั้ง EJS
 
<pre class="theme:bncplusplus lang:batch decode:true " >npm install ejs</pre> 



3. แก้ไฟล์ app.js 
 
<pre class="theme:bncplusplus lang:js decode:true " >app.set('view engine', 'ejs');</pre> 


4. เปลี่ยนไฟล์ทั้งหมดใน View เป็น นามสกุล ejs 

5.ลองเขียน Simple  index.ejs ง่ายๆแบบด้านล่างก็ได้
 
<pre class="theme:bncplusplus lang:default decode:true " title="Index.ejs แบบง่ายๆ" >&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;&lt;%- title %&gt;&lt;/title&gt;
    &lt;meta name="description" content=""&gt;
    &lt;meta name="author" content=""&gt;

    &lt;!-- HTML5 shim, for IE6-8 support of HTML elements --&gt;
    &lt;!--[if lt IE 9]&gt;
    &lt;script src="http://html5shim.googlecode.com/svn/trunk/html5.js"&gt;&lt;/script&gt;
    &lt;![endif]--&gt;

    &lt;!-- styles --&gt;
    &lt;link href="stylesheets/style.css" rel="stylesheet"&gt;

&lt;/head&gt;
&lt;body&gt;
&lt;%- body %&gt;
&lt;/body&gt;
&lt;/html&gt;</pre> 


6. แก้ไฟล์ index.js
  
<pre class="theme:bncplusplus lang:js decode:true " >res.render('index', { body: 'Express' ,title : 'Hello'});</pre> 


จบแล้วครับง่ายๆ แบบนี้แหละ


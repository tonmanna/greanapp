---
title: ใครที่ประสบปัญหา Cannot find module '../build/Release/bson'
date: 2016-08-02T03:07:12
description: สำหรับ mongoose และ component อื่นๆ บน NPMหลักๆ แล้วมันเกิด จาก node-gyp ต้องการใช้ MSBuild ซึ่งโดยปกติเครื่องของนักพัฒนามักจะมี MSBuild มาอยู่แล้วฤซึ่งมักจะมากับ Visual Studio ดังนั้น มันจะไม่เกิดปัญ
---

สำหรับ mongoose และ component อื่นๆ บน NPM
หลักๆ แล้วมันเกิด จาก node-gyp ต้องการใช้ MSBuild ซึ่งโดยปกติเครื่องของนักพัฒนามักจะมี MSBuild มาอยู่แล้วฤซึ่งมักจะมากับ Visual Studio ดังนั้น มันจะไม่เกิดปัญหาเลยถ้าเราตั้งค่า Environment ของ npm ให้เรียบร้อยก่อนลงมือทำ 
Error ที่มักจะเจอก็คือเจ้านี่
 
<pre class="lang:default decode:true " >Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' } js-bson: Failed to load c++ bson extension, using pure JS version </pre> 


วิธีแก้ง่ายมากครับ ด้วยการรันคำสั่ง 
 
<pre class="lang:default decode:true " >npm config set msvs_version 2012</pre> 


เป็ํนอันจบพิธีครับ 


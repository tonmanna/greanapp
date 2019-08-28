---
title: Git มันง่ายจริงๆ เหรอ ก็ง่ายนะ อันนี้แบบทำงานคนเดียว ตอนหน้า แบบทำเป็นทีมแล้วกัน
date: 2014-08-05T03:11:48
description: gitคำสั่ง Git ที่ควรจะต้องจำได้ เรียงไปตามงานที่ทำเลยแล้วกัน Git อย่างที่รู้กัน ใช้ทำ Version Control มีทั้งแบบ Public และ Local หรือ Private หรือจะตั้ง Server เองด้วย Gitlab ก็สามารถทำได้ง่ายๆ การทำง
---

<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/512px-Git-logo.svg.png" width="512" height="214" class="alignnone" />
<strong>git</strong>
คำสั่ง Git ที่ควรจะต้องจำได้ เรียงไปตามงานที่ทำเลยแล้วกัน Git อย่างที่รู้กัน ใช้ทำ Version Control มีทั้งแบบ Public และ Local หรือ Private หรือจะตั้ง Server เองด้วย Gitlab ก็สามารถทำได้ง่ายๆ การทำงานของมันคือ มันจะคอยดูการเปลี่ยนแปลงของไฟล์ที่อยู่ใน Folder ที่ได้มีการติดตั้ง Git ไว้ การใช้ Git บน Windows ผมแนะนำว่าใช้ msysgit น่าจะง่ายสุด MAC ก็ git-osx หาโหลดได้จาก Internet ทั่วไป

<pre class="lang:default decode:true">git init</pre>
สร้างง git repository จะได้ foloder .git floder .git มาเพื่อเก็บค่าต่างๆของ Git

<pre class="lang:default decode:true">git config --glabal user.name "Worawut Boontan"
git config --global user.email "worawut@itopplus.com"
git config --list</pre>
กำหนดค่าพื้นฐานที่อ้างถึงผู้ใช้มีผลในตารางของ Git เวลา Commit ว่าใครเป็นคนทำ
 
<pre class="lang:default decode:true " >git help ..... </pre> 
เพื่อเปิด Help ว่าคำสั่งที่ใส่ลงไปใช้ยังไง เช่น git help add , git help commit , git help log

<pre class="lang:default decode:true " >git add xxx.xxx</pre> xxx.xxx คือชื่อไฟล์ที่ใช้เพิ่มไฟล์ลงไปใน Git repository สามารถใช้ * กำหนดเป็น wildcard ได้ คำสั่งนี้เรามักจะทำหลังจากมีการแก้ไข ลบ หรือ เพิ่ม ไฟล์ลงมายัง Folder Project ของเรา จะใช้คู่กันกับ git status เพื่อดูการเปลี่ยนแปลงที่เกิดขี้น


ไฟล์ .gitignore ควรศึกษาไว้ด้วย ใช้สำหรับระบุไฟล์ที่เราไม่จำเป็นต้อง Push หรือ Commit ขึ้น Git โดยการกำหนดเป็น Folder หรือไฟล์ คุณสามาระหาตัวอย่าง .gitignore ได้ที่นี่ <a href="http://github.com/github/gitignore" title="GitIgnore" target="_blank">http://github.com/github/gitignore</a>
ไฟล์ .gitignore ต้องอยู่ตรง Root ของ Project ด้วยนะครับ อย่าลืม dot หน้าชื่อไฟล์ล่ะบางคนคิดว่าไม่จำเป็นแต่มันต้องมีนะ ".gitignore"
 
<pre class="lang:default decode:true " >git commit -m "My First Git Version Control"</pre> Commit สิ่งที่เราทำ โดยปกติก็ทำหลังจากเรา add rm mv เพื่อยืนยันสิ่งที่ทำลง Version นี้ 
<pre class="lang:default decode:true " >git commit </pre>  ยังสามารถ ใช้ แบบไม่ต้องใส่ -m git จะเปิด Editor ที่ตั้งไว้ขึ้นมาเพื่อให้เราเขียน Comment แบบหลายบรรทัด ง่ายๆ แต่คุณควรใช้ VI หรือ Vim เป็นนะ 
<pre class="lang:default decode:true " >git commit -a -m "My Add Auto" </pre> ในบางทีคุณสามาระ Add พร้อมกับ Commit ได้ด้วยวิธีนี้
 
<pre class="lang:default decode:true " >git commit --amend </pre> เพื่อ Undo สิ่งที่คุณ Comment ที่ Commit ไปล่าสุด

<pre class="lang:default decode:true " >git status </pre> เพื่อดูว่ามีอะไรที่เราทำลงไปบ้าง อะไรยังไม่ได้ Add ที่มีเพิ่มขึ้นมาจากรุ่นก่อนหน้า คุณจะเห็นรายการไฟล์ต่างๆออกมา
 
<pre class="lang:default decode:true " >git diff 
git diff --cached 
</pre> 
หาความแตกต่างระหว่าง Current File ปัจจุบัน กับที่มีอยู่บน Git ถ้าต้องการดู diff ที่เป็น cached ถ้าเกิดเรา Commit ไปแล้ว ให้ใส่ --cache ต่อท้าย
 
<pre class="lang:default decode:true " >git log </pre>จะเห็นว่าแต่ละครั้งที่เรา Commit มีอะไรบ้างสามารถดู help เพิ่มเติมเพราะ Default มันจะได้บางค่าที่เราต้องการ
 
<pre class="lang:default decode:true " >git reset HEAD xxx.xxx </pre>ถ้าต้องการยกเลิกสิ่งที่เราทำไปสามารถใช้คำสั่งนี้ ได้ โดยยังสามารถใช้ Wildcard (*) เพื่อยกเลิกสิ่งที่ Add mv rm ที่ทำไปยัง Git ได้

จบแล้วครับคำสั่งหลักๆ สำหรับทำงานแบบ Local ไม่ได้พึ่งพา Server มีเพียง Git ที่คุณ Download มาใช้งานเท่านั้นเองก็ทำตามได้ทุกคำสั่ง พบกันใหม่ตอนหน้าครับ เพราะการใช้ Git จะเกิดประโยชน์ครบรูปแบบจริงๆ แล้วต้องทำให้สมารถทำงานเป็นทีมได้ดีขึ้น เป็นสิ่งสำคัญมากสำหรับ Git พบกันใหม่ตอนหน้า ปล. ถ้าอยากเขียนโปรแกรมก็อย่าหยุดเขียน....แค่นั้นเอง

<iframe width="640" height="480" src="//www.youtube.com/embed/R8oXJ78zUcU" frameborder="0" allowfullscreen></iframe>


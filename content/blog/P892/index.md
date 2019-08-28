---
title: การตรวจหาคนแอบใช้เครื่องเราเพื่อ ยิง Spam ไปยังชาวบ้าน
date: 2017-03-03T19:43:58
description: ขั้นแรก ต้องหาก่อนว่าเราโดนที่ไหน รู่รั่ว หรือทางเข้ามีมาก มายอย่างกรณีแรกมากจาก GGI- Perl นี่ อันนี้ แนะนำให้ปิด เพราะไม่น่าจะมีคนเขียน Perl แล้วนะถ้าเป็น Hosting ปกติถ้าใช้ Direct Admin ก็ทำตามนี้เล
---

<img class="aligncenter size-full wp-image-893" src="http://www.greanapp.com/wp-content/uploads/2017/03/spam.png" alt="" width="256" height="256" />

ขั้นแรก ต้องหาก่อนว่าเราโดนที่ไหน รู่รั่ว หรือทางเข้ามีมาก มาย

อย่างกรณีแรกมากจาก GGI- Perl นี่ อันนี้ แนะนำให้ปิด เพราะไม่น่าจะมีคนเขียน Perl แล้วนะถ้าเป็น Hosting ปกติ

ถ้าใช้ Direct Admin ก็ทำตามนี้เลยถ้ามี Custombuild Version 2.x

&nbsp;
<pre class="lang:default decode:true">$nano /usr/local/directadmin/custombuild/configure/ap2/configure.apach

เพิ่มสองบรรทัดนี้ บรรทัดก่อนหน้า ก็อย่าลืมเพิ่ม \ ด้วย ล่ะ

"--disable-cgid" \
"--disable-cgi"

จากนั้นกลับมาที่ Terminal แล้วรัน เป็นอันเรียบร้อย

$cd /usr/local/directadmin/custombuild/
$./build apache</pre>
ลองทดสอบดูว่ายังมีอะไร ใช้งาน Port 25 อยู่หรือเปล่าโดย

$netstat -anp | grep :25

ถ้ยังมีรายการการใช้งานแบบนี้อยู่ก็ให้ดู PS Number แล้วเอามาหาต่อ

<img class="aligncenter size-full wp-image-894" src="http://www.greanapp.com/wp-content/uploads/2017/03/2017-03-01_150309.png" alt="" width="826" height="102" />

โดย เราจะได้ PS Number ที่หลากหลายออก ไป ถ้าเป็น อะไรที่มันเป็น Service ก็จะได้เลขเดียวตลอด แต่ถ้าเป็น CGI Call PHP นี้ ต้องไป Deep หาอีกทีตามจังหว่ะที่มีการ Request

ด้วยคำสั่งเหล่านี้

ตามตัวอย่างเราจะหาโครงสร้างตัวที่เรียก php-cgi
<pre class="lang:default decode:true">pstree | grep php-cgi53</pre>
ซึ่งถ้ามันปกติ ก็จะมาจาก httpd นั่นหมายความ ว่ามันมาจาก apache

| `-httpd-+-php-cgi53

&nbsp;

ซึ่งกรณีนี้ผมเป็น Hosting ก็ต้องไปหาอีกว่าเว็บไหน ซึ่งอาจจะมีหลายเว็บ อีกสองคำสั่งที่ช่วยได้คือ

ps aux | grep php

ps xuww | grep php

ก็ค่อยๆ ไล่ดูว่าเว็บไหนถูก เรียก และมี path ของ application แปลกๆ แล้วแต่ประสบการณ์เลยครับตอนนี้

หรือถ้าจะเก็บเป็น Stat Trace ก็ ได้
strace -o /tmp/output -f -r -s4096 -p {PID}

ที่มาของปัญหามักมาจากลูกค้าครับ ไม่ค่อยเกี่ยวกับผู้ให้บริการ Hosting ซักเท่าไหร่ นี่ก็เป็นวิธีการตามหาจาก Process ใครมีวิธีดีๆ ก็ร่วมด้วยช่วยกันแชร์ได้นะครับเพื่อสังคม Hosting ปลอดภัยจาก SPAM

---
title: Asp.NET VNext เหล้าใหม่ในขวดใหม่ มาช้าไปมั้ย (OSX / LINUX)
date: 2016-08-02T03:05:10
description: เป็นที่ทราบกันดีมานานว่าเทคโนโลยี .NET ทั้งตระกูลนั่นผูกขาดให้รันทำงานได้ดีบน Windows System เท่านั้น
---

   <a href="http://www.greanapp.com/wp-content/uploads/2014/11/3652.image_thumb_00F147A2.png"><img src="http://www.greanapp.com/wp-content/uploads/2014/11/3652.image_thumb_00F147A2.png" alt="3652.image_thumb_00F147A2" width="856" height="473" class="alignnone size-full wp-image-213" /></a>

<blockquote>เป็นที่ทราบกันดีมานานว่าเทคโนโลยี .NET ทั้งตระกูลนั่นผูกขาดให้รันทำงานได้ดีบน Windows System เท่านั้นจนกระทั่งเกิด Mono Project ที่อนุญาติให้ .NET สามารถทำงานได้บน Platform อื่น ซึ่งผมเองก็เคยใช้ Mono ตั้งแต่สมัย .NET 2.0  สมัยนั้นผมใช้ทดสอบรัน ASP.NET Website ก็ทำงานได้นะแต่รู้สึกว่ามันแปความจริงแล้ว MonoProject ก็เริ่มพอๆ กับ .NET เพียงแต่ว่าไม่เป็นที่นิยม และตอนนั้น .NET ยังถูกมองว่ามันคงมาแทน JAVA จึงยังไม่เป็นที่แพร่หลายมากนัก ช่วงปี 2001 ผมจำได้ว่าผมได้หยิบ HardDisk ไปขอ Copy Visual Studio รุ่นทดลองกับอาจารย์ที่ภาควิชาคอม ที่ม. ตอนนั้นจำได้ว่าอาจารย์ให้ Resource ของ มหาลัยโหลดมา สมัยก่อน Link 10M นี่หายากมาก แต่ด้วยความกรุณาของอาจารย์ผมก็ได้มาทดสอบ จำได้ว่าตอนนั้นรู้สึกว่ามันรันช้าแปลกๆ เพราะผมเขียน ​VS C++ 6. ก่อนจะมาใช้งาน .NET เลยรู้สึกว่ามันจะทำงานช้าไปนิด เราจะนอกประเด็นไปเยอะล่ะกลับมาๆ
</blockquote>

ASP.NET VNext ไม่จำเป็นต้องใช้ System.Web อีกต่อไปคุณสามารถนำมันไม่รันที่ไหนก็ได้ผ่าน KRE ที่ใช้ Mono เป็นตัว ​CLR ทีมงาน ASP.NET บอกว่า CLR ที่ทำงานบน KRE/Mono45 รองรับการทำงานในโหมด Cloud Optimize แน่นอนว่าถ้าคุณเขียน ASP.NET VNext บน Windows คุณยังสามารถใช้ ASP.NET 4.5.1 เป็นตัว Core CLR ได้เช่นเดิมหรือคุณจะใช้ KRE ก็ทำได้เช่นเดียวกัน แต่คำสั่งที่ทำงานบน ASP.NET VNext ยังไม่สามารถทำงานได้ทั้งหมดบน ​Core CLR ซึ่งทางทีมนั้นจะเพิ่มความสามารถให้กับ ASP.NET Core CLR แต่ถ้าตอนนี้ที่ผมเขียนบทความนี้ จะให้ทำงานได้แน่นอนทุกเรื่อง แนะนำให้ใช้ ​K บน Platform Mono45 มากว่านั่นเอง ซึ่งก็ทำงานบน Windows ได้อย่างไม่มีปัญหา

สำหรับวันนี้ผมได้ทดสอบ ASP.NET VNext ร่วมกับ Yo asp.net generator นะมาเริ่มกันเลยทำตา Link นี้เลย <a href="https://github.com/aspnet/home" title="ASP.Net VNext  GitHub">ASP.Net VNext GitHub</a>

 <a href="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-10.47.50-AM.png"><img src="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-10.47.50-AM.png" alt="Screen Shot 2557-11-05 at 10.47.50 AM" width="1618" height="1052" class="alignnone size-full wp-image-219" /></a>

จากนั้น CD เข้า Folder ไปยัง Path ที่ต้องการ แล้วทำตามรูป
<a href="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-10.53.20-AM.png"><img src="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-10.53.20-AM.png" alt="Screen Shot 2557-11-05 at 10.53.20 AM" width="2412" height="1232" class="alignnone size-full wp-image-222" /></a>

จะสังเกตุได้ว่าโครงสร้างเหมือน ASP.NET MVC เดิมเลยไม่แตกต่างจะมีแค่ไฟล์ Project.JSON ทำหน้าที่คล้าย Solution Explorer 
<a href="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-10.56.10-AM.png"><img src="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-10.56.10-AM.png" alt="Screen Shot 2557-11-05 at 10.56.10 AM" width="666" height="754" class="alignnone size-full wp-image-223" /></a>

จากนั้น k kestrel เพิ่มเริ่มทำงานเป็นอันเสร็จเรียบร้อยครับ
<a href="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-11.00.16-AM.png"><img src="http://www.greanapp.com/wp-content/uploads/2014/11/Screen-Shot-2557-11-05-at-11.00.16-AM.png" alt="Screen Shot 2557-11-05 at 11.00.16 AM" width="2036" height="1314" class="alignnone size-full wp-image-224" /></a>

สังเกตุได้ว่าเราสามารถรัน ASP.NET MVC ให้สามารถทำงานได้บน ​MAC แน่นอนบน ​Linux ก็ไม่น่าติดปัญหาต่อไปเราก็สามารถทำให้ ASP.NET ไปทำงานบน Cloud บน Linux แบบประหยัดเดิมทีที่ทำงานบน Linux น่าผิดหวังมากสำหรับผมน่าจะมาตั้งนานแล้ว เพราะ ผมจะได้ใช้ Linux Hosting เป็น Platform หลักที่ผมใช้เลย จบบบบบบบ

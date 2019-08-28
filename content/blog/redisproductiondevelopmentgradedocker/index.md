---
title: สร้าง Redis Production/Development grade ด้วย Docker แบบขำๆ
date: 2018-01-19T14:43:24
description:     พอดีวันก่อนได้มีเวลาไปทำ Redis ใช้งานบน Production เอามาเสียบแทน ASP.NET State Server เลยเอามาแปะให้ไปใช้กัน จริงๆ แล้ว Redis ถ้าใช้แบบ Development มันก็คงไม่ต้องไปทำอะไรมันมากนะ docker containner
---

<p style="text-align: left;">    พอดีวันก่อนได้มีเวลาไปทำ Redis ใช้งานบน Production เอามาเสียบแทน ASP.NET State Server เลยเอามาแปะให้ไปใช้กัน จริงๆ แล้ว Redis ถ้าใช้แบบ Development มันก็คงไม่ต้องไปทำอะไรมันมากนะ docker containner run จบ วันก่อนไปงาน Docker คุณประทาน เขาบอกว่าใครยังใช้ docker run เฉยๆนี่ Out ไอ้กระผมก็ยังใช้อยู่ด้วยซิเหอะๆ</p>
<img class="aligncenter size-full wp-image-504" src="http://www.greanapp.com/wp-content/uploads/2015/09/redis-300dpi.png" alt="" width="609" height="240" />
<p style="text-align: left;">    ย้อนกลับไปสมัยก่อนมี Docker นี่ทรมานมากนะเรียกว่าถึกเลยล่ะยิ่ง Dev บน Windows นี้ไม่ต้องพูดถึง เปิด หน้าต่าง Command Line เต็มไปหมดเพราะต้องรัน Service ที่เกี่ยวข้องพอมี Docker มันก็สะดวกดี เอาล่ะวันนี้ไม่ใช่ประเด็นการใช้งาน  Docker ตรงๆ ดังนั้นไปที่เรื่อง Redis ปกติ Redis มันใช้งานบน Docker ได้อยู่แล้วนะ ง่ายด้วย แต่มันไม่ใช่สำหรับพวก Perfectionist people  อย่างเรา 555 จริงๆ ก็ไม่ขนาดนั้นนะ แต่เป็นโรคจิตอย่างนึง ไม่ชอบ Warning Message  "ไม่อยากจะขัดใจตัวเอง ที่มันชอบเธอ ไม่ให้ชอบเธอ ก็คงเป็นไปไม่ได้" ไปเรื่อย.....  ดังนั้นถ้าจะขจัด Warning ไปให้หมดทำได้ยังไง ก็ไปอ่านบทความเก่าผมนะ.</p>
http://www.greanapp.com/?p=503

ส่วนบทความนี้มาต่อตรงนี้ นะ เริ่มเลย Git Clone ซิ เตรียม Repo ให้แล้ว <a href="https://github.com/tonmanna/Redis_Production">link อยู่นี่</a> ไม่อยากบอกเลยว่าแทบไม่ต้องทำอะไร เพราะเตรียมให้ใน Bash ล่ะ ส่วน Dockerfile ก็ตามนี้ ต้นแบบผมเอามาจาก Redis 4 นะซึงคือล่าสุดในตอนนี้ จุดที่สังเกตุคือ CMD iTopplusRedis.sh ซึ่งผมจะอธิบายอีกที จากนั้นก็สั่ง ./build.sh ได้เลย ใครสาย Windows ใช้ git bash ทำนะครับผมไม่ได้ทำ Batch ไฟล์ไว้

<img class="aligncenter size-full wp-image-988" src="http://www.greanapp.com/wp-content/uploads/2018/01/1.png" alt="" width="585" height="324" />

มาดูพระเอกของเราบ้าง ไฟล์ itopplusRedis.sh จริงๆ ไม่มีอะไรจุดสำคัญมันคือการปรับแต่งค่าต่างๆ  เช่น socket max connection ไปอ่านบล็อคแรกที่ผมโพสก่อนก็ได้นะครับถ้าไม่เข้าใจ  แล้วค่อยสั่ง redis ทำงาน โดยผมจะโยน config ไว้ที่ etc นะซึ่งต่อไปเราจะ map volume มาให้ตรงตอนรัน

<img class="aligncenter size-full wp-image-989" src="http://www.greanapp.com/wp-content/uploads/2018/01/2.png" alt="" width="560" height="203" />

ขั้นต่อไปไม่มีอะไรมากครับก็คือ ./run.sh โดยส่วนที่ต้องเพิ่มมาคือ --privileged เพื่อให้เราสามารถปรับค่าบางอย่างบน kernel หรือพวก device และ configuration หลักบนเครื่อง ถ้าเราไม่เปิดไว้ตัว container นี้ มันจะไม่สามารถตั้งค่าเรานั้นได้ครับ ส่วน Vollume เราก็ได้ mapping เข้ากับ configuration ไว้ อันนี้ผมยัง mapping ไว้นะ จะแก้ใช้ใน container ก็ได้เพราะมันมีไฟล์อยู่ path /etc/redis.conf อยู่แล้ว

<img class="aligncenter size-full wp-image-991" src="http://www.greanapp.com/wp-content/uploads/2018/01/3.png" alt="" width="650" height="187" />

    docker logs myredis ดูมันจะหน้าตาหล่อๆแบบนี้เลย ไม่มี "Warning Message" ใดๆ แต่นั่นก็อย่าสบายใจไปล่ะหมั่นมาดูหน้าตามมันบ้างว่ามันรับได้ตามที่ตั้งไว้บ้างหรือเปล่า อีกอย่างท่านี้ผมทดสอบแถว 1000-2000 req/s นะครับขำๆ สบายๆ เครื่องเดียวไม่มี CPU Peak/ Memory Leak ใดๆ ทั้งสิ้น

<img src="http://www.greanapp.com/wp-content/uploads/2018/01/4.png" alt="" width="1066" height="505" class="aligncenter size-full wp-image-1001" />

จบจ้า จริงๆ ไม่ได้เขียน Blog นานมากเพราะเนื้อหาหลังๆ มันเหมือนโน๊ตส่วนตัวมากกว่าบทความ เลยไม่ได้ Publish เรียกว่าแอบเขียนแล้วกัน ส่วนวันนี้พอดีต้องรอ Email จาก MS พี่แก Support ข้ามชั่วโมงเลย ดังนั้นมาเขียน Blog รอจนเขียนจบแล้วแต่ยังม่ได้รับเมล์เลย 555  Redis ยังทำอะไรได้อีกเยอะนะพักหลังนี่ ผมกำลังคิดยกไปทำงานแทน Database เลย.

&nbsp;

Git Hub : <a href="https://github.com/tonmanna/Redis_Production">https://github.com/tonmanna/Redis_Production</a>

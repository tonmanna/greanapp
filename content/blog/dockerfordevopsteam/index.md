---
title: Docker for DevOps Team. ใช้กับทีมพัฒนาได้ง่ายๆ เส้นทางเดินนี้ โรยด้วย CommandLine LoL
date: 2016-07-26T18:05:09
description: Docker for DevOps บทความนี้ เน้นการใช้งานในทีม DevOps แบบแชร์ Deamon และทำงานบน Ubuntu ไม่ได้ผ่าน Boot2Docker นะครับ ผมขอข้ามขั้นตอนการติดตั้งไปนะครับ ถ้าใครเพิ่งหัด Docker ให้ข้ามไปนะครับ วิธีติดตั้ง
---

<img src="http://www.greanapp.com/wp-content/uploads/2016/04/docker.png" alt="docker" width="1650" height="559" class="alignnone size-full wp-image-630" />

<strong>Docker for DevOps</strong>

 บทความนี้ เน้นการใช้งานในทีม DevOps แบบแชร์ Deamon และทำงานบน Ubuntu ไม่ได้ผ่าน Boot2Docker นะครับ ผมขอข้ามขั้นตอนการติดตั้งไปนะครับ ถ้าใครเพิ่งหัด Docker ให้ข้ามไปนะครับ วิธีติดตั้งให้ไปอ่านที่นี้เลยนะครับ  <a href="https://docs.docker.com/engine/installation/linux/ubuntulinux/" target="_blank">Docker Installation</a> ก็คือเตรียม Ubuntu เป็น Container หลักให้เรียบร้อย
จากนั้น

1. Docker deamon เราเตรียมให้เรียบร้อยก่อนนะครับ

Killall process ของ docker ก่อนนะครับ
 
<pre class="lang:default decode:true " >   sudo killall docker</pre> 

   เกือบลืมไปถ้าคุณ enable Ubuntu firewall ไว้ก็เปิด Port 2375 ด้วย
 
<pre class="lang:default decode:true " >    sudo ufw allow 2375/tcp</pre> 

   จากนั้นที่หน้าเครื่อง Ubuntu รันเป็น Deamon
 
<pre class="lang:default decode:true " >   sudo ./usr/bin/docker daemon -D --tls=false -H tcp://0.0.0.0:2375</pre> 

tls=false verify false คือไม่มีการตรวจสอบการเชื่อมต่อเข้ามายัง Docker Container ซึ่งจริงๆ อันตราย แต่ใช้ใน Local จะกลัวอะไรซินะ

2. กรณี เครื่อง Developer เป็น MAC / Windows ให้ลง Docker Toolbox
<a href="https://www.docker.com/products/docker-toolbox" target="_blank">Docker Toolbox</a> ลงเสร็จเปิด Docker Quickstart Terminal

<img src="http://www.greanapp.com/wp-content/uploads/2016/04/1.png" alt="1" width="659" height="334" class="alignnone size-full wp-image-622" />

3. ที่ Docker Terminal ก็ทดสอบเชื่อมต่อ เข้าไปยัง Docker container และใช้ image hello-world มาทดสอบได้
xxx.xxx.xxx.xxx คือ IP ขา LAN ของเครื่อง Ubuntu ที่เรา Run Ubuntu Deamon ไว้นะครับ
 
<pre class="lang:default decode:true " >docker -H tcp://xxx.xxx.xxx.xxx:2375 pull hello-world
docker -H tcp://xxx.xxx.xxx.xxx:2375 run hello-world
</pre> 

<img src="http://www.greanapp.com/wp-content/uploads/2016/04/2.png" alt="2" width="787" height="459" class="alignnone size-full wp-image-639" />

ถ้ารันได้ ก็ Enjoy ครับ ตอนหน้าจะมาต่อเรื่องการ Map port กับ Volume ทั้ง แบบ Persistent กับ Container และแบบยิง Path มาที่ Developer Machine  
สวัสดีครับ


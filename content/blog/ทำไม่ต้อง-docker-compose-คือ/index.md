---
title: ทำไม่ต้อง Docker Compose คือ?
date: 2016-08-30T23:15:29
description:   ก่อนอื่นต้องแนะนำก่อนว่า Docker นั้น สาม
---

<img src="http://www.greanapp.com/wp-content/uploads/2016/08/Compose.png" alt="Compose" width="500" height="689" class="aligncenter size-full wp-image-789" />
  ก่อนอื่นต้องแนะนำก่อนว่า Docker นั้น สามารถใช้คำสั่ง docker run กับ docker build ได้ดีอยู่แล้ว ทำไมเราต้องใช้ Docker Compose คำตอบคงสั้นๆ เพราะมันสามารถรันหลาย Container ให้ทำงานพร้อมกันด้วยคำสั่งเดียว และง่ายกว่ามานั่งเขียน Bash(Batch) Script(File) นั่นเอง

   ทำไมต้องมี Docker Compose มันเกิดจากความต้องการ ในการนำคำสั่งต่างๆ ของ Docker มาทำงาน พร้อมๆกันโดยมาเขียนในรูปแบบ yaml(yml) หรือที่อาจจะเรียกว่า Configuration File ที่อ่านง่ายกว่าที่จะเขียน bash script ยาวๆ และดูแลได้ยากกว่า

   ข้อดีของ Docker Compose นั่นก็คือ เราสามารถ Start / Stop / Restart / Log / Build  Docker Container ได้โดยใช้คำสั่งบรรทัดเดียว และทำได้หลาย Container พร้อมๆกัน อาจถูกรวมมองเป็น Service ได้เลยแต่ไม่ใช่ Docker Service ใน Swarm นะครับ เดี้ยวจะจำสับสน คือถ้าคุณจะใช้ Docker ในการพัฒนา Software แบบ DevOps แล้วมันเป็นเครื่องมือที่สำคัญมากๆ เพราะคุณเอาข้อดีของ Docker มาทำให้มันสามารถทำงานได้เพียงเขียนคำสั่งไม่กี่คำสั่ง สมมุติว่าบน Production คุณมีหลาย Service เช่นมี Nginx, Redis , Mysql , MongoDB , ElasticSearch ในคราวเดียวกัน ถ้าคุณใช้เพียง Docker คุณก็คงนึก ถึงคำสั่ง docker run -d -v xxx:xxx -p xxx:xxx --name xxxx xxxx หลายบรรทัดแน่ๆ โดยเวลาจะ Restart เวลาจะ Build ใหม่ เราต้องทำอะไรอีกเยอะเยะ แค่คิดก็เมื่ยมือแล้วใช่ไหมครับ แต่บางคนอาจบอกว่าใช้ Bash Script ก็แก้ปัญหาได้แล้ว แต่จริงๆแล้วเอาเข้าจริง Bash นี้ ดีจริงครับแต่ว่าเวลาแก้นี่ก็หลายที่อยู่เหมือนกัน

   ดังนั้นจึงเป็นที่มาของ Docker Compose และ Logo ที่เป็นรูป Octopus ที่มีหลายมือ หรือ หนวดกันแน่ เอาเป็นว่ามันช่วยสั่ง Container ให้ทำงานพร้อมๆกัน ตามรูปเจ้าปลาหมึกยักนั่นแหละครับที่หยิบ Container ขึ้นมา

หน้าตาของ Docker Compose file (docker-compose.yml คือ Default File ที่ Docker Compose จะเรียกใช้ตอนเรียกคำสั่ง docker-compose . ถูกเรียกใช้งาน ปัจุบันมันอยู่ที่ Version 2 นะครับคำสั่งของ Docker-compose ไม่ใช่รุ่นของ Docker Compose นะครับ) 

<pre class="lang:default decode:true " >
version: '2'
services:
  web:
    build: .
    ports:
      - "5000:5000"
      - "6000:6000"
    volumes:
      - .:/code
      - $PWD:/code2
    links:
      - redis
    networks:
      - website-network
  redis:
    image: redis
    volumes:
      - redis-content:/data
    networks:
      - website-network
volumes:
  redis-data:
    driver: local
networks:
  website-network
    driver: bridge
</pre> 

<strong>เวลาจะรันก็อยู่ที่ terminal</strong>
 
<pre class="lang:default decode:true " >
$ docker-compose . up --build
</pre> 

เพื่อสั่งให้เริ่มทำงาน โดยจะ --build ก็คือการบังคับ Build Image ทุกครั้งที่สั่ง run โดย up ความหมายไกล้เคียงกับ run ครับ แน่นอนถ้าเป็น down ก็เหมือน stop ครับโดยถ้าจะ stop ก็รันคำสั่งเดียวแบบนี้ครับ

<pre class="lang:default decode:true " >
$ docker-compose . down
</pre> 

คุณยังสามารถ override ไฟล์ yml ได้อีกด้วยนะครับ เช่นคุณมีไฟล์ yml หลายไฟล์ ซึ่งอาจจะกำหนด configuration containner ซ้ำกัน หรือ ต่างกันก็ยังสามารถทำงานได้ดีครับ โดยถ้าคุณได้ลองศึกษาดูคุณจะพบว่ามันทำงานได้ดีมากและฉลาดมากอีกด้วย ตัวอย่างการใช้ Override ไฟล์อื่น สามารถทำได้สอง แบบ  แบบแรกแยกไฟล์ไปเลย แบบที่ 2 เขียนลงไปใน docker-compose file ได้เลย ตัวอย่างแรก

<pre class="lang:default decode:true " >
docker-compose -p pooltest -f docker-composeๅ.yml -f docker-compos/.yml down
docker-compose -p pooltest -f docker-composeๅ.yml -f docker-compos/.yml up --build
</pre> 

-p ใช้กำหนดชื่อ Project โดยถ้าคุณกำหนดชื่อ Project แล้วสามารถแยกให้ Container ที่ทำงานผ่าน Compose ให้มีเหมือนกันอีกหลายชุดได้ด้วยการแยก Project

<strong>Syntax ที่อยู่ใน Docker-compose File ถ้าคุณศึกษา Docker มาแล้วแถบไม่ต้องจำเลย</strong>

<strong>build</strong>: ก็ตรงตัวครับ Build Dockerfile นั่นหมายความว่า . ปัจจุบันที่คุณรันก็ต้องมี Dockerfile

<strong>image</strong>: ก็คือชื่อ image แหละครับ ตรงๆ เลย เหมือน docker run imagename

<strong>ports</strong>: -p ของ docker run -p เหมือนกันครับ แต่เขียนเรียงกันเป็น Array ใน docker-compose.yml มันดูง่ายกว่าอย่างเหลือเชื่อ

<strong>volumes</strong>: เช่นเดียวกับ -p โดย -v เป็นปัญหาหลักๆ ที่ทำให้คำสั่ง docker run ยาว มันมาแบบนี้ก็ง่ายซิ แต่จุดสังเกตุนะครับ ถ้าเราใช้ volume ใน service หมายความว่า เราจะเชื่อม volume นะครับ แต่ถ้าจะสร้าง volume มันต้องอยู่ระดับเดียวกับ service นะครับ ย้อนกลับไปดูไฟล์ด้านบนนะครับ โดย ชุดที่สร้าง volume ด้านล่างที่ชื่อ redis-data จะถูกนำไปใช้ใน redis container นะครับ

<strong>links </strong>: ใช้เชื่อมต่อ Container เข้าด้วยกัน เหมือน --links โดยมันจะสร้าง hostname ให้สามารถเรียกใช้ได้โดยตรงใน containner ที่ถูกเรียกใช้

<strong>networks</strong>: ใช้สร้าง network เหมือน --network เพื่อแยกการทำงานของ docker container ใช้คุ่กับ links โดยถ้าอยู่ภายใน service จะเป็นการเชื่อม network เข้าด้วยกันกับ container อื่นๆ แต่ถ้าอยู่ระดับเดียวกับ service จะเป็นการสร้าง networks นะครับ

<string>containner_name</strong>: ใช้กำหนดชื่อ containner

<string>environment</strong>: ใช้กำหนดค่า environment variable ส่งให้กับ containner

โดยบางค่าสามารถกำหนดเป็น Array ได้นะครับยกตัวอย่างเช่น volume,ports,links,networks,environment โดยจะใช้ dash คั่นแต่ละบรรทัด และบางอย่าง กำหนดได้ค่าเดียวเช่น images, command, entrypoint, containner_name ยังมีอีกหลายอย่างนะครับใน syntax ของ docker-compose เช่น loggin,dns,extends ลองไปหาอ่านกันได้ในเว็บของ docker_compose เลยครับ เยอะครับถ้าอยากรู้ทั้งหมด แต่ถ้ารู้ทั้งหมดที่บอกไปด้านบนนี่ก็น่าจะพอสร้าง production จาก compose ได้แล้วล่ะครับ

สรุปการใช้งาน docker-compose จำเป็นไหม ตอบเลยถ้า dependency คุณเยอะกว่า 2 component ใช้เถอะครับไม่ลำบากแถมเรายังใช้ docker เป็นแล้ว ใช้ compose เป็นเรียนรู้ไม่นานเลยสังเกตุง่ายๆ คำสั่งใน yml นั่นเหมือนกับตอนเรา docker run เลยซึ่งแทบจะไม่ต้องเรียนรู้อะไรใหม่เลย วันนี้คงพอแค่นี้ก่อนไว้วันหลังจะมาเล่าประสบการณ์ในการ deploy ลง production ให้ฟังอีกรอบนะครับ

อ้างอิง
<a href="https://docs.docker.com/compose">https://docs.docker.com/compose</a>

---
title: มาทดสอบการทำงาน Docker swarm ด้วย NodeJS
date: 2016-07-26T17:48:22
description: หลายคนคงเคยได้ยืนชือเจ้า Docker Swarm มากันบ้างแล้วแต่ วันนี้ผมจะมายกตัวอย่างการใช้งาน Docker Swarm กับ ExpressJS ของ NodeJS โดยที่การทำงานเราจะเน้นไปที่การทดสอบการทำ Loadbalance ของ Docker Swarm โดย 
---

<img class="alignnone size-full wp-image-739" src="http://www.greanapp.com/wp-content/uploads/2016/07/SWARM.png" alt="SWARM" width="2725" height="2269" />

หลายคนคงเคยได้ยืนชือเจ้า Docker Swarm มากันบ้างแล้วแต่ วันนี้ผมจะมายกตัวอย่างการใช้งาน Docker Swarm กับ ExpressJS ของ NodeJS โดยที่การทำงานเราจะเน้นไปที่การทดสอบการทำ Loadbalance ของ Docker Swarm โดย Docker Swarm ถูก Build In มากับ Docker Version 1.12 โดยเราสามารถตรวจสอบ Docker Version ก่อนที่เราจะลงมือทำตามคำสั่งด้านล่างนี้ครับ

<img class="alignnone size-full wp-image-726" src="http://www.greanapp.com/wp-content/uploads/2016/07/Screen-Shot-2559-07-26-at-3.24.43-PM.png" alt="Screen Shot 2559-07-26 at 3.24.43 PM" width="1242" height="948" />

ถ้า Version ต่ำกว่านี้ก็ให้ทำการ Update นะครับ สำหรับ Windows นั้นตอนนี้มี Docker Version 1.12 เหมือนกันเพียงแต่ทำงานบน HyperV ซึ่งต้องใช้ Windows 10 ขึ้นไปนะครับ

** ถ้าคุณต้องการทำ Lab นี้ แบบหลาย Node โดยถ้ามีหลายเครื่อง ที่จะมา Join Swarm Node ให้เปิด Port เครื่อง Master
<pre class="lang:default decode:true ">Swarm : Port Require 2377 4789 7946
โดยถ้าเป็น Ubuntu : ufw allow 2377/tcp
ส่วน Windows : ไปที่ Section Windows Firewall</pre>

ที่เครื่อง Master ง่ายๆ ก่อน เริ่มต้นด้วยการ สร้าง Swarm ด้วยคำสั่ง Address 10.0.0.1 คือ IP ขา Lan ของ Docker Machine Master นะครับ
<pre class="lang:default decode:true">docker swarm init  --listen-addr 10.0.0.1:2377</pre>
แต่ถ้าคุณมีเครื่องเดียวไม่ต้อง Bind Address ง่ายๆ แค่ ตำสั่งด้านล่างครับ
<pre class="lang:default decode:true">docker swarm init</pre>
<img class="alignnone size-full wp-image-731" src="http://www.greanapp.com/wp-content/uploads/2016/07/Screen-Shot-2559-07-26-at-3.35.39-PM.png" alt="Screen Shot 2559-07-26 at 3.35.39 PM" width="2226" height="558" />

ถ้าคุณมี Docker หลายเครื่องในวง LAN เดียวกันเครื่องที่สองขึ้นไปสามารถ Join Node ได้ด้วยคำสั่ง
<strong>Optional :</strong>
docker swarm joint 10.0.0.4:2377

ที่เครื่อง Master ถ้าคุณมีหลายเครื่องให้ใช้คำสั่ง จะเห็น Node ที่มา Join แต่ถ้าไม่มีก็ตามรูปครับจะเห็นแค่ Node เดียว
docker node ls
<img class="alignnone size-full wp-image-733" src="http://www.greanapp.com/wp-content/uploads/2016/07/Screen-Shot-2559-07-26-at-3.37.49-PM.png" alt="Screen Shot 2559-07-26 at 3.37.49 PM" width="1980" height="158" />

แน่นอนครับว่าเครื่อง Master สำคัญ ในทาง Machine จริงๆ ตรงนี้ผมก็ยังไม่แน่ใจนะครับว่าเราจะป้องกัน single point of failure
ผมจะใช้ Image Node บน Docker Hub ในการทำ Lab นี้นะครับ บน Swam เราจะใช้ docker service แทน docker run นะครับ แต่ docker ps ก็ยังตงใช้เหมือนเดิม
จากนั้นทำการสร้าง Docker File เพราะเราจำเป็นต้องนำ Sourcecode เข้ามา Build Image ด้วย เพราะตอนทำงานเราไม่สามรถจะ Map Volume ตรงๆได้บน Docker Service
<pre class="lang:default decode:true ">FROM node:6-wheezy

MAINTAINER Worawut Boontan &lt;GreanApp&gt;
EXPOSE 3000

RUN echo "Asia/Bangkok" &gt; /etc/timezone
RUN echo "Asia/Bangkok" &gt; /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata
ENV INSTALL_PATH ./project
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH
ADD . .
RUN npm install
CMD ["npm","start"]
</pre>

ก่อนจะไปตรงนี้ คุณก็ใช้ express generator สร้างไฟล์ ด้วยการรัน express จากนั้นก็แก้ไฟล์ index.jade ให้แสดง Hostname ไว้เดี้ยวกลับมาแป๊ะ Code ให้ หรือไม่ก็ไปดูที่ os.hostname() ในคู่มือก็ได้นะครับไม่น่ายากเกินไป


จากนั้น Build Image และทำการ Create Service
<pre class="lang:default decode:true ">docker build -t nodetest .


# ก่อนอื่นก็องสร้าง Network ก่อนนะครับเพื่อจะได้รวมกลุ่ม Service ของเราเข้าด้วยกัน โดยโหมด Overlay จะใช้ในการทำ Multiple host / 
# Multiple Service ซึ้งจะต่างออกไปจาก Mode Bridge ซึ่งเป็น Default ถ้าเครื่องคุณรัน Service เดียวใช้ Bridge ก็ได้ครับแต่ถ้า Overlay 
# มันจะแยกออกจากัน
docker network create -d overlay network_private

#จากนั้นสร้าง Service ด้วยคำสั่งนี้
docker service create --name nodeapp -p 3000:3000 --network network_private --replicas 5 nodetest

#ตรวจสอบการทำงานของ Service นี้
docker service inspect nodeapp --pretty

#จะเห็นการทำงานแต่ล่ะ Node ซึ่งเรากำหนดไว้ 5 Node Replicas บน Machine Node เดียวกันอยู่
docker service tasks nodeapp

#การแก้ไข จำนวน Node
docker service update --replicas 0 nodeapp

#แสดง Node ที่ Join เข้ามา
docker node ls 

</pre>
และหลังจากนี้คุณยังคงใช้คำสั่ง docker ps , docker rm เพื่อจัดการ การทำงานของแต่ล่ะ Process Node ได้อย่างเดิม เรามาดูผลลัพธ์กันดีกว่าครับ
โดยเปิด Browser เข้าตามรูปเลยนะครับ
<img class="alignnone size-full wp-image-736" src="http://www.greanapp.com/wp-content/uploads/2016/07/Screen-Shot-2559-07-26-at-5.42.22-PM.png" alt="Screen Shot 2559-07-26 at 5.42.22 PM" width="716" height="504" />

ลอง Refresh ดูซึ่งจะได้ผลลัพธ์ต่างกันออกมาตามรูป แสดงว่า Swarm สามารถทำการ Load Balance ได้แล้วครับ

<img class="alignnone size-full wp-image-737" src="http://www.greanapp.com/wp-content/uploads/2016/07/Screen-Shot-2559-07-26-at-5.44.48-PM.png" alt="Screen Shot 2559-07-26 at 5.44.48 PM" width="804" height="592" />

<strong>สรุป</strong> ถึง Docker Swarm จะมีการทำให้ Docker สามารถ Scale และ Loadbalance service ได้ง่ายๆ แต่เราก็ต้องดูต่อไปครับเมื่อรุ่น 1.12 เป็น Version Release แล้วจะเป็นยังไงตอนที่เขียนบทความนี้ยังคง RC อยู่ และก็ยังไม่แน่ใจเรื่อง Production กับการที่มี Master เดียว เพราะเอาจริงๆ ผมเพิ่งมารู้จัก Swarm ก็ตอนที่เขาเอามาเข้า BuildIn กับ Docker ไว้ผมศึกษาเพิ่มเติมจะมาเขียนบทความ Docker Swarm Master Node ใหม่อีกรอบแล้วกันครับ

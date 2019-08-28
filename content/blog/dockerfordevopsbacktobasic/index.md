---
title: Docker for DevOps back to basic from someone images to own images จริงๆ น่าจะเขียนบทความนี้ก่อนเนอะ
date: 2016-07-11T20:11:23
description: จริงๆ ผมก็อาจเขียนบทความอื่นเร็วเกินไปโดยลืมเกริ่น บทความเบื้องต้น น้องในทีมที่ผมดูแลหลายๆ คนยังคง สับสนกับพื้นฐานของ Docker โดยวันนี้ เราจะมาเรียนคำสั่งพื้นฐานกันก่อนเพราะพื้นฐานสำคัญเสมอครับ เรามาเร
---

<img src="http://www.greanapp.com/wp-content/uploads/2016/04/docker.png" alt="docker" width="1650" height="559" class="alignnone size-full wp-image-630" />
จริงๆ ผมก็อาจเขียนบทความอื่นเร็วเกินไปโดยลืมเกริ่น บทความเบื้องต้น น้องในทีมที่ผมดูแลหลายๆ คนยังคง สับสนกับพื้นฐานของ Docker โดยวันนี้ เราจะมาเรียนคำสั่งพื้นฐานกันก่อนเพราะพื้นฐานสำคัญเสมอครับ เรามาเริ่มกันเลยดีกว่าครับ

 
<pre class="lang:default decode:true " >
*** ก่อนที่จะลงมือใช้ Docker ทักษะนึงที่คุณควรเข้าใจก่อนใช้งาน Docker แล้ว ผมแนะนำว่าควรจะใช้ git เป็น ก่อนที่จะใช้ Docker 
นะครับ เพราะอะไรผมถึงบอกอย่างนั้นเพราะว่า หากคุณทำงานบนเครื่องคุณอยู่ คงไม่สะดวกแน่ถ้าคุณจะมัวมานั่งทำการ FTP / SCP 
เข้าไปโยนไฟล์บน docker machine แล้วแก้ไขมันซึ่งมันก็คงจะลำบากไม่น้อย เพราะในบางครั้งเราก็อยากแก้ไฟล์บน docker machine
แล้วส่งไฟล์นั้นกลับมาที่เครื่อง developer เหมือนกัน เพราะถ้าคุณใช้ git เพื่อเก็บ files เหล่านี้ไม่ว่าจะเป็น Dockerfile/
Configuration File/ Source Code หรือ อื่นๆ เป็นส่วน ประกอบแล้ว สิ่งที่คุณต้องทำก็แค่ Git push/pull ซึ่งเป็นทางเลือกที่ดีมากๆ
ดังนั้นแนะนำว่าควรใช้ Git ให้เป็นก่อนจะมาลุย Docker ครับ แต่วันนี้ ยังไม่ต้องก็ได้นะครับ อ่านบทความจบ ทำตามได้ก็โอเคแล้วครับ</pre> 


วันนี้ผมจะใช้ Squid ซุึ่งเป็น Proxy ยอดนิยมมาเป็นตัวอย่าง ของบทความนี้ โดย ผมขอใช้ image จาก dockerhub ที่ชื่อว่า sameersbn/squid โดยเริ่มที่ผมจะ pull image เขามาก่อน ตามด้านล่างนี้เลย
<pre class="lang:default decode:true " >docker pull sameersbn/squid</pre> 
แล้วก็ Run image นี้ด้วยคำสั่ง

 
<pre class="lang:default decode:true " >docker run -d -p 3128:3128 --name squidlab sameersbn/squid

#-d เพื่อทำงานแบบ Deamon หรือ Service
#-p dockermachine_port:container_port เพื่อ Mapping Port กับตัว Docker machine ในตัวอย่างนี้ 3128 
#--name containername ตั้งชื่อ Container
</pre> 

จากนั้นตรวจสอบการทำงานที่ docker machine ว่ามีการ mapping port เรียบร้อยแล้วหรือไม่
 
<pre class="lang:default decode:true " >netstat -an | grep 3128

tcp6       0      0 :::3128                 :::*                    LISTEN

#ถ้าได้ผลลัพธ์แบบนี้แสดงว่า น่าจะทำงานได้ อาจจะทดสอบ ลองใช้งานเลยก็ได้นะครับขั้นตอนนี้โดยไปชี้ proxy 
#มาที่ ip ของ Docker machine แล้วระบุ Port เป็น 3128</pre> 

โดยจุดประสงค์ต่อไปคือเราต้องการ Configuration ของ Squid มาเก็บไว้กับเราเพื่อใช้ในการปรับแต่งค่าต่างๆ โดยจริงๆ เราอาจจะไปหาจาก Source Code ของ Squid เอง หรือ หาจาก Image ที่เราจะใช้นี่แหละ ถ้าเราต้องการจะหาจาก Image ที่เราทำเราต้อง copy ออกมาให้ได้ โดยเราจะต้องไปดูก่อนว่าไฟล์ Configuration เก็บไว้ที่ไหน ซึ่งถ้าสังเกตุจาก Dockerfile ของ image นี้ จะอยู่ที่ 
/etc/squid3/squid.conf
/sbin/entrypoint.sh

คำถามแน่นอนผมรู้ได้ไงก็ง่ายๆ ครับไป ดู squid default configuration path for ubuntu เลยก็ได้ว่าจริงๆ แล้วเก็บที่ไหน หรือ อาจจะดูจาก Dockerfile ของ Image ที่เราเอามาใช้งาน โดยให้สังเกตุจาก COPY xxxx xxxxx สองบรรทัด โดยอันแรก คือ squid.conf ส่วนอีกไฟล์คือ entrypoint ที่จะทำงานหลัง container ทำงาน

เรามาดู Dockerfile ของ Image นี้กัน ดูที่ <a href="https://hub.docker.com/r/sameersbn/squid/~/dockerfile/">https://hub.docker.com/r/sameersbn/squid/~/dockerfile/</a>
<pre class="lang:default decode:true " >FROM sameersbn/ubuntu:14.04.20160608
MAINTAINER sameer@damagehead.com

ENV SQUID_VERSION=3.3.8 \
    SQUID_CACHE_DIR=/var/spool/squid3 \
    SQUID_LOG_DIR=/var/log/squid3 \
    SQUID_USER=proxy

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 80F70E11F0F0D5F10CB20E62F5DA5F09C3173AA6 \
 &amp;&amp; echo "deb http://ppa.launchpad.net/brightbox/squid-ssl/ubuntu trusty main" &gt;&gt; /etc/apt/sources.list \
 &amp;&amp; apt-get update \
 &amp;&amp; DEBIAN_FRONTEND=noninteractive apt-get install -y squid3-ssl=${SQUID_VERSION}* \
 &amp;&amp; mv /etc/squid3/squid.conf /etc/squid3/squid.conf.dist \
 &amp;&amp; rm -rf /var/lib/apt/lists/*

COPY squid.conf /etc/squid3/squid.conf
COPY entrypoint.sh /sbin/entrypoint.sh
RUN chmod 755 /sbin/entrypoint.sh

EXPOSE 3128/tcp
VOLUME ["${SQUID_CACHE_DIR}"]
ENTRYPOINT ["/sbin/entrypoint.sh"]</pre> 

หลังจากนี้ เราจะเอา Configuration ของ เขามาเก็บไว้ที่เรา ง่ายสุด ก็ copy เลยครับ คำสั่งสำหรับ copy file มาจาก Containner ก็คือ docker cp จากนั้นทำการ copy file เหล่านี้ออกมา โดย
 
<pre class="lang:default decode:true " >docker cp squidlab:/etc/squid3/squid.conf .
docker cp squidlab:/sbin/entrypoint.sh .
#copy ไฟล์มาไว้ที่ current directory</pre> 

ซึ่งหลังจากทำเสร็จเราจะได้ไฟล์ที่จำเป็นสำหรับ Image ของเราแล้ว ก็สร้าง Dockerfile ด้วย Notepad หรือ Editor ที่เราถนัดของเราเองโดยเอา Template จาก Dockerfile ด้านบนได้เลยครับ (ไว้วันหลังจะมาอธิบายทีละบรรทัดให้อ่านกันอีกที) โดยโครงสร้าง Folder ที่เราควรมีก็คือ หลังจากสร้างไฟล์ Dockerfile ครวจเป็นดังนี้ โดยสองไฟล์ด้านล่างมาจาก docker cp ที่ทำไปก่อนหน้านี้
 
<pre class="lang:default decode:true " > - Dockerfile # Dockerfile for build image
 - squid.conf # squid configuration
 - entrypoint.sh # entry point for start daemon service
</pre> 


ก่อนที่เราจะไปต่อ ถ้าเราจะทำ Image เอง ผมแนะนำให้ลบ Image ของ Squid และ Container ที่ run squid ที่เราได้ใช้งานเมื่อซักครู่ ออกไปก่อนครับแล้วค่อยมา run ใหม่ เมื่อเราสร้าง Image ของเราเองแล้วอีกรอบนึง โดยใช้คำสั่ง 

 
<pre class="lang:default decode:true " >docker rmi -f sameersbn/squid
docker rm -f squidlab</pre> 



หลังจากนี้ก็เริ่มขั้นตอนสร้าง Image ด้วยตนเองเลยครับ โดยก่อนจะสร้าง อาจจะปรับแต่ง Configuration ก่อนแล้วค่อย build หรือจะทำ Volume เอาก็ได้
 
<pre class="lang:default decode:true " >docker build -t my/squid .
#build image my/squid
docker run -d -p 3128:3128 --name squidcontainer my/squid
</pre> 

เพียงเท่านี้ คุณก็สามารถสร้าง Docker Image ได้ด้วนตนเองเรียบร้อยแล้ว
ทดสอบโดยใช้ Chrome ทำตามรูปเลยครับ ไปที่ chrome://settings/

<img src="http://www.greanapp.com/wp-content/uploads/2016/07/0.png" alt="0" width="539" height="129" class="alignnone size-full wp-image-712" />
กดปุ่ม Show Advance Setting

<img src="http://www.greanapp.com/wp-content/uploads/2016/07/1.png" alt="1" width="665" height="111" class="alignnone size-full wp-image-713" />
หา Networking Section แล้วกดปุ่มตั้งค่า Proxy

<img src="http://www.greanapp.com/wp-content/uploads/2016/07/2.png" alt="2" width="380" height="339" class="alignnone size-full wp-image-714" />
ใส่ IP ของ Docker Machine เราและ Port ให้ถูกต้องจากนั้นก็เปิด Browser ดูว่าทำงานได้ปกติหรือไม่ ถ้าเปิดได้ปกติ ก็เป็นอันเรียบร้อยครับ



<strong>Docker cheat sheet ถ้าใครจำคำสั่งเหล่านี้ได้หมด แล้วก็สบายใจได้เลยคุณเกือบจะใช้ Docker ได้แล้ว</strong>
 
<pre class="lang:default decode:true " >docker build -t xxxx . # build image from dockerfile 
docker pull image_name # pull image from dockerhub
docker images # list all images 
docker run -it –name xxxx containner_name -p access_port:container_port # run contaniner
docker exec -it container_name bash # access deamon console
docker logs -tf container_name # see current terminal console

docker rmi -f image_name # remove image
docker rm -f containner_name # remove container</pre> 

<strong>สรุป </strong>วันนี้คงเป็นพื้นฐานที่คุณสามารถลองไปประยุกต์ใช้กับ Image อื่นๆ ได้ง่ายๆ ลองหา Image เพิ่มเติมที่เป็น Offcial ที่อยู่บน dockerhub.com มาลง Mod / Change อะไรตามใจเรา ให้เหมาะกับงานเรา เพื่อทำงานได้สะดวกรวดเร็วกันดีกว่า ยุคนี้แม้แต่ Microsoft Windows ก็ยังจะมี Container ให้เราได้ใช้เร็วๆ นี้แน่นอนในชื่อ Server Core กับ Nano Server ซึ่งอาจจะรันบน Native Application เลยบน Windows 10 รุ่นถัดไป จริงๆวันนี้อยากสอนเรื่อง Volume และ Compose ต่อ แต่กลัวสับสนไว้ตอนหน้าแล้วกันนะครับ พบกันใหม่ในบทความต่อไปครับ คาดว่าจะสลับไปเขียน .NET Core มาลงบ้าง เผื่อเบื่อ Docker 

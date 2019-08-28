---
title: Docker for DevOps Team. ใช้กับทีมพัฒนาได้ง่ายๆ ตอนที่ 2
date: 2016-07-26T18:04:51
description: <strong>Docker for DevOps</strong>
หลังจาก ต
---

<img class="alignnone size-full wp-image-630" src="http://www.greanapp.com/wp-content/uploads/2016/04/docker.png" alt="docker" width="1650" height="559" />

<strong>Docker for DevOps</strong>
หลังจาก ตอนแรก ที่เราใช้ Docker ไปกับ แบบ Command Line โดยรุ่นที่ผมใช้ตอนนี้คือ Docker version 1.11.0, build 4dc5990 ซึ่งเราจะทำให้มันเป็น Startup config ตอน Boot เครื่องจะได้ไม่ต้องมาพิมพ์ที่หน้าเครื่อง โดยถ้าได้อ่าน Docker document เขาจะบอกว่าถ้าต้องการตั้งค่า Docker Options ให้ไปแก้ไขที่ไฟล์ /etc/default/docker โดยการ
<pre class="lang:default decode:true ">  sudo nano /etc/default/docker</pre>
<strong>จากนั้นทำการแก้ไขบรรทัด DOCKER_OPTS อย่าลืมเอา # ออกด้วยนะครับ</strong>
ค่า DNS อยู่ที่ Server ของตัวเองนะครับ อันนี้ ผมใช้ของ Google กับ ตัวที่อยู่ขา LAN ของผมเอง
<pre class="lang:default decode:true">DOCKER_OPTS="-D --tls=false --dns 8.8.8.8 --dns 8.8.4.4 --dns 192.158.1.86 -H tcp://0.0.0.0:2375  -H fd://"</pre>
-H คือ Host ส่วน fd: คือ System Socket ทำให้ทำงานบน local ได้ หรือถ้าต้องการแยก socket ก็สามารถใช้งาน
unix:///var/run/docker.sock ได้เช่นเดียวกัน
ปล. อย่าเพิ่ง restart service Docker นะครับเพราะว่า ในรุ่นนี้เหมือนไฟล์ CONFIG ไม่ถูกตั้งค่าให้ทำงาน DOCKER_OPTS ให้ไปแก้ไขไฟล์ที่

/lib/systemd/system/docker.service แก้ไข ตามด้านล่างเลยนะครับ
<pre class="lang:default decode:true ">[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network.target docker.socket
Requires=docker.socket

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
EnvironmentFile=/etc/default/docker
ExecStart=/usr/bin/docker daemon $DOCKER_OPTS
MountFlags=slave
LimitNOFILE=1048576
LimitNPROC=1048576
LimitCORE=infinity
TimeoutStartSec=0
# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes

[Install]
WantedBy=multi-user.target
</pre>
จากนั้นแนะนำว่า Reboot เครื่องเพื่อให้ docker reload config ใหม่ จริงๆ มีคำสั่งให้มันโหลดใหม่นะแต่ในเครื่องที่ผมทดลองไม่สามารถ อ่านค่ามาใหม่ได้ แต่ปรากฏว่า Reboot มาแล้วทำงานได้ปกติ

<strong>พอกลับมาลองทดสอบพิมพ์</strong>
<pre class="lang:default decode:true ">ps -aux |grep docker
# น่าจะได้ผลลัพธ์
root      1873  0.1  1.0 586188 42832 ?        Ssl  15:05   0:01 /usr/bin/docker daemon -D --tls=false --dns 8.8.8.8 --dns 8.8.4.4 --dns 192.158.1.86 -H tcp://0.0.0.0:2375 -H fd:// 
</pre>
ก็ถ้าเห็น Process Docker daemon สามารถทำงานได้ตรงกับ Option ที่เราตั้งค่าไว้ก็แสดงว่าถูกต้องแล้ว สามารถใช้ docker command connect มาจากเครื่อง Developer เข้ามาเพื่อใช้งานได้ทันที พบกันใหม่ตอนที่ 3 เรื่อง Data Persistent นะครับ

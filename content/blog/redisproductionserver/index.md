---
title: ตั้งค่า Redis สำหรับ Production Server
date: 2015-09-16T23:45:42
description:  หลายคนรู้จัก Redis บางคนไม่รู้จัก จริงๆ Redis ก็เปรียบเสมือน Database ประเภทหนึ่ง แต่เรามักเอามาใช้ในงาน เป็น Cache ซะส่วนใหญ่แต่จริงๆ นั้นถ้าเอามาใช้เป็น DB ก็ไม่ได้แปลกอะไรนะครับเพราะมันทำงานได้ดีเ
---

<a href="http://www.greanapp.com/wp-content/uploads/2015/09/redis-300dpi.png"><img src="http://www.greanapp.com/wp-content/uploads/2015/09/redis-300dpi.png" alt="redis-300dpi" width="609" height="240" class="alignnone size-full wp-image-504" /></a> 
หลายคนรู้จัก Redis บางคนไม่รู้จัก จริงๆ Redis ก็เปรียบเสมือน Database ประเภทหนึ่ง แต่เรามักเอามาใช้ในงาน เป็น Cache ซะส่วนใหญ่แต่จริงๆ นั้นถ้าเอามาใช้เป็น DB ก็ไม่ได้แปลกอะไรนะครับเพราะมันทำงานได้ดีเลยล่ะ บทความนี้ไม่ได้แนะนำการใช้ Redis แต่เป็นการเอา Redis มาใช้กับ Production นะครับ configuration ที่เป็น Default ที่มากับ Redis นั้นผมไม่ได้กล่าวถึงนะครับเอาเป็นว่าเริ่มกันแบบง่ายๆ เลย นะครับ ปล. บทความนี้ เน้น Redis ทำงานบน Memory นะครับ ไม่ใช้ Dump Physical นะครับเน้นเร็วแต่ถ้า Restart Service ข้อมูลหายนะครับเพราะไม่ได้ Dump DB ลง Disk อันดับแรก ไปหาไฟล์ configuration ให้เจอครับ เหอะๆ ซึ่งปกติอยู่ใน /etc/redis/xxxxxxx ครับ ถ้าไม่รู้ให้ ไปแกะหาแถว /etc/init.d/redisxxxx ครับ
ของผมนี่ไฟล์ /etc/redis/6379.conf อยู่ path นี้เลย

 1. TCP backlog = 511 
  Parameter นี้คือ Socket สูงสุดที่สามารถเชื่อมต่อมายัง Redis ได้ ซึ่งปริมาณนี้บน Production ไม่น่าจะพอเพียงให้ปรับตามใจชอบให้เหมาะกับ Sizing ของ Server คุณเองขนาดที่ผมแนะนำคือ 2500 เหมาะสำหรับ 1000-3000 Concurrent User แต่ค่านี้นั้นจะอิงกับ somaxconn ของ Linux ที่ไฟล์  /proc/sys/net/core/somaxconn แต่เราไม่สามารถไปแก้ไขไฟลนี้ตรงๆ ได้เพราะมันไม่ใช่ physical file ต้องใช้คำสั่ง sysctl โดยทำตามนี้ครับ 
<pre class="lang:default decode:true " >sudo sysctl -w net.core.somaxconn=2500</pre> 

2. Disable dump file / maxmemory / 
   2.1 Disable DB File เพื่อความเร็วในการอ่านเขียนข้อมูลเพราะเราจะไม่ใช้ Disk เป็นตัวเก็บ key/value ของเราโดย ทำการ remark สามบรรทัดด้านล่างนี้ 
<pre class="lang:default decode:true " >   #save 900 1
   #save 300 10
   #save 60 10000
</pre> 

   2.2 maxmemory xx(g) ในส่วนนี้ เราต้องหาขนาดที่เหมาะสมกับ Server เราเช่น เรามี Ram เหลือ จาก Service ปกติเราที่ 10g ก็ให้ใช้ 9g เหลือไว้ให้ตัว redis มันทำงานนิดหน่อยก็พอหรือจะลดกว่านี้ก็ได้ครับ
 
<pre class="lang:default decode:true " >maxmemory 9g</pre> 

   2.3 Policy ในการการ clear key เมือ Ram เต็ม ผมมักแนะนำให้ใช้ volatile-lru ครับตามคุำอธิบายเลย แต่เงื่อนไขว่าคุณต้องมี key ที่มีการ set ค่า expire เข้ามาเก็บนะครับ ตัวอย่างด้านล่างผมใช้ allkeys-lru เพราะข้อมูลของผมมันไม่สำคัญให้่มันสุ่ม clear ตาม algrithm LRU เลยง่ายดีไม่ต้องคิดมากครับ

<pre class="lang:default decode:true " >
# MAXMEMORY POLICY: how Redis will select what to remove when maxmemory
# is reached. You can select among five behaviors:
#
# volatile-lru -&gt; remove the key with an expire set using an LRU algorithm
# allkeys-lru -&gt; remove any key according to the LRU algorithm
# volatile-random -&gt; remove a random key with an expire set
# allkeys-random -&gt; remove a random key, any key
# volatile-ttl -&gt; remove the key with the nearest expire time (minor TTL)
# noeviction -&gt; don't expire at all, just return an error on write operations
#
# Note: with any of the above policies, Redis will return an error on write
#       operations, when there are no suitable keys for eviction.
#
#       At the date of writing these commands are: set setnx setex append
#       incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd
#       sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby
#       zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby
#       getset mset msetnx exec sort
#
# The default is:
#
maxmemory-policy allkeys-lru
</pre> 


3.  overcommit_memory is set to 0 ถ้าดูใน /var/login/redisxxxx ของคุณถ้าพบข้อความนี้ให้แก้ด่วนเพราะจะทำให้ Cash ได้ เมื่อมีการใช้งาน memory สูงๆ เช่นเกือบมเต็มปริมาณของ Server โดยไปเพิ่ม ข้อความนี้ 
vm.overcommit_memory = 1 ที่ไฟล์ /etc/sysctl.conf  
 
<pre class="lang:default decode:true " >#
# /etc/sysctl.conf - Configuration file for setting system variables
# See /etc/sysctl.d/ for additional system variables.
# See sysctl.conf (5) for information.
#

#kernel.domainname = example.com

# Uncomment the following to stop low-level messages on console
#kernel.printk = 3 4 1 3

##############################################################3
# Functions previously found in netbase
#

# Uncomment the next two lines to enable Spoof protection (reverse-path filter)
# Turn on Source Address Verification in all interfaces to
# prevent some spoofing attacks
#net.ipv4.conf.default.rp_filter=1
#net.ipv4.conf.all.rp_filter=1

# Uncomment the next line to enable TCP/IP SYN cookies
# See http://lwn.net/Articles/277146/
# Note: This may impact IPv6 TCP sessions too
#net.ipv4.tcp_syncookies=1

# Uncomment the next line to enable packet forwarding for IPv4
#net.ipv4.ip_forward=1

# Uncomment the next line to enable packet forwarding for IPv6
#  Enabling this option disables Stateless Address Autoconfiguration
#  based on Router Advertisements for this host
#net.ipv6.conf.all.forwarding=1


###################################################################
# Additional settings - these settings can improve the network
# security of the host and prevent against some network attacks
# including spoofing attacks and man in the middle attacks through
# redirection. Some network environments, however, require that these
# settings are disabled so review and enable them as needed.
#
# Do not accept ICMP redirects (prevent MITM attacks)
#net.ipv4.conf.all.accept_redirects = 0
#net.ipv6.conf.all.accept_redirects = 0
# _or_
# Accept ICMP redirects only for gateways listed in our default
# gateway list (enabled by default)
# net.ipv4.conf.all.secure_redirects = 1
#
# Do not send ICMP redirects (we are not a router)
#net.ipv4.conf.all.send_redirects = 0
#
# Do not accept IP source route packets (we are not a router)
#net.ipv4.conf.all.accept_source_route = 0
#net.ipv6.conf.all.accept_source_route = 0
#
# Log Martian Packets
#net.ipv4.conf.all.log_martians = 1
#
vm.overcommit_memory = 1</pre> 


จากนั้นให้คุณรันคำสั่งนี้เพื่อให้มันทำงานทันที

<pre class="lang:default decode:true " >sudo sysctl vm.overcommit_memory=1</pre> 

4. Transparent Huge Pages (THP) support enabled in your kernel. ถ้าดูใน /var/login/redisxxxx ของคุณถ้าพบข้อความนี้ให้แก้ด่วนเพราะจะทำให้การอ่านข้อมูลของคุณช้าลงได้เพราะ THP ของคุณรองรับไฟล์ขนาดใหญ่เราก็แค่ปิด THP โดยสร้าง Text File ด้วยคำสั่งนี้เพื่อไม่ให้ THP ทำงาน 
<pre class="lang:default decode:true " >
sudo bash
echo never &gt; /sys/kernel/mm/transparent_hugepage/enabled
</pre> 

5. THP ต่อเนื่อง เพื่อให้มันทำงานไปตลอดเมื่อมีการ Restart Computer ก็ให้ไปแทรกที่ ไฟล์ <strong>/etc/rc.local</strong>
<pre class="lang:default decode:true " >

#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.
echo never > /sys/kernel/mm/transparent_hugepage/enabled
exit 0
</pre> 

6. สุดท้ายถ้าคุณลบ logfile ของ redis จากนั้น Restart กลับมาดู log ของ redis ใหม่ซึ่งปกติจะอยู่ที่ /var/log/redis.logxxxxx จะต้องสวยงามแบบนี้ครับเป็นอันว่า Redis พร้อมสำหรับ Production แล้วครับ 
<pre class="lang:default decode:true " >
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.0.4 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 1516
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

1516:M 16 Sep 16:59:21.224 # Server started, Redis version 3.0.4
1516:M 16 Sep 16:59:21.224 * DB loaded from disk: 0.000 seconds
1516:M 16 Sep 16:59:21.224 * The server is now ready to accept connections on port 6379
</pre> 


ผลสรุป ไม่ว่าคุณจะ Config แบบไหนล้วนแล้วแต่ตามความต้องการของงานนั้นๆ อย่างที่ผมบอกไปว่านี่คือ Configuraion ของ Redis ที่ดีเร็ว แต่เหมาะสำหรับงานที่ไม่ได้มีความสำคัญเพราะว่าไม่ได้ใช้ Disk เก็บ Dump DB ดังนั้นสุดท้ายแล้วแต่ว่าคุณจะเลือกและปรับแต่งแบบไหน ให้เหมาะสมกับ Environment/Resource ที่คุณมีเจอกันใหม่บทความหน้าสวัสดีครับ





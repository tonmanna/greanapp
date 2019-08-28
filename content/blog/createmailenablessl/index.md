---
title: ขั้นตอนการสร้าง Create Certificate เพื่อใช้ใน MailEnable สำหรับใช้งาน SMTPS , IMAPS
date: 2017-06-12T17:22:05
description: เริ่มจากติดตั้ง OpenSSL ให้เรียบร้อย ที่สำคัญระวังเรื่องตำแหน่งไฟล์ openssl.cnf ดีๆ ในตัวอย่างนี้ เอาไปทำงานที่ Root \ Bin ของ Open SSL เลยไฟล์ openssl.cnf จึงต้องเป็น ..\share\openssl.cnf ตัวอย่างนี้
---

เริ่มจากติดตั้ง OpenSSL ให้เรียบร้อย ที่สำคัญระวังเรื่องตำแหน่งไฟล์ openssl.cnf ดีๆ ในตัวอย่างนี้ เอาไปทำงานที่ Root \ Bin ของ Open SSL เลยไฟล์ openssl.cnf จึงต้องเป็น ..\share\openssl.cnf ตัวอย่างนี้ทำใน Windows Server ดังนั้นถ้าบน Linux ต้องสลับ Path ไป 


<pre class="lang:default decode:true">mkdir keys
mkdir certs
openssl genrsa -des3 -out keys/ca.key 1024
openssl req -new -x509 -days 1001 -key .\keys\ca.key -out .\certs\ca.cer -config ..\share\openssl.cnf
openssl pkcs12 -export -out .\certs\ca.pfx -inkey .\keys\ca.key -in .\certs\ca.cer</pre>
&nbsp;

&nbsp;

จากนั้นพอได้ Certificate ครบถ้วนก็นำไปติดตั้งยัง Server ที่ต้องการ

โดย Certificate นั้นจำเป็นต้องอยู่ใน Personal (Certificate)

&nbsp;

1. From the Windows Start Menu, select Run &gt;mmc.exe

2. From within the MMC application select File &gt; Add/Remove Snap-In &gt; Standalone &gt; Add

3. Select "Certificates" from the list and select the Add button.

4. Select "Computer Account" account, select "Finish'

&nbsp;

&nbsp;

โดยใช้ ไฟล์ pfx ที่ได้จากขั้นตอนสุดท้ายเพราะจำเป็นต้องใช้ Certificate ที่มี private key แนบอยู่เพื่อใช้งาน


https://www.mailenable.com/kb/content/article.asp?ID=ME020479

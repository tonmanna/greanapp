---
title: Backup XenServer แบบประหยัดงบ พื้นที่ 8TB ราคาไม่เกิน 30,000 คุ้มมาก
date: 2014-02-06T20:50:57
description: นั่งทำ Backup Server ให้ Office บางครั้งทำงานพวกนี้ คนใช้งานไม่รู้สึก แต่มันสำคัญมากสำหรับองค์กร ตอนนี้ไม่ว่า Server ไหน Hardisk ไหนพัง ก็ย้อนหลังได้ เกือบหมดล่ะ จากเริ่มต้นที่เรามีแค่ 1 Server ทำได้ท
---

นั่งทำ Backup Server ให้ Office บางครั้งทำงานพวกนี้ คนใช้งานไม่รู้สึก แต่มันสำคัญมากสำหรับองค์กร<wbr /> ตอนนี้ไม่ว่า Server ไหน Hardisk ไหนพัง ก็ย้อนหลังได้ เกือบหมดล่ะ จากเริ่มต้นที่เรามีแค่ 1 Server ทำได้ทุกอย่างเมื่อตอนผมเริ่มเปิดบริษัทใหม่ๆ ตอนนี้ เรามี 7 Server แต่คนดูแลยังคนเดียวคือผมยั<wbr />งดูแลไหว นี่เฉพาะภายในองค์กรนะ ไม่รวม Webserver ของบริษัทซึ่ง รวมๆ แล้วก็เป็นสิบกว่าๆ Server ไหนจะ Cloud ที่เช่าไว้อีกสองสาม VM ดังนั้นต้องทำยังไงให้ดูแลไ<wbr />หว บางองค์กรไม่แน่ใจว่า Service เยอะขนาดนี้ดูคนเดียวไหวมั้<wbr />ย ระบบการสำรองแบบนี้ อาจไม่ดีเท่า Replication Redandant แต่ก็ ลงทุน ไม่มาก ลงทุนไปกับ Synology DS210j กับ 4tb สอง ตัว ได้มา 8TB ในราคาไม่เกิน 3 หมื่น บวกกับเปลี่ยนมาใช้ XenServer และ Backup ตัว Virtual Machine อีก ชื้อ Software Backup อีกราคาปี ปีล่ะ 3000 บาท คุ้มมากๆ  เพราะ ชาวบ้านของดีๆ ขายกัน 2000 US ต่อ Server ใครจะลองทำบ้างลอง โพสต์สอบถามได้

<img class="alignnone size-full wp-image-68" alt="er_photo_136825_50" src="http://www.greanapp.com/wp-content/uploads/2014/02/er_photo_136825_50.jpg" width="175" height="140" />

<strong>อุปกรณ์ที่ใช้</strong>

DS210J ผมซื้อมา ประมาณไม่เกิน 7000 สั่งกับ shop4thai ก็ได้นะครับ

HD 4TB x2     ประมาณ 7000x2 ซื้อเอารุ่นที่รองรับ NAS เช่น Western RED / Seagate รุ่น NAS

&nbsp;

Xackup v1.0.45.0 ราคารายปี 85 ASD ต่อปี

ไปซื้อได้ http://www.fungusware.com/products/xackup/

&nbsp;

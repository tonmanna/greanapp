---
title: iDRAC port ใช้งานง่ายเหมือนกันนะครับ
date: 2013-11-07T22:19:00
description: วันนี้ว่างๆ หลังจากนั่งทำ OpenStack กับ CloudStack หลังจากงมอยู่นาน มองไปข้างหลังเจ้า R620 ที่เพิ่งถอยมาวาง Server เหลือบตามมองไปยัง Port ด้านหลัง มี คำว่า iDRAC ปกติดถ้าจะทำอะไรแบบนี้ผมมักจะนึกถึง KV
---

วันนี้ว่างๆ หลังจากนั่งทำ OpenStack กับ CloudStack หลังจากงมอยู่นาน มองไปข้างหลังเจ้า R620 ที่เพิ่งถอยมาวาง Server เหลือบตามมองไปยัง Port ด้านหลัง มี คำว่า iDRAC ปกติดถ้าจะทำอะไรแบบนี้ผมมักจะนึกถึง KVM เสมอ แต่ก็รู้ว่าเจ้า Server มันมีอะไรแบบนี้อยู่แล้ว ก็เลยลองเปิดคุ๋มือลองหาดูว่ามันใช้งานยังไง จริงๆ ก็ง่ายมาก ประเภทว่าคู่มือไม่ต้อง สดๆ ได้เลย หลังจากเปิดเครื่องมา กด F2- เข้า System Setting จากนั้นไปที่ Menu iDrac Setting  กดเลื่อนลงไปตั้งค่า ตามใจชอบเลยครับ หลักๆ ก็ไปที่ User Management ตั้ง Password ก่อนแล้วกันครับ password ในรุ่นที่ผมใช้นี้ห้ามมีสัญลักษณ์พิเศษเช่น พวก #$ ! % อะไรพวกนี้ตั้งค่าเสร็จแล้วเปิดเครื่องเลยครับ โชคดีของ R620 ที่มี LED ด้านหน้า สามารถทราบ IP ของ iDrac ได้ทันที พอดีว่าใช้ผ่าน DHCP

[caption id="attachment_19" align="aligncenter" width="300"]<a href="http://www.greanapp.com/wp-content/uploads/2013/11/LCD_CMYK.jpg"><img class="size-medium wp-image-19" alt="R710" src="http://www.greanapp.com/wp-content/uploads/2013/11/LCD_CMYK-300x210.jpg" width="300" height="210" /></a> R720[/caption]

หลังจากนั้น เข้าผ่าน https://&lt;ipaddress&gt; ใส่ User Password เข้าเมนู Console จากนั้น กด Link Virtual Remote จะได้ ไฟล์ .jar มา แต่มันดันทะลึ่ง ตั้งนามสกุลมายาวมาก ให้ rename ให้เหลือแต่ .jar แล้ว Doubleclick โลด (ต้องมี JRE ด้วยนะครับ) เป็นอันเสร็จพิธี ง่ายมากๆ กับ Port iDRAC ไม่จำเป็นต้องง้อ KVM แพงๆ เลย อีกอย่างถ้า Server ของ Dell รุ่นใหญ่ มักแยก Port Ethernet จากตัวบอร์ดหลัก สำหรับ R520 R620 R720 ทั้งสามรุ่น โดยที่ผมทดสอบง่ายมากๆ และอีกอย่าง smooth อย่างไม่น่าเชื่อจริง!!!

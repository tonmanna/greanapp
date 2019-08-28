---
title: DKIM (DomainKeys) กับ Mail Enable รุ่น Pro ขึ้นไปมั้ง
date: 2016-08-02T03:03:36
description: ผมทดสอบกับ Windows 2012 R2 นะครับ ส่วนเรื่องราคาเจ้าตัว Mail Enable รุ่นที่ผมใช้ไม่มากไม่น้อย 699 US ผมว่ามันทำได้ตั้งแต่รุ่น Profressional นะครับ  ราคา 349 Us ใครที่ใช้ Mail Server บน Windows ยังไงผม
---

ผมทดสอบกับ Windows 2012 R2 นะครับ ส่วนเรื่องราคาเจ้าตัว Mail Enable รุ่นที่ผมใช้ไม่มากไม่น้อย 699 US ผมว่ามันทำได้ตั้งแต่รุ่น Profressional นะครับ  ราคา 349 Us ใครที่ใช้ Mail Server บน Windows ยังไงผมก็แนะนำว่า มันก็ไม่แพงมากนะครับเหมาะสมกับราคา

แต่ผมใช้รุ่น Enterprise นะครับ หลายคนคงจะเจอปัญหาส่งเมล์หาชาวบ้านแล้วชอบลง Junk บ้าง หรือไม่ก็ตกหล่นบ้าง วันนี้ผมจะเสนอวิธีการป้องกัน การถูกมองว่าเป็น คน Spam และก็ใช้ DKIM ในกันถูกคนอื่นมองว่าเราเป็น Spam DKIM นั้นผมแนะนำว่าต้องทำคู่กับ SPF Record นะครับ มันจะช่วยได้หลายอย่างเลย SPF จะช่วยยืนยันว่ามาจากเราจริง  ส่วน DKIM ตอนส่งมันจะมีการยืนยัน Selector กับ Key ว่าตรงกันมั้ย ช่วยป้องกันให้คนที่จะมาหลอกส่งเมล์เป็นเราลำบากครับ Free Email ส่วนมาก หันมา Support หมดแล้วด้วยครับ และที่สำคัญลดโอกาศการลง Junk Mail อันนี้สำคัญ

1. เปิด MailEnable Admin ขึ้นมา

2. ไปยัง Post Office ที่ต้องการ

3. ไปที่ Domain แล้วเลือก Domain ที่ปรากฏอยู่

4. กด Mouse ขวาแล้ว Properties

5. ไปที Tab DKIM(DomainKeys) จากนั้นกดปุ่ม Congigure.

<img class="alignnone size-medium wp-image-50" alt="ScreenShot019" src="http://www.greanapp.com/wp-content/uploads/2013/11/ScreenShot019-220x300.png" width="220" height="300" />

6. จะได้ดังรูปทำตามขั้นตอนนี้ครับ

<a href="http://www.greanapp.com/wp-content/uploads/2013/11/ScreenShot020.png"><img class="alignnone size-medium wp-image-51" alt="ScreenShot020" src="http://www.greanapp.com/wp-content/uploads/2013/11/ScreenShot020-159x300.png" width="159" height="300" /></a>

&nbsp;

6.1 Check Sign outgoint messages

6.2 กดปุ่ม New จะมีหน้าต่างโผล่มา จากนั้นตั้งชื่อ Selectors ควรตั้งชื่ออิงกับ โดเมน แต่ว่าต้องใส่คำอื่นลงไปด้วย เพื่อที่จะได้เข้ารหัสแบบยากๆ หน่อย

6.3 Key size ถ้าตาม Gmail เขาแนะนำให้ใช้ 1024

6.4 Copy ตัวหนังสือด้านล่างที่แสดง DNS TXT เพื่อใช้ในการสร้าง DKIM TXT

ถ้าเป็น bind ก็เพิ่มแบบนี้ ใน DNS Record File 2 บรรทัด

<address>_domainkey.greanapp.com. IN TXT "o=~; r=postmaster@greanapp.com"
[selectorname]._domainkey.greanapp.com. IN TXT "v=DKIM1; p=[key];"</address>จริงๆแล้วมันยาวกว่านี้นะตัดให้มันสั้นเฉยๆ

6.5 แล้วเดี้ยวไปทำ SPF ต่อ

greanapp.com. IN TXT "v=spf1 ip4:122.155.18.0/24 -all"

อันนี้ allow IP ใน a ที่กำหนด ซึ่งถ้ามีการทำ Round robin dns ผมก็ยังงงว่ามันจะตรวจยังไงเหอะๆ

greanapp.com. IN TXT "v=spf1 +a:mail.greanapp.com -all"

6.6  ถ้าลองส่งเข้า Gmail แล้วกดปุ่ม ดูรายลเอียด จะเห็นว่ามีคำว่าลงชื่อโดย ...... มาด้วย เป็นอันจบพิธี<a href="http://www.greanapp.com/wp-content/uploads/2013/11/Untitled.png"><img class="alignnone size-medium wp-image-56" alt="Untitled" src="http://www.greanapp.com/wp-content/uploads/2013/11/Untitled-300x170.png" width="300" height="170" /></a>

6.7 ถ้าส่งเมล์แล้วยังลง junk ของ gmail ให้อมขี้หมามาพ่นหน้าผมได้เลย 5555 สวัสดี จริงๆ ยังมีโอกาสลงนะครับ เพราะมันมีหลายเรื่อง ลองอ่านดูตาม Link ด่านล่างนะครับ

<a href="https://support.google.com/mail/answer/1366858?hl=th&amp;ctx=mail&amp;expand=5">https://support.google.com/mail/answer/1366858?hl=th&amp;ctx=mail&amp;expand=5</a>

&nbsp;

&nbsp;

ปล. บทความนี้เขียนเองนะ ห้ามทำซ้ำลองเลียนแบบด้วยนะ บังคับ 555

วรวุฒิ บุญตัน

iTopPlus.com

&nbsp;

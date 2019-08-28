---
title: AngularJS 1.2 ตัวเต็มออกแล้วนะครับ 7/11/2013
date: 2013-11-11T23:57:53
description: จริงๆ แล้วก็ออกมาซักพักล่ะสำหรับตัว Release  ล่าสุดในตอนนี้ สำหรับ AngularJS นี้

ปัญหาที่พบนะครับ หลังจาก 1.15 มาเป็
---

<a href="http://www.greanapp.com/wp-content/uploads/2013/11/copy-52735c80d4b98.png"><img class="size-medium wp-image-15 aligncenter" alt="copy-52735c80d4b98.png" src="http://www.greanapp.com/wp-content/uploads/2013/11/copy-52735c80d4b98-300x168.png" width="300" height="168" /></a>

จริงๆ แล้วก็ออกมาซักพักล่ะสำหรับตัว Release  ล่าสุดในตอนนี้ สำหรับ AngularJS นี้

ปัญหาที่พบนะครับ หลังจาก 1.15 มาเป็น 1.2

1. Filed _xxxx(ที่มี underscore นำหน้า)  ห้ามใช้อีกต่อไปเพราะเขาจะใช้เป็น private variable เอง ซึ่งมีปัญหากับผมมากๆ mongodb field มันดันเป็น _id นะซิ  (เฉพาะฝั่ง View นะครับ controller _xxxx ยังใช้ได้ครับ)

<a href="http://docs.angularjs.org/error/$parse:isecprv">http://docs.angularjs.org/error/$parse:isecprv</a> อันนี้ผมได้ไป post ถามทุกคนอาการเดียวกัน คือบังคับทำไมเนี่ย

2. Tag script ที่อยู่ใน ng-include ไม่สามารถใช้ได้ สามารถประยุกต์ได้โดยใช้ Directive ช่วยดูตัวอย่างได้ที่นี่ครับ เนื่องจากเขาจะ Define ลำบากนะว่า script ที่อยู่ในนี้จำทำงานเมื่อไหร่ ซึ่งน่าจะเป็นสาเหตุที่ script ไม่ถูก bind ให้ทำงานนะ(ความเห็นส่วนตัว)

<a href="http://plnkr.co/edit/ufCOShc2EaZSzjiOmfOD?p=preview">http://plnkr.co/edit/ufCOShc2EaZSzjiOmfOD?p=preview</a>

3. onclick ไม่ควรใช้อีกต่อไปถ้าด้านในคุณมี {{xxxx}} angular expression เพราะเขามีเหตุผลในการทำงานบางอย่างซึ่งไปดูได้ในเว็บครับ ละเอียดเกิน เหอะๆ ดังนั้นคุณต้องเลี่ยงไปใช้ ng-click แทนนะครับ

<a href="http://docs.angularjs.org/error/$compile:nodomevents">http://docs.angularjs.org/error/$compile:nodomevents</a>

&nbsp;

&nbsp;

PS: บางปัญหาอาจแก้ไขได้โดยใช้รุ่น snapshot นะครับ  <a href="http://code.angularjs.org/snapshot/">http://code.angularjs.org/snapshot/</a> รุ่นล่าสุดที่ build มาจาก github น่าจะ 1.2.1 แล้วนะครับตอนนี้ 11/11/2013

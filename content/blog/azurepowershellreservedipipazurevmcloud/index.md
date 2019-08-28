---
title: Azure Power Shell Reserved IP จอง IP ใช้ใน Azure VM Cloud
date: 2015-03-28T22:23:10
description: จากที่ทราบกันดีบนระบบคราวทั่วไปจะมีโอกาสที IP หลักเราจะเปลี่ยนได้ทุกเมื่อเช่น Resize / Reconfig เครื่องใหม่อาจทำให้ Public IP ของคุณเปลี่ยนแปลง นั่นอาจทำให้คุณลำบากมากเมื่อเกิดเหตุการเหล่านั้น เริ่มต้
---

จากที่ทราบกันดีบนระบบคราวทั่วไปจะมีโอกาสที IP หลักเราจะเปลี่ยนได้ทุกเมื่อเช่น Resize / Reconfig เครื่องใหม่อาจทำให้ Public IP ของคุณเปลี่ยนแปลง นั่นอาจทำให้คุณลำบากมากเมื่อเกิดเหตุการเหล่านั้น เริ่มต้นจริงๆแล้วถ้าใครใช้ Cloud ของ Microsoft แล้วนั้น จะสามารถใช้ Reserved IP ได้ฟรี ถึง 5 IP โดยคุณต้องใช้งานผ่าน PowerShell Command เท่านั้น ถ้าใครยัง Authenticate Azure Command ไม่ได้ให้กลับไปดูบทความก่อนหน้านี้ที่นี่นะครับ <a href="http://www.greanapp.com/?p=268" title="เริ่มการใช้งาน Azure PowerShell Command" target="_blank">เริ่มการใช้งาน Azure PowerShell Command</a>

ก่อนอื่นก็เข้า Azure PowerShell Command และ Authen Subscription ให้เรียบร้อย จากนั้นรันคำสั่งด้านล่างเพื่อเริ่มสร้าง ReservedIP
 
<pre class="lang:default decode:true " >New-AzureReservedIP –ReservedIPName “WhatEverIPName” –Label "ReservedLabel" –Location "Southeast Asia"</pre> 

จากนั้น ใช้คำสั่ง  
<pre class="lang:default decode:true " >Get-AzureReservedIP</pre> 

เพื่อทำการแสดงว่าตอนนี้มี ReservedIP อะไรอยู่บ้างและถูกใช้แล้วอันไหน แสดงขึ้นมาอย่างชัดเจน

xxx หากต้องการลบ ReservedIP ที่สร้าง ไปแล้ว ก็ระวังอย่าไปลบอันที่ใช้อยู่ ผมก็ไม่กล้าลองแต่ไม่น่าจะลบได้ แต่ก็ไม่ควรลองล่ะครับ
 
<pre class="lang:default decode:true " >Remove-AzureReservedIP -ReservedIPName "WhatEverIPName"</pre> 

ในบทต่อไปจะเป็นเรื่องการนำ Reserved ไปใช้ กับ VM ที่เราสร้างขึ้นมา

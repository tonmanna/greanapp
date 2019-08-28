---
title: ZombieJS ให้ทำงานบน Windows
date: 2014-06-19T02:55:07
description: ZombieJS กำลังเขียน Automation ให้ทำงานเปรียบเสมือนเป็น Browser ติดปัญหาตรง WindowsSdkDir หาไม่เจอแก้ Registry แล้วก็ไม่เจอแนะนำให้ลงWindows SDK 8.1 http#//msdn.microsoft.com/en-us/windows/bg162891.as
---

<em>ZombieJS กำลังเขียน Automation ให้ทำงานเปรียบเสมือนเป็น Browser 
ติดปัญหาตรง WindowsSdkDir หาไม่เจอแก้ Registry แล้วก็ไม่เจอแนะนำให้ลง
Windows SDK 8.1 
http://msdn.microsoft.com/en-us/windows/bg162891.aspx
จากน้น Run คำสั่ง
"SetEnv.cmd /x86 หรือ "SetEnv.cmd /x64 ตาม OS ที่คุณใช้


แล้วจากนั้นลอง
npm install zombie อีกรอบ ผ่านสบายๆ

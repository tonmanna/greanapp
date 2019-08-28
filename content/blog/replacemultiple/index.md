---
title: วิธีการ Replace Multiple ไฟล์หลายไฟล์พร้อมกัน
date: 2016-08-02T03:02:16
description: ตัวอย่างนี้จะหาคำว่าgrep -rl 'myservername' ./ | xargs sed -i 's/myservername/youservername/g'โดยใช้ Greap หาไฟล์ที่มี คำว่า myservername ประกอบ ใน curent pathxargs แก้ไขไฟล์ทั้งหมด จากคำว่า myservern
---

ตัวอย่างนี้จะหาคำว่า
grep -rl 'myservername' ./ | xargs sed -i 's/myservername/youservername/g'

โดยใช้ Greap หาไฟล์ที่มี คำว่า myservername ประกอบ ใน curent path
xargs แก้ไขไฟล์ทั้งหมด จากคำว่า myservername เป็น yourservername

เท่านี้ไฟล์ทั้งหมดก็จะแก้ไขเป็นคำที่เราต้องการ ง่ายๆแบบนี้ แต่อย่าลืมทดสอบก่อนล่ะ พลาดทีจุกได้เลยพี่น้อง

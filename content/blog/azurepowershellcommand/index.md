---
title: เริ่มการใช้งาน Azure PowerShell Command
date: 2016-08-02T03:04:49
description: ขั้นต้นแรก Get-AzurePublishSettingsFile เพื่อทำการ Get Subscription File Setting โดยหลังจาก Run คำสั่งนี้จะ Auto เปิดเว็บให้เรา Login เข้า Azure Subscription Download Page ทันทีหลังจากเรา Login นะครับ
---

ขั้นต้นแรก
 
<pre class="lang:default decode:true " >Get-AzurePublishSettingsFile</pre> 

เพื่อทำการ Get Subscription File Setting โดยหลังจาก Run คำสั่งนี้จะ Auto เปิดเว็บให้เรา Login เข้า Azure Subscription Download Page ทันทีหลังจากเรา Login นะครับ

จากนั้นทำการ Import Subscription File

<pre class="lang:default decode:true " >Import-AzurePublishSettingsFile C:\xxxxx.publish</pre> 

และเมื่อทำขั้นตอนเหล่านี้ครบแล้วก็สามารถทำขั้นตอนอื่นๆ ได้แล้วครับ


<strong>ตำสั่งที่น่าสนใจอื่นๆ</strong>
 
<pre class="lang:default decode:true " >Get-AzureVM </pre> 

ใช้ในการแสดง VM ทั้งหมดที่มีในระบบ

<strong>คำสั่งเกี่ยวกับการ Start-Stop VM</strong>
 
<pre class="lang:default decode:true " >
Restart-AzureVM -ServiceName $cloudSvcName -Name $vmname 

Stop-AzureVM -ServiceName $cloudSvcName -Name $vmname -StayProvisioned

–Force # บังคับปิด คล้าย Force Close  
-StayProvisioned # ทำให้ตอน Start กลับมา Public IP ไม่เปลี่ยนจะได้ไม่ต้องกังวลการเข้าไช้งานไม่ได้


Start-AzureVM -ServiceName $cloudSvcName -Name $vmname 

</pre> 








---
title: สร้าง Virtual Machine Azure(Windows) โดยสร้างและทำให้สามารถใช้ Reserved IP Address (PowerShell Azure)
date: 2015-03-28T23:39:06
description: ต่อจากสองตอนที่แล้วเรื่องการ Authen และการสร้าง Reserved เราก็มาสู่ขั้นตอนการสร้าง VM นะครับในตอนนี้จะเป็นการสร้าง VM ของ Windows 2012 R2 Datacenter เป็น Edition ที่ดีสุดในตอนนี้สำหรับ VM Windows 2012
---

ต่อจากสองตอนที่แล้วเรื่องการ Authen และการสร้าง Reserved เราก็มาสู่ขั้นตอนการสร้าง VM นะครับ
ในตอนนี้จะเป็นการสร้าง VM ของ Windows 2012 R2 Datacenter เป็น Edition ที่ดีสุดในตอนนี้สำหรับ VM Windows 2012

กำหนด Cloud Service Name
<pre class="lang:default decode:true ">$serviceName  = "[cloud service name]"</pre>
กำนหด User/Pass สำหรับ VM ใหม่นี้
<pre class="lang:default decode:true ">$username = "[user name]"
$password = "[password]"</pre>
กำหนด Location ของ VM
<pre class="lang:default decode:true ">$location = "Southeast Asia"</pre>
กำหนดชื่อของ ReservedIP โดยอ้างอิงจากบทความที่แล้ว ถ้าลืมว่าตั้งอะไรกลับไปดูหรือใช้คำสั่ง Get-AzureReservedIP เพื่อดูรายการ ReservedIP
<pre class="lang:default decode:true ">$reservedIP = "WhatEverIPName"</pre>
กำหนดรายละเอียดของ VM
<pre class="lang:default decode:true ">$vmName = "WebServerVM" 
$vmSize = "Small"
</pre>
ต่อไปเราก็ค้นหา Image Object จาก Template ที่มีให้ของ Microsoft โดยเอาชื่อไปค้นหา
<pre class="lang:default decode:true ">$imageFamily = "Windows Server 2012 R2 Datacenter"
$imageName = Get-AzureVMImage |
                 where { $_.ImageFamily -eq $imageFamily } |
                 sort PublishedDate -Descending |
                 select -ExpandProperty ImageName -First 1 
</pre>
กำนหนด VM Configuration ก่อนสร้างอีกรอบ
<pre class="lang:default decode:true ">$vm1 = New-AzureVMConfig -Name $vmName -InstanceSize $vmSize -ImageName $imageName |
        Add-AzureProvisioningConfig -Windows `
                                    -AdminUsername $username `
                                    -Password $password</pre>
ลงมือสร้าง VM หลังจาก Run คำสั่งด้านล่างเสร็จ เข้าไป ที่ Azure Portal เพื่อตรวจสอบได้เลยทันที่ครับ
<pre class="lang:default decode:true ">New-AzureVM -ServiceName $serviceName -Location $location `
            -VMs $vm1 `
            -ReservedIPName $reservedIP</pre>
เป็นอันเสร็จสิ้นครับ สามบทความพิเศษในการใช้งาน Azure PowerShell Command สำหรับสร้าง VM แบบจอง VM ถ้าใครสนใจ Azure Cloud ก็อย่าลืมฝึกฝน Skill ในการใช้ Power Shell ด้วยนะครับ อีกอย่างตอนนี้มีทางเลือก azure-cli มาสำหรับคนที่ใช้ Mac/Linux นะครับ ไว้ว่างๆ จะมาเขียนบทความให้อ่านกันแต่ผมว่าแค่ PowerShell นี้ผมก็อ่านไม่ไหวแล้วล่ะเยอะมากและ Help ที่ Include มาใน Command เรียกว่าเข้าขั้นว่าห่วยถ้าไม่ Google หานี่คลำยากกว่าใช้ Linux เยอะครับ หวังว่าบทความคงเป็นประโยชน์ไม่มากก็น้อยสำหรับคนที่เพิ่งหัดเล่น Cloud Azure นะครับ / จากในผมครับ GreanApp (วรวุฒิ บุญตัน)

Note :  ตัวอย่างกรณีสร้าง Virtual Network กับ Subnet ครับ
<pre class="lang:default decode:true ">$vNetName = "iTopPlusService"
$subNet = "Zone1"
$vm1 = New-AzureVMConfig -Name $vmName -InstanceSize $vmSize -ImageName $imageName |
	Set-AzureSubnet $subNet |
        Add-AzureProvisioningConfig -Windows `
                                    -AdminUsername $username `
                                    -Password $password 

New-AzureVM -ServiceName $serviceName -Location $location `
            -VMs $vm1 `
            -ReservedIPName $reservedIP `
            -VNetName $vNetName</pre>
&nbsp;

&nbsp;

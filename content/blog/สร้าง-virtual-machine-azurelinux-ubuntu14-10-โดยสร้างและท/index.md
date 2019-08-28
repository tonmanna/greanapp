---
title: สร้าง Virtual Machine Azure(Linux Ubuntu14.10) โดยสร้างและทำให้สามารถใช้ Reserved IP Address (PowerShell Azure)
date: 2016-08-02T03:05:33
description: สคริปด้านล่างนี้สำหรับ Ubuntu รุ่นล่าสุดตอนนี้นะครับคำสั่งไม่ต่างกับ Windows นัก ใครงง แต่ละบรรทัดไปดูบทความที่แล้วได้เลยนะครับ เพราะต่างกันแค่ตรง ProvisioningConfig แค่นะครับ
$serviceNamew = "clouds
---

สคริปด้านล่างนี้สำหรับ Ubuntu รุ่นล่าสุดตอนนี้นะครับ
คำสั่งไม่ต่างกับ Windows นัก ใครงง แต่ละบรรทัดไปดูบทความที่แล้วได้เลยนะครับ เพราะต่างกันแค่ตรง ProvisioningConfig แค่นะครับ

$serviceNamew = "cloudservicename"
$username = "superadmin"
$password = "myadmin100$"
$reservedIP = "ReservedIP"
$vmName = "GreanAppVM"
$vmSize = "Small"
$imageFamily = "Ubuntu Server 14.10"

$imageName = Get-AzureVMImage |
                 where { $_.ImageFamily -eq $imageFamily } |
                 sort PublishedDate -Descending |
                 select -ExpandProperty ImageName -First 1 

$vm1 = New-AzureVMConfig -Name $vmName -InstanceSize $vmSize -ImageName $imageName |
			Add-AzureProvisioningConfig -Linux -LinuxUser $username -Password $password

New-AzureVM -ServiceName $serviceName -Location $location -VMs $vm1 -ReservedIPName $reservedIP



---
title: Reset Password Azure ด้วย Power Shell ครับ
date: 2016-08-02T02:55:46
description: ทำการค้นหา VM จาก Cloud Service Name และชื่อ VM$CSName = ""$VMName = ""$vm = Get-AzureVM -ServiceName $CSName -Name $VMNameจากนั้นตั้งค่า $UserName = ""$Password = ""$PrivateConfig = '{"username"#"' +
---

ทำการค้นหา VM จาก Cloud Service Name และชื่อ VM

$CSName = "<cloud service name>"
$VMName = "<virtual machine name>"
$vm = Get-AzureVM -ServiceName $CSName -Name $VMName

จากนั้นตั้งค่า 

$UserName = "<current Linux account name>"
$Password = "<new password>"
$PrivateConfig = '{"username":"' + $UserName + '", "password": "' +  $Password + '"}'
$ExtensionName = "VMAccessForLinux"
$Publisher = "Microsoft.OSTCExtensions"
$Version =  "1.*"
Set-AzureVMExtension -ExtensionName $ExtensionName -VM $vm -Publisher $Publisher -Version $Version -PrivateConfiguration $PrivateConfig | Update-AzureVM

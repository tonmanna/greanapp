---
title: Minikube ติดตั้ง บน Windows 10
date: 2017-09-03T19:38:25
description: ห่างจาการเขียน Blog มาพักนึง เพราะอาจจะติดขี้เกียจไปนิด พักหลังกระแส Kubernetes มาแรงเลยเอาซักหน่อย การที่จะเริ่ม Dev และใช้ Stack ของ Kubernetes นั้นมีกลุ่มนักพัฒนา ได้สร้าง Project Minikube เพื่ออำน
---

ห่างจาการเขียน Blog มาพักนึง เพราะอาจจะติดขี้เกียจไปนิด พักหลังกระแส Kubernetes มาแรงเลยเอาซักหน่อย การที่จะเริ่ม Dev และใช้ Stack ของ Kubernetes นั้นมีกลุ่มนักพัฒนา ได้สร้าง Project Minikube เพื่ออำนวยความสะดวก
ในการพัฒนาบนเครื่องของ Developer ให้สามารถทำงาน Kubernetes Cluster ได้.

<strong>เริ่มเลยแล้วกันไม่เสียเวลา แล้วกันครับ</strong>


<blockquote>ปล. แนวทางการลง Minikube มีหลายแนวทางนะครับ ลองหาข้อมูลเพิ่มเติมดู แต่ถ้าเอาสะดวกสุด ก็คือโหลด Binary ไปวาง ที่ไหนก็ได้แล้วกำหนด Execuition Path
แต่ในบทความนี้ จะติดตั้ง Chocolatey ซึ่งก็ไม่ได้ลำบากอะไร</blockquote>



1. ติดตั้ง Chocolatey เข้า Cmd.exe -> Run as Administrator ด้วยนะ

<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_001111.png" alt="" width="374" height="353" class="aligncenter size-full wp-image-944" />
 
2. จากนั้นรันคำสั่งเพื่อ ติดตั้ง Chocolatey
<pre class="lang:default decode:true " > 
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" &amp;&amp; SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
 </pre> 

3. ลองพิมพ์คำสั่ง choco ดูว่าทำงานได้ปกติหรือไม่
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_001636.png" alt="" width="498" height="73" class="aligncenter size-full wp-image-948" />

4. จากนั้นทำการติดตั้ง Minikube โดยพิมพ์ choco install minikube และที่เห็น เราสามารถ Upgrade Minukube ได้ในภายหลังด้วย 
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_001749.png" alt="" width="760" height="207" class="aligncenter size-full wp-image-951" />

5. หลังจากติดตั้งเสร็จลองพิมพ์ minikube จะได้ผลลัพธ์ตามรูปเป็นอันเสร็จขั้นตอนติดตั้ง Minikube
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_002047.png" alt="" width="954" height="430" class="aligncenter size-full wp-image-952" />

6. จากนั้นถ้าเป็น FC Docker อยู่แล้วก็ข้ามไปได้เลยเพราะเราต้องติดตั้ง Hyper-V ครับ Prerequire ก็คือ ต้องไปเปิด Virtualization Support ใน BIOS ก่อนเปิด Hyper V นะครับ (ขั้นตอนนี้ต้อง Reboot)
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_002257.png" alt="" width="590" height="418" class="aligncenter size-full wp-image-953" />

7. ไป Create Virtual Switch ใน Hyper-V โดยเปิด Hyper-V Manager 
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_002604.png" alt="" width="946" height="504" class="aligncenter size-full wp-image-954" />
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_002636.png" alt="" width="455" height="227" class="aligncenter size-full wp-image-955" />
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_002702.png" alt="" width="460" height="405" class="aligncenter size-full wp-image-956" />

8. จากนั้นเราจะให้ Minikube สร้าง Kubernetes Claster ให้กับเราโดยใช้คำสั่งด้านล่างนี้ได้เลยครับ รอติดตั้งให้เสร็จ โดยเราสามารถระบุเลข Version ของ Kubernetes ได้ด้วย โดย Hyperv-virtual-switch  ต้องกำหนดชื่อให้ตรงกับตอนที่เราได้สร้างด้วยนะครับ
 
<pre class="lang:default decode:true " >

 minikube start --kubernetes-version="v1.7.4" --vm-driver="hyperv" --memory=1024 --hyperv-virtual-switch="Minikube" --v=7 --alsologtostderr

</pre> 

9. ทดลองรัน kubectl cluster-info ถ้าได้ผลตามรูปก็โอเค แต่ IP Address แตกต่างกันตาม
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_003246.png" alt="" width="669" height="86" class="aligncenter size-full wp-image-957" />

10. ลองเข้า Browser ไปยัง IP ที่ได้จาก kubectl cluster-info http://xxx.xxx.xxx.xxx:30000
<img src="http://www.greanapp.com/wp-content/uploads/2017/09/2017-09-03_003744.png" alt="" width="971" height="508" class="aligncenter size-full wp-image-958" />

เดี้ยวมาต่อ Path2 ลองเอา App ไปรันตอนนี้ขอจบแบบนี้ไปเลยแล้วกันครับจริงๆ ออกแนวจดไว้ทำตาม มากกว่านะกันลืม ต้องขออภ้ัยท่านอื่นด้วยครับที่เขียนสั้นไปหน่อยเดี้ยวว่างจะเขียนต่อให้จบครับ



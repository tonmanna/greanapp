---
title: Web App ด้วย Yoman Workflow !
date: 2013-11-08T17:35:51
description: โดยจะใช้ Yeoman มาจัดการการเขียน Webapplication ด้วย AngularJS โดยให้ Yoman เตรียม Workflow ให้เรา จริงๆแล้วถ้าจะมองว่า มันไม่ได้ช่วยอะไรมากมายมันก็จริงนะครัชช มองง่ายๆ มันก็คือการเอาส่วนประกอบที่สำคั
---

<h1><span style="font-size: 13px;">โดยจะใช้ Yeoman มาจัดการการเขียน Webapplication ด้วย AngularJS โดยให้ Yoman เตรียม Workflow ให้เรา จริงๆแล้วถ้าจะมองว่า มันไม่ได้ช่วยอะไรมากมายมันก็จริงนะครัชช มองง่ายๆ มันก็คือการเอาส่วนประกอบที่สำคัญอย่าง bower และ grunt มาวางไว้เพื่อทำงานโดยที่เราไม่ต้องเสียเวลาตั้งค่าใดๆ ทั้งสิ้น พร้อมกับ ตัว Generate ที่ทำงานรวมๆ กันด้วย Template ไฟล์ ที่เกี่ยวข้องทำเป็นคล้ายๆ พวก Template ของ Web Application Development นะครับ โดยส่วนประกอบที่จะสอนจะประกอบไปด้วย</span></h1>
<ul>
	<li>HTML5</li>
	<li>AngularJS</li>
	<li>Karma</li>
	<li>Sass</li>
	<li>Bootstrap</li>
	<li>Grunt</li>
	<li>Bower</li>
	<li>NodeJS</li>
</ul>
ดูเหมือนเยอะนะครับ แต่จริงๆ แล้วเราใช้เจ้า Yeoman จัดการได้ง่ายมากๆ ครับ.

มาเริ่มกันเลยแล้วกันนะครับ

1. ต้องมี NodeJS โหลดได้ที่ <a href="http://nodejs.org/" target="_blank">NodeJS</a>
2. ต้องมี Git โหลดได้ที่ <a href="http://git-scm.com/" target="_blank">Git-SCM</a> และควรจะมี GitHub ไว้ด้วยเผื่ออยากจะใช้
3. ต้องมี Ruby สำหรับ Windows ให้ลง <a href="http://rubyinstaller.org/" target="_blank">Ruby Installer</a>
4. ควรจะมี Compass ใช้งานคู่กับ Sass

ติดตั้งด้วยการพิมพ์ บน Command-Line

gem update --system
gem install compass
5. เริ่มติดตั้ง Yeoman
<div></div>
<div>
<div><a href="http://www.greanapp.com/wp-content/uploads/2013/11/yeoman-logo.png"><img class="size-medium wp-image-36 aligncenter" alt="yeoman-logo" src="http://www.greanapp.com/wp-content/uploads/2013/11/yeoman-logo-300x259.png" width="300" height="259" /></a></div>
<div>ใช้ ​Command-Line ทั้งหมด ในการติดตั้งและใช้งาน
<ul>
	<li>
<div>1. คำสั่งนี้เพื่อใช้ npm ติดตั้ง yeo แบบ Global</div>
<div>npm install yo -g</div>
<div>ขั้นตอนี้ถ้าใครรันไม่ได้ ให้ไปตรวจสอบการติดตั้ง Nodejs ว่าอนุญาติให้ทำ Execute Path หรือไม่</div></li>
	<li>
<div>2. คำสั่งนี้เพื่อใช้ npm ติดตั้ง generator-webapp แบบ Global</div>
<div>npm install -g generator-webapp</div>
<div>เพื่อติดตั้งตัวสร้าง Template สำหรับ WebApp แบบทั่วไป</div></li>
	<li>
<div>3. คำสั่งนี้เพื่อใช้ npm ติดตั้ง generator-webapp แบบ Global</div>
<div>npm install -g generator-angular</div>
<div>เพื่อติดตั้งตัวสร้าง Template สำหรับ AngularJS ซึ่งผมไปอ่านบทความ AngularJS ได้ที่หัวข้อด้านบน</div></li>
	<li>
<div>4. เสร็จเรียบร้อยสำหรับการติดต้ง Yeoman พร้อมตัว Generator ทั้งสองแบบ</div>
<div>คุณสามารถสร้าง Yo Project ได้แล้วในตอนนี้</div>
<div></div></li>
</ul>
</div>
</div>
<h2>ทดลองสร้าง Project WebApp และ AngularJs พร้อมด้วย Bootstrap และ Sass</h2>
โดยประกอบ พระเอกของเรื่องเข้ามาสามคน เอ้!!หรือจะเป็น หนึงคน หมูป่า นกอีกตัว นะครัชชช
<div><a href="http://www.greanapp.com/wp-content/uploads/2013/11/yeomanangularbower.png"><img class="size-medium wp-image-37 aligncenter" alt="yeomanangularbower" src="http://www.greanapp.com/wp-content/uploads/2013/11/yeomanangularbower-300x120.png" width="300" height="120" /></a></div>
<div>เริ่มที่ Web App ก่อนแล้วกัน ใช้ ​Command-Line ทั้งหมด ในการติดตั้งและใช้งานนะครัชช
<div>
<ul>
	<li>
<div>1. สร้าง โฟล์เดอร์สำหรับเก็บ Project</div>
<div>C:\&gt;mkdir project</div>
<div>สามารถใช้ windows explorer หรืิอคำสั่ง mkdir เพื่ิอสร้างได้ หลังจากสร้างแล้วให้ cd เข้าไปยัง Folder ที่สร้างให้เรียบร้อย</div></li>
	<li>
<div>2. สั่งสร้าง Webapp Project</div>
<div>C:\project\&gt;yo webapp</div>
<div><a href="http://www.greanapp.com/wp-content/uploads/2013/11/folderofapp.png"><img class="size-medium wp-image-33 aligncenter" alt="folderofapp" src="http://www.greanapp.com/wp-content/uploads/2013/11/folderofapp-300x121.png" width="300" height="121" /></a></div>
<div>Yeoman จะทำการ Generate สิ่งที่จำเป็นสำหรับ Webapp ให้ โดยขั้นตอนแรกจะมีสามอย่างให้เลือกสำหรับ Yeoman ในรุ่นที่ผมใช้ทดสอบ คือ Bootstrap for Sass อันนี้ผมแนะนำว่าควรลงนะครับแต่ตsอนนี้ยังเป็นรุ่น 2.3 เดี้ยวค่อยไป Up เป็น 3.0 ทีหลังได้ครับ ใครไม่รู้จักถือว่าคุณต้องไปอ่านเพิ่มแล้วนะครับเพราะมันจำเป็นมากสำหรับนักพัฒนาเว็บครับ อันถัดมา RequireJS ถ้าคุณชอบเขียน Javascript แล้วอยากให้มันนำกลับมาใช้ใหม่ได้ ทำงานข้ามไฟล์ได้ หรือตรวจการโหลดซ้ำถือว่าจำเป็นมากครับ ส่วน ตัวสุดท้าย Modernizr ใช้ตรวจสอบการทำงานของ Device ที่เราใช้ว่า Support Html5 Css3 อะไรบ้างประมาณนั้นครับ เลือกตามใจชอบกด Enter จะได้โครงสร้างไฟล์ทั้งหมดตามรูป &lt;App&gt; ใช้เก็บงานเราทั้งหมด &lt;test&gt; ใช้เขียน Test case จบครับ</div></li>
	<li>
<div>3. จากนั้นทำการทดสอบ Code ของเรารันคำสั่ง</div>
<div>c:\project\&gt;grunt server</div>
<div>คำสั่งนี้จะทำให้สร้าง Server สำหรับทำงาน ข้อดีของมันมีเยอะ แต่ที่ผมชอบมากคือ คุณลืมปุ่ม F5 Refresh ไปได้เลย เมื่อใดก็ตามที่คุณแก้ไขไฟล์อะไรก็ตามใน Folder App มันจะ Auto Refresh ครับ</div></li>
	<li>
<div>4. ผลลัพธ์หลังจากการสั่ง grunt server คือ</div>
<div><a href="http://www.greanapp.com/wp-content/uploads/2013/11/finwebapp.png"><img class="size-medium wp-image-32 aligncenter" alt="finwebapp" src="http://www.greanapp.com/wp-content/uploads/2013/11/finwebapp-300x180.png" width="300" height="180" /></a></div>
<div>ทั้ง Jquery,Bootstrap,Sass,Modernizr,RequireJS พร้อมใช้งานทั้งหมดครับ</div></li>
	<li>
<div>5. ทำ distribute ไว้สำหรับ Upload ขึ้น Webserver</div>
<div>c:\project\&gt;grunt</div>
<div>จะได้ folder dist เพิ่มขึ้นมาครับ โดย Grunt จะทำให้ทั้ง ทดสอบ js css ทั้ง Gzip Compile Sassb Karma etc....เหนื่อยๆๆ ยาวไปนิด จบแล้วนะครับ ลองศึกษาเรื่องอื่นเพิ่มเติมกันเองนะครับ เหอะๆ เช่น Test Case AngularJS</div></li>
</ul>
</div>
</div>
<h3>Enjoy coding! ว่างๆ จะกลับมาเขียนต่อนะครับ</h3>

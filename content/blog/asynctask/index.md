---
title: Async Task เอามาจากที่ไหนจำไม่ได้แล้ว
date: 2014-02-25T18:23:48
description: Async Featureใน Async นั้นมี keyword 2 ตัวที่เพิ่มเข้ามา คือ async (modifier) และ await (operator) โดย method ที่มีการใส่ async กำกับไว้ จะเรียกว่า async method ในการเขียนโปรแกรมแนว asynchronous นั้น 
---

<h3>Async Feature</h3>
ใน Async นั้นมี keyword 2 ตัวที่เพิ่มเข้ามา คือ <code>async </code>(modifier) และ <code>await </code>(operator) โดย method ที่มีการใส่ async กำกับไว้ จะเรียกว่า async method ในการเขียนโปรแกรมแนว asynchronous นั้น ช่วยทำให้การทำงานของโปรแกรมที่เราพัฒนาขึ้นมานั้นทำงานได้ราบลื่นขึ้น เช่น สมมติว่าเราเขียน Windows app ขึ้นมาตัวนึง แล้วต้องเรียกใช้ HttpWebRequest ถ้าเราไม่ได้เขียนแบบ async ไว้ เวลา HttpWebRequest ถูกเรียกใช้ app ของเราก็จะถูก block ให้รอจน HttpWebRequest ได้ response กลับมาเรียบร้อยแล้ว.. ซึ่งถ้าเราทำให้เป็น async method ซะ เราก็สามารถให้ app ของเราทำงานอื่น ๆ ไปด้วยได้ ในขณะที่รอ response จาก HttpWebRequest

<code>private void btnTest_Click(object sender, EventArgs e)
{
var request = WebRequest.Create(txtUrl.Text.Trim());
var content = new MemoryStream();
using (var response = request.GetResponse())
{
using (var responseStream = response.GetResponseStream())
{
responseStream.CopyTo(content);
}
}
txtResult.Text = content.Length.ToString();
}</code>

จากตัวอย่างข้างต้น ถ้าหากว่าเราพิมพ์ URL แล้วกดที่ปุ่ม Test เราจะไม่สามารถทำการแก้ไข URL ได้เลย จนกว่าจะได้ response กลับมาจนครบ (txtResult แสดงค่าในกล่องล่างสุด)

ก่อนหน้าที่จะมี async modifier มา เราจะใช้ <code>BeginGetResponse</code> method ในการส่ง async request แต่ขอบอกไว้ตรงนี้เลยว่า มันวุ่นวายมวาาาาาก กว่าจะเข้าใจ (ดูตัวอย่างการใช้งานได้ใน <a href="http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest.begingetresponse(v=vs.80).aspx" target="_blank">MSDN</a>)

แต่ตอนนี้ เรามี async modifier แล้ว ชีวิตเราจะง่ายขึ้นไปเป็นกองครับ ดูจาก code ด้านล่างนี้แล้วไปเทียบกับ code ด้านบน และ ใน MSDN ดูเองนะครับ

<code>private async void btnTest_Click(object sender, EventArgs e)
{
var request = WebRequest.Create(txtUrl.Text.Trim());
var context = new MemoryStream();
Task&lt;WebResponse&gt; responseTask = request.GetResponseAsync();
using (var response = await responseTask)
{
using (var responseStream = response.GetResponseStream())
{
Task copyTask = responseStream.CopyToAsync(content);

// await operator to suspends the execution of the method until the task is completed.
// in the meantime, the control is returned the UI thread.
await copyTask;
}
}
txtResult.Text = content.Length.ToString();</code>
}

<code>await</code> operator จะถูกกำกับอยู่หน้า <code>task </code>ที่จะถูก return กลับออกมา โดยมันจะไปจำศีล method นี้จนกว่า task จะทำงานเสร็จสมบูรณ์แล้ว แต่ในระหว่างที่มันจำศีลอยู่ thread ของส่วนที่เป็น UI จะถูกปล่อยกลับคืนมาในระบบ ทำให้ control ยังสามารถทำงานได้ (ไม่มีการ block เหมือน code ชุดข้างบน)

ทั้งนี้ทั้งนั้น ใช่ว่าทุกอย่างจะต้องปรับไปใช้ async ซะทั้งหมด เพราะการโปรแกรมแบบ async นั้นจะใช้ thread ใช้ memory .. ถ้ามี async มากเกินไป โอกาสที่ memory เต็มก็อาจจะเกิดขึ้นได้ แต่อย่างน้อย ใน Visual Studio 2012 นี้ ถ้าหากว่ามีการเขียน async method แล้วทำงานไม่ถูกต้อง ตัว IDE ก็ฉลาดพอที่จะเตือนเราได้ครับ ว่าเขียนไม่ถูกวิธี ไว้ถ้ามีโอกาสจะมาเล่าเรื่องนี้อีกทีภายหลัง

<strong>ขอโทษด้วยที่ไม่ได้ Credit ผู้เขียน</strong>

<strong>Search ใน google ก็ไม่เจอแล้ว </strong>

<strong>ขออภัยเจ้าของบทความอย่างสูงครับ</strong>

<strong> ถ้าเจ้าของมาเจอ เมล์มาแจ้งผมได้นะครับผมจะ credit ให้</strong>

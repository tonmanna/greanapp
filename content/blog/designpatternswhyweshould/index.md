---
title: ตอนแรกในเรื่อง Design Patterns Why we should..
date: 2014-09-09T19:55:26
description: ทำไมเราต้องมี Design Patterns ในวิชาเรียนเป็นคำถามง่ายๆ ที่ตอบง่ายครับให้เราทำงานง่ายขึ้น แต่บังเอิญว่ากว่าเราจะเข้าใจมันนี่เรียกว่าใช้ยากเลยล่ะ คำตอบจริงๆต้องอยู่ที่คุณแล้วล่ะว่าจะเจอโจทย์เมื่อไหร่ แ
---

ทำไมเราต้องมี Design Patterns ในวิชาเรียนเป็นคำถามง่ายๆ ที่ตอบง่ายครับให้เราทำงานง่ายขึ้น แต่บังเอิญว่ากว่าเราจะเข้าใจมันนี่เรียกว่าใช้ยากเลยล่ะ คำตอบจริงๆต้องอยู่ที่คุณแล้วล่ะว่าจะเจอโจทย์เมื่อไหร่ แล้วเมื่อไหร่ควรจะใช้ patern ไหนแต่กว่าจะเข้าใจสิ่งที่ชาวบ้านคิดไว้แล้วเอามาทำงานจริงนั้น ไม่ง่ายเลยเพราะเราไม่เคยเจอโจทย์แบบคนคิด ดังนั้นจะให้เข้าใจได้ทันทีนั้นเป็นเรื่องยากพอสมควร มีประโยคนึงในหนังสือที่ผมใช้อ้างอิงในการเขียนเรื่องนี้ก็คือ <strong>"Someone has already solved your problem"</strong> มันฟังดูดีมาก ว่ามันต้องมีใครซักคนแหละที่เคยแก้ปัญหาเดียวกับเรา ส่วนตัวผมถ้าเวลาผมมีปัญหาจะค้นหาจากเน็ตและมักจะเจอคำตอบจาก StackOverflow นะน่าจะเป็นเว็บที่ช่วยผมมาตลอดหลายปีที่เขียนโปรแกรม ก่อนหน้านี้ก็จะมีพวก Codeproject แต่เดี้ยวนี้ต้อง Stack Overflow นี่แหละช่วยได้เยอะ แน่นอนการใช้ Design Patterns คือการ Reused ของคนอื่นมาใช้ รวมทั้งเอาของเก่าของตัวเราเองด้วย เพราะวันที่เราปัญหาเดิมๆที่เราเคยเจอ จำได้ว่าต้องใช้ Pattern อะไรเราก็จะหยิบรูปแบบที่เราเคยทำมาใช้ โดยหลักแล้วถ้าคุณจะเข้าใจ Design Pattern นั่นก็จะสามารถเอา Pattern ของคนอื่นๆ ที่เคยติดปัญหาเหล่านั้นมาแล้วมาใช้งาน เราจึงจำเป็นต้องศีกษามันไว้บ้าง

<img src="http://www.greanapp.com/wp-content/uploads/2014/09/svg1.png">

 งั้นเรามาเริ่มกันที่พื้นฐานก่อนจะเจอปัญหากันก่อนตามการออกแบบ แบบ Object Oriented(OO) ตามการอธิบายของ UML Class Diagram ด้านบนตัวอย่างด้านบนไดอะแกรมอธิบาย Class DOG และการสืบทอดของสุนัข สองชนิด ร็อตไวเลอร์ กับ ชิสุ จะได้เป็น Code ตามด้านล่างจาก Class Diagram แรก 
<strong>1. Class DOG</strong>
<pre class="lang:c# decode:true " >public class dog
{
	public abstract void bark();
	public void walk(){}
}
</pre> 

<strong>2. Class Shisu</strong>
 
<pre class="lang:c# decode:true " >public class shisu : DOG
{
	public int lovelylevel;
	public override void bark() {}	
}</pre> 

<strong>3. Class Rottwiler</strong>
 
<pre class="lang:c# decode:true " >public class rottweiler : DOG
{
	public int angrylevel;
	public override void bark() {}
	public void bite() {}
}</pre> 

จุดสังเกตุนี่คือเราออกแบบ Requirement วันแรก ที่เราต้องการ DOG นั่นจำเป็นต้องเห่าได้ ทุกชนิด เราบังคับโดยใช้ abstract method ที่บังคับทุก Class ที่สืบทอดไปต้อง override method bark() โดยที่ Class DOG ออกแบบไว้สำหรับสืบทอดสำหรับ DOG สายพันธู์อื่นๆ จะได้ใช้ Calss นี้เป็น Class หลักในอนาคตถ้าเราต้องมีการสร้าง Class อื่นๆเพิ่มเติม

ปัญหาเกิด เมื่อออกแบบระบบไปซักแป๊บ Requirement มีมาเพิ่ม ตายห่า Class DOG อยากหอนได้ (howling) ทำไงล่ะทีนี้ เหอะๆ อย่าดูถูกสกิวตัวเราเองเราเทพ OO อยู่แล้วเราออกแบบเผื่อไว้อยู่แล้วที่ Class Dog ไม่ต้องห่วง เราก็เพิ่มตามรูปเลยคือ เราก็ไปเพิ่ม howling method ใน Class DOG ตามรูป

<img src="http://www.greanapp.com/wp-content/uploads/2014/09/svg2.png">

ด้วยความหวังว่าหมาทุกตัวจะหอนได้ตาม Class แม่ก็คือ Class DOG ซึ่งไม่น่ามีปัญหาอะไร แต่จริงๆ แล้ว กลับซ่อนปัญหาทีน่ากลัวเอาไว้ 
Requirement เพิ่มครับที่นี้มีหมาสายพันธุ์ใหม่เพิ่มขึ้นมา เรามีตุ๊กตาสุนัขแบบใส่ถ่าน โดยรวมแล้วมันก็เหมือน DOG ทั่วไป ทั้งเห่าเดินได้ แต่เจ้าของผู้ผลิตเขาไม่ได้ทำให้มันหอนและวิ่งไม่ได้ทำไงล่ะที่นี้

<img src="http://www.greanapp.com/wp-content/uploads/2014/09/svg3.png">

เท่านั้นยังไม่พอ บริษัทดันผลิต เจ้าหมา Version 2 รุ่นนี้เพิ่ม function howling ได้ แต่ด้วยรุ่นนี้ตัด Function เห่า ออกไปเวลล่ะ เราต้อง Overide ทิ้งไว้เหรอตามรูปด้านล่าง มันก็ต้องเขียน overide เปล่าลอยๆไว้? เราจะแก้ปัญหานี้ได้อย่างไร

<img src="http://www.greanapp.com/wp-content/uploads/2014/09/svg4.png" alt="svg4" width="717" height="343" class="alignnone size-full wp-image-192" />

เมื่อมองจากรุปการณ์นี้ inheritance class คงไม่ตอบโจทย์ หลังจากนั้นด้วยความเทพของเรา เราเรียน OO มาอย่ามาดูถูกเรา เราก็จะคิดถึง Interface ขึ้นมาเพื่อช่วยแก้ปัญหานี้ แน่นอนว่าถ้าแก้ด้วย Interface จะได้ Class Diagram ตามรูปด้านล่างที่ผมจะอธิบายให้ฟัง

<img src="http://www.greanapp.com/wp-content/uploads/2014/09/svg5.png" alt="svg5" width="767" height="403" class="alignnone size-full wp-image-196" />

คำถามคือ มั่วดีมั้ยครับ พี่น้อง Class Diagram ที่ตอบโจทย์ Reused ability ที่เราต้องการ คำตอบของคำถามนี้ก็คือ มันไม่ใช่วิธีที่ดีที่สุดครับ เราเลยต้องหาวิธีที่ชาวบ้านเขาเจอปัญหาแบบนี้แล้วเขาแก้ยังไงให้ ง่ายและ Reused ablity ไม่ยากจนเกินกว่ามนุษย์จะเข้าใจได้ นี่ก็เป็นจุุดเริ่มต้นก่อนที่เราจะเข้ามาต่อกันในตอนหน้าว่า Design Pattern มาแก้ปัญหาอะไรบ้าง


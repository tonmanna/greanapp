---
title: วิธีเปลี่ยนภาษาไทยด้วยตัวหนอน (Grave) Lubuntu 16.04
date: 2016-12-28T15:07:04
description: เนื่องด้วยความต้องการและมันเป็นปุ่มยอดฮิตเลยก็ว่าได้กับการสลับภาษาด้วยตัวหนอนหรือปุ่ม grave โดยเจ้า Lubuntu ก็ดันไม่มีเมนูที่เปลี่ยนภาษาง่าย ๆ มาเหมือน ubuntu ซะด้วย ซึ่งวิธีการที่เราทำให้มันใช้งานได้
---

เนื่องด้วยความต้องการและมันเป็นปุ่มยอดฮิตเลยก็ว่าได้กับการสลับภาษาด้วยตัวหนอนหรือปุ่ม grave โดยเจ้า Lubuntu ก็ดันไม่มีเมนูที่เปลี่ยนภาษาง่าย ๆ มาเหมือน ubuntu ซะด้วย ซึ่งวิธีการที่เราทำให้มันใช้งานได้ก็มีดังนี้ครับ

กดปุ่มเปลี่ยนภาษาที่รูปธงชาติและปรับให้สลับภาษาโดยใช้เป็น Alt+Shift ก่อน

<a href="http://www.greanapp.com/wp-content/uploads/2016/12/Capture.png"><img class="alignnone size-medium wp-image-844" src="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-300x215.png" alt="" width="300" height="215" /></a>

และเข้าไปปรับ config ใหม่ที่
<pre class="lang:default decode:true">sudo nano ~/.config/lxpanel/Lubuntu/panels/panel</pre>
<a href="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-1.png"><img class="alignnone size-medium wp-image-845" src="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-1-300x216.png" alt="" width="300" height="216" /></a>

เปลี่ยนบรรทัดนี้ให้เป็นตามภาพครับ

เสร็จแล้วก็ทำการ Reboot เครื่อง 1 ครั้งครับ

เท่านี้ก็จะได้ grave หรือตัวหนอนของเรามาแล้วครับ โดยให้เข้าไปดูได้ที่รูปธงชาติเช่นเดิม

&nbsp;

แต่!!!

&nbsp;

มันยังไม่จบเท่านั้นซิครับ ทุกท่านจะสังเกตได้ว่ามันขึ้นแค่โชว์เท่านั้น แต่มันยังไม่สามารถใช้งานได้ T-T

เราต้องเข้าไปเพิ่มคำสั่งอีกนิดหน่อย

โดยเราต้องเข้าไปเพิ่มใน group ดังนี้ครับ
<pre class="lang:default decode:true">sudo nano /usr/share/X11/xkb/symbols/group</pre>
และให้เพิ่มบรรทัดนี้ลงไปที่ท้ายสุดของไฟล์ครับ
<pre class="lang:default decode:true">partial modifier_keys
  xkb_symbols "grave_toggle" {
            virtual_modifiers AltGr;
             key &lt;TLDE&gt;  {
                   symbols[Group1]= [      ISO_Next_Group  ],

                   symbols[Group2]= [      ISO_Prev_Group  ],

                   virtualMods= AltGr
           };
};</pre>
<a href="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-2.png"><img class="alignnone size-medium wp-image-846" src="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-2-300x219.png" alt="" width="300" height="219" /></a>

ต่อไปให้ไปที่
<pre class="lang:default decode:true ">cd /usr/share/X11/xkb/rules</pre>
โดยไฟล์ที่เราจะต้องเพิ่ม config เข้าไปมีทั้งหมด 3 ไฟล์ คือ <strong>evdev</strong> , <strong>evdev.lst</strong> , <strong>evdev.xml</strong>

<strong>evdev</strong>
<pre class="lang:default decode:true">grp:grave_toggle      =       +group(grave_toggle)</pre>
<strong><a href="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-3.png"><img class="alignnone size-medium wp-image-847" src="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-3-300x202.png" alt="" width="300" height="202" /></a></strong>

&nbsp;

<strong>evdev.lst</strong>
<pre class="lang:default decode:true">grp:grave_toggle     Grave key changes group.</pre>
<a href="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-4.png"><img class="alignnone size-medium wp-image-848" src="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-4-300x206.png" alt="" width="300" height="206" /></a>

&nbsp;

<strong>evdev.xml</strong>
<pre class="lang:default decode:true ">&lt;option&gt;
        &lt;configItem&gt;
          &lt;name&gt;grp:grave_toggle&lt;/name&gt;
          &lt;description&gt;Grave key changes group.&lt;/description&gt;
         &lt;/configItem&gt;
&lt;/option&gt;</pre>
&nbsp;

<a href="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-5.png"><img class="alignnone size-medium wp-image-849" src="http://www.greanapp.com/wp-content/uploads/2016/12/Capture-5-300x204.png" alt="" width="300" height="204" /></a>

แล้วก็ Reboot เครื่องอีก 1 ครั้ง ก็จะสามารถใช้ตัวหนอนของเราได้แล้วครับ

&nbsp;

http://www.thankhun.com/2008/06/set-ubuntu-grave-key.html

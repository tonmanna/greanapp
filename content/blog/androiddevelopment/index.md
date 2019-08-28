---
title: ทบทวนบทเรียน Android Development กับ Nanodegree ที่ Udacity
date: 2016-08-02T02:54:16
description: Application แรกเพื่อเป็นมารยาทที่ดีในการเข้าเรียนผมไม่ได้ I'm not allow share this video ออกมาให้ดูนะครับ only capture screen มาเฉยๆ คงไม่เสียมารยาทมากไป เขาให้ทำ App ตามรูปนี่แหละ Application แรก มี 
---

Application แรก
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Untitled.png"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Untitled.png" alt="Untitled" width="855" height="443" class="alignnone size-full wp-image-382" /></a>
เพื่อเป็นมารยาทที่ดีในการเข้าเรียนผมไม่ได้ I'm not allow share this video ออกมาให้ดูนะครับ only capture screen มาเฉยๆ คงไม่เสียมารยาทมากไป เขาให้ทำ App ตามรูปนี่แหละ Application แรก มี Event Onclick ที่ปุ่มสีแดงให้ขึ้น Toast แค่นั้น สิ่งที่ได้ Feedback กลับมาก็คือ



1. สิ่งนึงที่สำคัญคือการกดหนดขนาตัวอักษรหรือขนาดความกว้างต่างๆ บน Android โดย Coach ที่ Udacity ได้แนะนำ รวมกับการหาข้อมูลของผมที่ Stack Overflow เขาแนะนำให้ใช้ SP Unit ตามคำอธิบายด้านล่างนี้
"It is recommended to use sp (scale-independent) unit of measurement for text size"

<strong>px</strong>
Pixels - corresponds to actual pixels on the screen.

<strong>in</strong>
Inches - based on the physical size of the screen.
1 Inch = 2.54 centimeters

<strong>mm</strong>
Millimeters - based on the physical size of the screen.

<strong>pt</strong>
Points - 1/72 of an inch based on the physical size of the screen.

<strong>dp</strong>
Density-independent Pixels - an abstract unit that is based on the physical density of the screen. These units are relative to a 160 dpi screen, so one dp is one pixel on a 160 dpi screen. The ratio of dp-to-pixel will change with the screen density, but not necessarily in direct proportion. Note: The compiler accepts both "dip" and "dp", though "dp" is more consistent with "sp".

<strong>sp</strong>
Scale-independent Pixels - this is like the dp unit, but it is also scaled by the user's font size preference. It is recommend you use this unit when specifying font sizes, so they will be adjusted for both the screen density and user's preference.

<pre class="theme:twilight lang:xhtml decode:true " >&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:layout_marginTop="@dimen/activity_vertical_margin" android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity"&gt;


    &lt;TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="My Nanodegree Apps!"
        android:textSize="24dp"</pre> 

2. เป็นช่วงที่ทำได้ดีคือการกำหนด Identifiers ปล ก็พวก ID นั่นแหละ แต่ว่าผมชอบเขียนสั่งการฝั่ง Code เลยมีความจำเป็นต้องใช้ ID ซึ่งจริงๆ แล้วมันก็ควรทำนี่หน่า
 
<pre class="theme:vs2012-black lang:xhtml decode:true " >        android:gravity="center"
    /&gt;

    &lt;TableLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="25dp"
            android:paddingRight="50dp"
            android:paddingLeft="50dp"&gt;
        &lt;Button
            android:id="@+id/btSpotify"</pre> 

3. จริงๆ ข้อนี้ผมก็อยากทำนะ แต่ว่าเจ้า Android Studio ผมกด Hot key แล้วมันไม่ทำให้ ก็คือ ใช้งานไฟล์ String.xml เพื่อเก็บค่าตัวแปรที่ใช้ซ้ำบ่อยๆ เช่นเดียวกันกับกรณีของ colors.xml ที่ใช้เก็บค่าสี
 
<pre class="lang:default decode:true " >
           android:layout_height="@dimen/height_button"
            android:background="#EF8C35"</pre> 

 
<pre class="lang:default decode:true " > android:textAllCaps="true"
            android:text="Sportify App"
            /&gt;
        &lt;Button
            android:id="@+id/btScore"</pre> 

4. ข้อนี่ผมลืมนึกไปตอนทำ Lab ก็คือการสร้าง Style ไว้ตรงกลางเพื่อเรียกใช้เพราะ Attributes ส่วนมากนั้นซ้ำๆ และเหมือนกัน จะดีกว่ามากถ้าเอาไปรวมไว้ตรงกลาง ประมาณว่าเปลี่ยนที่เดียวได้หมด และลดปริมาณ Code บน Layout ด้วย
<a href="http://developer.android.com/guide/topics/ui/themes.html" title="You can read more about Styles in this tutorial" target="_blank">http://developer.android.com/guide/topics/ui/themes.html</a>

5. การ Find หาปุ่มมาเพื่อเขียน Event Onclick นั้่นมีความยากลำบากกว่าการที่เราใช้ XML Attribute,XML portion บน Layout กว่ามาก เราควรไปใช้งานที่นั่นเพราะว่า

 
<pre class="lang:default decode:true " >public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btCapStone = (Button)this.findViewById(R.id.btCapstone);
        btCapStone.setOnClickListener(new View.OnClickListener() {</pre> 

นี่คือตัวอย่างการใช้งาน
 
<pre class="lang:default decode:true " >&lt;Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:id="@+id/button1" /&gt;
Java portion

public void showToast(View v) {
    //Add some logic
}
Anonymous Java Class
XML Portion

&lt;Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:onClick="showToast"/&gt;

findViewById(R.id.button1).setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        //Add some logic
    }
});</pre> 

Comment ของชุดนี้ขอไม่แปลทั้งหมดนะยาว แต่อ่านสรุปง่ายๆคือ สั้นกว่าและ API ใหม่กว่าน่าจะดีกว่า และสามารถใช้กับ Class อะไรก็ได้ประหยัดเวลาการเขียน เราควรจะใช้วิธีนี้เท่าที่เราจะสามารถทำได้


6. ข้อสุดท้าย minSdkVersion อย่าลืมกำหนดล่ะ และควรเลือกรุ่น Major ที่มีคนใช้เยอะสุดไว้ก่อน
 
<pre class="lang:default decode:true " >apply plugin: 'com.android.application'

android {
    compileSdkVersion 22
    buildToolsVersion "23.0.0 rc3"

    defaultConfig {
        applicationId "com.itopplus.tonmanport.myappportfolio"
        minSdkVersion 15</pre> 

---
title: ทบทวนบทเรียน Android Development กับ Nanodegree ที่ Udacity ตอนที่สอง
date: 2015-08-16T04:28:04
description: Project ที่ 2 มีความซับซ้อนค่อนข้างสูงทางทีมงานแนะนำให้ทำความเข้าใจกับการ เขียนโปรแกรม Android App เบื้องต้นก่อนจึงต้องลากสังขารตัวเองกลับไปเรียน Fundamentals ซะก่อนดังนั้น จึงต้องมาเรียน Sunshine Pro
---

Project ที่ 2 มีความซับซ้อนค่อนข้างสูงทางทีมงานแนะนำให้ทำความเข้าใจกับการ เขียนโปรแกรม Android App เบื้องต้นก่อนจึงต้องลากสังขารตัวเองกลับไปเรียน Fundamentals ซะก่อนดังนั้น จึงต้องมาเรียน Sunshine Project
โดยใน Lesson ที่ 1 จะแนะนำการใช้งาน Activity ในการแสดง ListView และ การใช้งาน Layout แบบต่างๆ เริ่มกันเลยแล้วกัน

1. จุดสำคัญในข้อนี้ก็คือ เจ้ารูป ImageView ที่มีตัวหนังสือด้านล่างผมใช้ RelativeLayout ข้อควรจำก็คือ gravity ที่ใช้จัดกึ่งกลาง และผมได้ใช้ layout_marginleft เพื่อขยับเพราะว่า Global Layout นั้นเป็น RelativeLayout จึงได้ผลลัพธ์ตามรูปล่ะครับ

<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-16-04-26-292.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-16-04-26-292.jpg" alt="Screenshot_2015-08-16-04-26-292" width="693" height="222" class="alignnone size-full wp-image-396" /></a>
 
<pre class="lang:default decode:true " >
    &lt;RelativeLayout
        android:id="@+id/relativeCloud"
        android:layout_width="wrap_content" android:layout_marginLeft="250sp"
        android:gravity="center"
        android:layout_height="wrap_content" &gt;

        &lt;ImageView
            android:id="@+id/imageCloud"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:src="@drawable/ic_launcher" /&gt;

        &lt;TextView
            android:id="@+id/txtCloud"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@id/imageCloud"
            android:text="Cloudy"
            android:paddingLeft="8sp"
            android:gravity="center"
            android:textSize="18sp"
            android:textStyle="bold" /&gt;
    &lt;/RelativeLayout&gt;
   </pre> 

2. ใน Lab นี้จะมี ListView เพื่อแสดงค่าแต่เราต้องไปสร้าง Layout ที่อยู่ใน ListView โดยกำหนดเป็นไฟล์ Layout ใหม่ชื่อว่า list_item_forecast.xml เพื่อใช้ในการแสดงค่าใน ListView
 
<pre class="lang:default decode:true " >&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent" android:layout_height="wrap_content"
    android:textSize="22sp"
    android:paddingTop="5sp"
    android:paddingBottom="5sp"
    android:gravity="center_vertical" android:id="@+id/list_item_forevast_textview"&gt;
&lt;/TextView&gt;</pre> 

3. กำหนด ListView ไว้ใน Layout ที่ Activity หลักทำงานอยู่ตามนี้

 
<pre class="lang:default decode:true " > &lt;FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical" android:layout_width="match_parent" android:paddingTop="100sp"
        android:layout_height="match_parent"&gt;
        &lt;ListView
            android:layout_width="match_parent"
            android:layout_height="300sp"
            android:id="@+id/listview_forecast"
            /&gt;
    &lt;/FrameLayout&gt;</pre> 

4. สุดท้ายกลับไปเขียน Code ชุด Test Data ตามนี้ จุดที่ต้องควรจำในข้อนี้ก็คือขึ้นตอนการ Assign ลง Adapter นั่นเองเพราะต้องการ Parameter หลายตัวพอสมควรตาม Code ด่านล่าง 

 
<pre class="lang:java decode:true " >protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        String[] forecastEntry = {
                "Today - Sunny -88/63",
                "Tomorrow - Foggy - 70/46",
                "Wed - Cloudy - 72/63",
                "Thurs - Rainy - 64/51",
                "Fri - Foggy -70/48",
                "Today - Sunny -80/68",
                "Sat - Sunny - 78/68",
                "Today - Sunny -78/33"
        };

        ArrayAdapter&lt;String&gt; AdapterforecastEntry = new ArrayAdapter&lt;String&gt;(this,R.layout.list_item_forecast,R.id.list_item_forevast_textview,forecastEntry);
        ListView listview = (ListView)this.findViewById(R.id.listview_forecast); 
        listview.setAdapter(AdapterforecastEntry);

    }
</pre> 

5. และ นี่ก็คือผลลัพธ์ของโปรแกรมนี้

<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-16-04-26-29.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-16-04-26-29.jpg" alt="Screenshot_2015-08-16-04-26-29" width="720" height="1280" class="alignnone size-full wp-image-399" /></a>


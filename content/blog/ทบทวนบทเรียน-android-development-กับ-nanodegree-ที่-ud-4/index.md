---
title: ทบทวนบทเรียน Android Development กับ Nanodegree ที่ Udacity ตอนที่ห้า
date: 2016-08-02T02:56:41
description: นี่จะเป็นบทเรียนที่ผมข้ามไปที่ Lesson 5 นะครับเป็นเรื่อง UI และเทคนิคการจัดการ ListView (Custom) ให้สามารถแสดงค่าตามที่เราต้องการ แต่ใน Lesson นี้ผมไม่ได้ทำตามที่ ClassRoom สอนนะครับเพราะอยากจะทดสอบคว
---

นี่จะเป็นบทเรียนที่ผมข้ามไปที่ Lesson 5 นะครับเป็นเรื่อง UI และเทคนิคการจัดการ ListView (Custom) ให้สามารถแสดงค่าตามที่เราต้องการ แต่ใน Lesson นี้ผมไม่ได้ทำตามที่ ClassRoom สอนนะครับเพราะอยากจะทดสอบความสามารถตัวเองในการค้นหาข้อมูลจากเน็ตแต่โดยรวมแล้วผลลัพธ์เหมือนกันครับ วิธ๊การอาจจะแตกต่างไปบ้าง

1. ใช้ GridLayout ในการจัดการ ListItem ในไฟล์ list_item_forecase.xml
 
<pre class="lang:default decode:true " >
&lt;GridLayout  xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools"
    android:layout_height="match_parent"
    android:layout_width="match_parent"

    android:alignmentMode="alignBounds"
    android:useDefaultMargins="true"
    android:columnOrderPreserved="false"

    android:columnCount="3"&gt;
    &lt;TextView
        android:layout_row="0"
        android:layout_columnSpan="3"
        android:background="#000000"
        android:layout_width="match_parent"
        android:layout_height="1dp"
        /&gt;

    &lt;ImageView
        android:padding="5dp"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:src="@drawable/sunny_day"
        android:id="@+id/list_item_imageview"
        android:layout_row="1"
        android:layout_column="0"
    /&gt;
    &lt;TextView
        style="@style/textStyle"
        android:id="@+id/list_item_forecast_textview"
        android:layout_row="1"
        android:layout_column="1"
        &gt;
    &lt;/TextView&gt;
    &lt;LinearLayout
        android:orientation="vertical"
        android:layout_row="1"
        android:layout_gravity="right"
        android:paddingRight="10dp"
        android:layout_column="2"
        &gt;
        &lt;TextView
            style="@style/textStyle"
            android:gravity="right"
            android:text="32"
            android:id="@+id/list_item_high"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/&gt;
        &lt;TextView
            style="@style/textStyle"
            android:gravity="right"
            android:id="@+id/list_item_low"
            android:text="5"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/&gt;
    &lt;/LinearLayout&gt;

&lt;/GridLayout&gt;
</pre> 

ผลลัพธ์ที่ได้ะจได้ตามรูปนี้ครับแต่ ใน Classroom เขาจะใช้ Linear Layout oriented เป็น Horizontal นะครับแต่ผมอยากลองใช้ GridLayout แต่ก็ได้ผลลัพธ์เหมือนกันครับ
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-23-07-30-09.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-23-07-30-09.jpg" alt="Screenshot_2015-08-23-07-30-09" width="720" height="192" class="alignnone size-full wp-image-444" /></a>

2. การ Custom ArrayAdapter ด้วย Class ที่เราสร้างเอง
  2.1 ForeCastObj.java class ที่ใช้เก็บ Object 
<pre class="lang:default decode:true " >
public class ForeCastObj {
    public String description;
    public String day;
    public String low;
    public String hight;
}</pre> 

 2.2 ForeCastObjAdapter ที่ใช้ในการ Custom View ด้วย Extend Class ArrayAdapter จุดสังเกตุก็มีสองที่ครับ อันแรกคือ Format ที่เราต้องการกำหนดที่ Contructor method Parameter ตัวที่ 3 อันดับสองก็คือ Method Override getView() ซึ่งควบคุมการแสดงผลใน ListView 
<pre class="lang:default decode:true " >
public class ForeCastObjAdapter extends ArrayAdapter&lt;ForeCastObj&gt; {

    private ForeCastObj[] objects;

    /* here we must override the constructor for ArrayAdapter
    * the only variable we care about now is ArrayList&lt;Item&gt; objects,
    * because it is the list of objects we want to display.
    */
    public ForeCastObjAdapter(Context context, int textViewResourceId, ForeCastObj[] objects) {
        super(context, textViewResourceId, objects);
        this.objects = objects;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // assign the view we are converting to a local variable
        View v = convertView;

        // first check to see if the view is null. if so, we have to inflate it.
        // to inflate it basically means to render, or show, the view.
        if (v == null) {
            LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            v = inflater.inflate(R.layout.activity_main_list_item_forecast, null);
        }

		/*
		 * Recall that the variable position is sent in as an argument to this method.
		 * The variable simply refers to the position of the current object in the list. (The ArrayAdapter
		 * iterates through the list we sent it)
		 *
		 * Therefore, i refers to the current Item object.
		 */
        ForeCastObj i = objects[position];

        if (i != null) {
            // This is how you obtain a reference to the TextViews.
            // These TextViews are created in the XML files we defined.

            TextView day = (TextView) v.findViewById(R.id.list_item_forecast_textview);
            TextView high = (TextView) v.findViewById(R.id.list_item_high);
            TextView low = (TextView) v.findViewById(R.id.list_item_low);
            ImageView imgView = (ImageView) v.findViewById(R.id.list_item_imageview);

            // check to see if each individual textview is null.
            // if not, assign some text!
            if (day != null){
                day.setText(i.day);
            }
            if (high != null){
                high.setText(i.hight);
            }
            if (low != null){
                low.setText(i.low);
            }

            if (imgView!=null){
                switch(i.description){
                    case "Clouds":
                        imgView.setImageResource(R.drawable.cloud_day);
                        break;
                    case "Rain":
                        imgView.setImageResource(R.drawable.showers_day);
                        break;
                    case "Sunny":
                        imgView.setImageResource(R.drawable.sunny_day);
                        break;
                    default:
                        imgView.setImageResource(R.drawable.sunny_day);
                        break;
                }
            }
        }

        // the view must be returned to our activity
        return v;
    }
}</pre> 
  2.3 กลับมาแก้ MainActivity นิดหน่อยเพราะว่า Class ที่เราใช้ก็จะเปลี่ยนไปนิดหน่อยตอนเอาเข้า ListView ตามนี้ครับโดย resuls คือ Object ForeCastObj[] ที่ได้มาจาก doInBackground ที่ปรับเปลี่ยนค่าตอน JSON return มานิดหน่อย
 
<pre class="lang:default decode:true " >
            ForeCastObjAdapter AdapterforecastEntry = new ForeCastObjAdapter(getApplicationContext(),R.layout.activity_main_list_item_forecast,results);
            ListView listview = (ListView)findViewById(R.id.listview_forecast);
            listview.setAdapter(AdapterforecastEntry);</pre> 

3.จัด View ให้ได้ตามรูปและเมื่อทำครบทุกขั้นตอนผลลัพธ์ก็ควรจะแสดงดังรูป
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-23-07-30-06.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-23-07-30-06.jpg" alt="Screenshot_2015-08-23-07-30-06" width="720" height="1280" class="alignnone size-full wp-image-449" /></a>


สรุป ใน Lesson นี้ยังไม่จบนะครับจุดที่ ClassRoom สอนเขาจะใช้ CursorAdapter แทน ArrayAdapter<T> นะครับเข้าใจว่าตอนใช้งานค่อนข้างลำบากกว่าครับเพราะต้องแก้ไขหลายอย่างกว่าแต่ประโยชน์น่าจะดีกว่าในการประยุกต์ใช้กับงานอื่นด้วยครับไม่ใช่แค่ ListView แต่เท่าที่เห็นความสามารถไม่แตกต่างกันไว้ผมมีเวลาจะลองอ่านความแตกต่างมาสรุปให้ฟังนะครับ ยังมีเรื่องการจัด FormatDate ด้วย SimpleDateFormat ที่มีการสอนเพิ่มเติมมา รวมถึงการแสดงผล หน่วยของผลลัพธ์ของอุณหภูมิ แต่คงต้องขอข้าม Lesson นี้ไปทำการบ้านก่อนล่ะครับเพราะไกล้เวลาส่งแล้วทั้ง IOS และ Android ดังนั้นใน ตอนต่อไปจะกล่าวถึงการทำ Project เลยซึ่งผมจะพยายามเขียนให้ละเอียดกว่านะ และเตรียมพบซีรีย์ใหม่ IOS Development นะครับติดตามกันด้วย แล้วเจอกัน!!!!@@!@!@@!@

 

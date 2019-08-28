---
title: ทบทวนบทเรียน Android Development กับ Nanodegree ที่ Udacity ตอนที่สี่
date: 2016-08-02T02:56:26
description: หลังจากตอนที่สาม เราได้ทำการติดต่อ WebService เพื่อ HTTP/GET Data มาเก็บเป็น Stream จากนั้น Casting เป็น JSON เพื่อใช้ในการแสดงผล  เรามาดู Code กันก่อนใน Method onPostExcute ที่ทำหลังจากเหมือน AsyncTa
---

หลังจากตอนที่สาม เราได้ทำการติดต่อ WebService เพื่อ HTTP/GET Data มาเก็บเป็น Stream จากนั้น Casting เป็น JSON เพื่อใช้ในการแสดงผล  เรามาดู Code กันก่อนใน Method onPostExcute ที่ทำหลังจากเหมือน AsyncTask นั้น doInBackground ไปเรียบร้อยแล้ว LifeCycle ของ AsyncTask ก็จะทำการเรียนก Method นี้โดยอัตโนมัติ ตามด้านล่างนี้จะเป็น Code ที่ต่อจาก Lesson ที่แล้วเลยครับ

<pre class="lang:java decode:true " >
protected void onPostExecute(final String[] results) {
            AdapterforecastEntry = new ArrayAdapter&lt;String&gt;(getApplicationContext(),R.layout.list_item_forecast,R.id.list_item_forevast_textview,results);
            ListView listview = (ListView)findViewById(R.id.listview_forecast);
            listview.setAdapter(AdapterforecastEntry);
            Log.v(ActivityTag, "Enter");
            listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView&lt;?&gt; parent, View view, int position, long id) {
                    //AdapterforecastEntry.getItem(position);
                    Log.v(ActivityTag, "Clicked");
                    Log.v(ActivityTag, results[position]);
                    //Toast.makeText(getApplicationContext(),results[position],Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent();
                    intent.setClass(getApplicationContext(),DetailActivity.class);
                    intent.putExtra(Intent.EXTRA_TEXT, results[position]);
                    startActivity(intent);
                }
            });
            Log.v(ActivityTag,"Async Post Execute");
}</pre> 

1. List View Event clicked  โดยใช้ Methode setOnItemClickListener ในการตรวจสอบการกด โดยเราจะไป map Event นี้หลังจากการ ได้รับค่าที่เป็น String[] เรียบร้อยแล้ว ตาม Code ด้านบนนี จุดสังเกตุเจ้า Parameter ที่ให้มาใน Event onItemClick นั้นจะมีตัวแปรที่ชื่อว่า position ซึ่งมันก็คือตำแหนงของ Array/Index ของ Listitem ที่โดนกระทำนั่นเอง

2. การเปลี่ยน Activity View ของ DetailActivity ใน Lesson นี้จะมีการสร้าง Activity ใหม่ขึ้นมาอีกตัวนึงทำให้การกด ListView การเปลี่ยน Activity เราจะใช้ Intent  ในการ เปลี่ยน Activity หลักด้วยคำสั่ง startActivity(intent)

3. การส่งค่าระหว่าง Activity โดยใช้ putExtra("KEY",VALUE) การ putExtra มี Overload Method อยู่หลายอย่างควรศึกษาเพิ่มเติม
<pre class="lang:java decode:true " >@Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {

            View rootView = inflater.inflate(R.layout.fragment_detail, container, false);
            Bundle extras = getActivity().getIntent().getExtras();
            if (extras != null) {
                String forecastData = extras.getString(Intent.EXTRA_TEXT);
                Toast.makeText(getActivity().getApplicationContext(), forecastData, Toast.LENGTH_SHORT).show();
                TextView txtView = (TextView)rootView.findViewById(R.id.txtDetailData);
                if (forecastData != null) {
                    txtView.setText(forecastData);
                    mForecastStr = forecastData;

                }else{
                    txtView.setText("ERROR");
                }
            }
            return rootView;
        }
</pre> 

4. การรับค่า putExtra ที่ส่งมาจาก MainActivity โดยใช้ Bundle bundle.getString("KEY") จะได้ค่าที่เราต้องการโดย getXXXX มีหลาย Methode ที่ใช้ get แต่แตกต่างออกไปจากตอนส่งเพราะนี่มันคนล่ะ Method เลยเช่น getBoolean , getInt, getClass ซึ่งอยู่ที่ตัวแปรที่เราใช้ส่งมาจาก putExtra จากฝั่งต้นทาง ซึ่งในกรณีนี้เราได้ส่งค่า สภาพอากาศของวันที่เลือกมาแสดงบน TextView ที่อยู่ใน DetailActivity ซึ่งก็ได้แสดงค่าออกมาเหมือนกับค่าใน ListView

5. ที่ main_menu ที่ Mainactivity ได้ทำการเพิ่ม Item ใน เมนูชื่อว่า Settting ลงไป ต่อจาก Refresh ที่ทำในLesson ก่อน
<pre class="lang:default decode:true " >
        &lt;item android:id="@+id/action_settings"
              android:title="@string/settting_text"
              app:showAsAction="never"/&gt;
</pre> 
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-36-11.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-36-11.jpg" alt="Screenshot_2015-08-22-02-36-11" width="720" height="521" class="alignnone size-full wp-image-435" /></a>

6. คราวนี้เราจะใช้ PreferenceScreen xml ไฟล์ ที่ใช้ในการตั้งค่า ของโปรแกรม โดยในตอนแรกนี้เราจะให้ตั้งค่าอยู่สองอย่างคือ Location, และ Units(C,F) เริ่มที่สร้างไฟล์ pref_general.xml ส่วนตัวแปรต่างๆที่อยู่ใน strings.xml ผมไม่ได้กล่าวถึงนะครับเอาเป็นว่าตั้งค่าตามสะดวก โดย XML Preference ที่เราใช้งานนั้นจะประกอบด้วย

<pre class="lang:xhtml decode:true " >
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android"&gt;
    &lt;EditTextPreference android:title="@string/location_label"
        android:key="@string/location_key"
        android:defaultValue="@string/default_label_location"
        android:inputType="text"
        android:singleLine="true"
    /&gt;
    &lt;ListPreference
        android:title="@string/pref_units_label"
        android:key="@string/pref_units_key"
        android:defaultValue="@string/pref_units_metric"
        android:entryValues="@array/pref_units_values"
        android:entries="@array/pref_units_options" /&gt;
&lt;/PreferenceScreen&gt;</pre> 

   6.1 ซึ่งเราก็ไปตรวจสอบการกด Menu ใหม่ที่เราสร้างมาที่ onOptionsItemSelected ใน DetailActivity 
 
<pre class="lang:java decode:true " >if (id == R.id.action_settings) {
            Intent settingIntent = new Intent();
            settingIntent.setClass(getApplicationContext(),SettingsActivity.class);
            startActivity(settingIntent);
            return true;
}</pre> 



   6.2 EditTextPreference ซึ่งใช้ในการดึงค่าที่เป็นตัวหนังสือซึ่งผมใช้คำว่า Bangkok,TH เป็น Default
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-36-44.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-36-44.jpg" alt="Screenshot_2015-08-22-02-36-44" width="720" height="1280" class="alignnone size-full wp-image-433" /></a>

   6.3 ListPreference ใช้ในการเก็บ Unit ของอุณหภูมิเป็น Array ที่เก็บค่าไว้ที่ไฟล์ arrays.xml ใน Resource เช่นเดียวกับ strings resource
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-36-49.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-36-49.jpg" alt="Screenshot_2015-08-22-02-36-49" width="720" height="1280" class="alignnone size-full wp-image-434" /></a>

   6.4 Array Resource ที่ใช้
 
<pre class="lang:xhtml decode:true " >&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;resources&gt;

    &lt;string-array name="pref_units_options"&gt;
        &lt;item&gt;@string/pref_units_label_metric&lt;/item&gt;
        &lt;item&gt;@string/pref_units_label_imperial&lt;/item&gt;
    &lt;/string-array&gt;

    &lt;string-array name="pref_units_values"&gt;
        &lt;item&gt;@string/pref_units_metric&lt;/item&gt;
        &lt;item&gt;@string/pref_units_imperial&lt;/item&gt;
    &lt;/string-array&gt;
&lt;/resources&gt;</pre> 

7. การใช้งาน android:scheme="geo" ของ Map App ใน Android สามารถทำงายๆ โดยใช้ Class จากรูปด้านบนสั่งเกตุว่าผมจะมี Map Location Item อยู่ซึ่งวิธีเรียกใช้นั่นง่ายมากครับตาม Method นี้เลย แล้วเอาไปเรียนกใน onOptionsItemSelected
ข้อมูลเพิ่มเติมอ่านที่ตรงนี้นะครับ <a href="http://developer.android.com/guide/components/intents-common.html#Maps">http://developer.android.com/guide/components/intents-common.html#Maps</a>

<pre class="lang:default decode:true " >
private void openPreferredLocationInMap() {
        SharedPreferences sharedPrefs =
                PreferenceManager.getDefaultSharedPreferences(this);
        String location = sharedPrefs.getString(
                getString(R.string.location_key),
                getString(R.string.default_label_location));

        // Using the URI scheme for showing a location found on a map.  This super-handy
        // intent can is detailed in the "Common Intents" page of Android's developer site:
        // http://developer.android.com/guide/components/intents-common.html#Maps
        Uri geoLocation = Uri.parse("geo:0,0?").buildUpon()
                .appendQueryParameter("q", location)
                .build();

        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(geoLocation);

        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        } else {
            Log.d(LOG_TAG, "Couldn't call " + location + ", no receiving apps installed!");
        }
}</pre> 

 ผลลัพธ์ที่ได้เมื่อทำการกด Menu Map Location ก็จะเปิด Application Map ที่อยู่ในเครื่องและเลื่อนหมุดมายังทำแหน่งที่เราตั้งค่าไว้ในตอนนี้คือ Bangkok,TH
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-48-58.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-48-58.jpg" alt="Screenshot_2015-08-22-02-48-58" width="720" height="1280" class="alignnone size-full wp-image-437" /></a>

8. การใช้งาน Sharing

  8.1 เพิ่มปุ่มใหม่บน Menu แต่เราตั้งค่า showAsAction เป็น always และใช้ ActionProviderClass ของ Android ในการทำงานปุ่มนี้โดยที่เราไม่ต้องทำอะไรเพิ่มเติม
 
<pre class="lang:default decode:true " >&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;menu xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"&gt;
    &lt;item android:id="@+id/action_share"
        android:title="@string/share_text"
        app:showAsAction="always"
        app:actionProviderClass="android.support.v7.widget.ShareActionProvider" /&gt;
&lt;/menu&gt;</pre> 

  8.2 ทำการเพิ่ม Code ลงไปใน DetailActivity ที่แสดงค่า foreCast ที่เรารับมาจาก getString ที่ถูกส่งมาโดยเราจะทำการโหลดเมนูด้านบนลงใน ActivityTab 
 
<pre class="lang:default decode:true " >public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
            super.onCreateOptionsMenu(menu, inflater);

            inflater.inflate(R.menu.detailfragment, menu);

            // Retrieve the share menu item
            MenuItem menuItem = menu.findItem(R.id.action_share);

            // Get the provider and hold onto it to set/change the share intent.
            ShareActionProvider mShareActionProvider =
                    (ShareActionProvider) MenuItemCompat.getActionProvider(menuItem);

            // Attach an intent to this ShareActionProvider.  You can update this at any time,
            // like when the user selects a new piece of data they might like to share.
            if (mShareActionProvider != null ) {
                mShareActionProvider.setShareIntent(createShareForecastIntent());
            } else {
                Log.d(LOG_TAG, "Share Action Provider is null?");
            }
        }
        
        private Intent createShareForecastIntent() {
            Intent shareIntent = new Intent(Intent.ACTION_SEND);
            shareIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
            shareIntent.setType("text/plain");
            shareIntent.putExtra(Intent.EXTRA_TEXT,
                    mForecastStr + FORECAST_SHARE_HASHTAG);
            Log.d(LOG_TAG,mForecastStr);
            return shareIntent;
}</pre> 

และเมื่อรันก็จะได้ผลลัพธ์แบบรูปนี้ 
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-49-33.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-49-33.jpg" alt="Screenshot_2015-08-22-02-49-33" width="720" height="552" class="alignnone size-full wp-image-438" /></a>

และเมื่อผมทดลองใช้ ShareActionProvider นี้ด้วย Messaging เพื่อส่งข้อความ ข้อมูลที่ผมส่งมาด้วย Intent putExtra ก็จะมาด้วยตามรูป
<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-49-39.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-22-02-49-39.jpg" alt="Screenshot_2015-08-22-02-49-39" width="719" height="619" class="alignnone size-full wp-image-439" /></a>

สรุป Lesson นี้นั้นเป็นที่น่าเเสียตายที่ไม่สามารถใช้ ShareActionPrivider ส่งค่าไปยัง Facebook App ได้เพราะ Facebook App ไม่มีการรับค่า Intent.EXTRA_TEXT ถ้าต้องการทำอาจจะต้องใช้ FacebookAPI ซึ่งผมจะหาข้อมูลใน Stackoverflow ดูว่ามีวิธีการทำอย่างไร่ได้บ้าง การลง Lab ค่อนข้างมีขึ้่นตอนเยอะและผมไม่สามารถลงลายระเอียดให้ได้มากต้องขออภัยไว้ด้วยนะครับ เพราะความตั้งใจแรกนั้นจะใช้ Blog ในการทบทวนตัวผมเองและ Lab ที่ได้ทำการทดลองใน Udacity ดังนั้นบทความเหล่านี้ อาจะทำให้คนอ่านตามศึกษาได้ยากลำบากพอสมครับ ติดตามต่อตอนหน้านะครับ....


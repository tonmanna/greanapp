---
title: ทบทวนบทเรียน Android Development กับ Nanodegree ที่ Udacity ตอนที่สาม
date: 2015-08-17T20:27:44
description:   หลังจาก ตอนที่2 เราได้ทำการเขียน Mockup เพื่อสร้าง UI แบบง่ายๆ คราวนี้มีสู่ Lesson 2 ซึ่งเราจะเอาสภาพการพยากรอากาศของจริงจาก Webservice มาใช้กับ Application ที่เราออกแบบไว้1. ต้อง การ ติดต่อ Resful 
---

  หลังจาก ตอนที่2 เราได้ทำการเขียน Mockup เพื่อสร้าง UI แบบง่ายๆ คราวนี้มีสู่ Lesson 2 ซึ่งเราจะเอาสภาพการพยากรอากาศของจริงจาก Webservice มาใช้กับ Application ที่เราออกแบบไว้

1. ต้อง การ ติดต่อ Resful Service ของ openweathermap.org Parameter ประกอบด้วย 
<ul>
	<li>Location ผมเลือกที่จะใช้ Bangkok,th</li>
	<li>Format JSON</li>
	<li>Metric เป็นอุณหภูม celsius</li>
	<li>ระยะเวลา 7 วัน</li>
</ul>
  เมื่อใส่ข้อมูลครบแล้วจะได้ ตาม URL ด้านล่างนี้
  <a target="_blank" href="http://api.openweathermap.org/data/2.5/forecast/daily?q=Bangkok,th&mode=json&units=metric&cnt=7">ทดสอบได้ที่นี่</a>  
<pre class="lang:default decode:true " >URL url = new URL("http://api.openweathermap.org/data/2.5/forecast/daily?q=Bangkok,th&amp;mode=json&amp;units=metric&amp;cnt=7");</pre> 

2.เริ่มมีการใช้ Async Task เพราะเราจะไม่ใช่ UI Thread ในการทำงานเพราะจะทำให้ Application ค้างนะครับ และเกิด NetworkingException ดังนั้นเราจะไช้เจ้า Async Task โดย ข้อบังคับในการ ใช้งาน AsyncTask  ก็คือต้อง Implement doInBackground แค่นั้นแต่ยังมี Method อื่นๆ ให้ Override ใช้นะดูในคู่มือเพิ่มเติมได้ ลองกด Alt+O ใน Android Studio ที่ Class ที่ Extends จะเห็นว่ามีอะไรบ้าง ในข้อนี้มีจุดสังเกตุคือตอนที่ Extends Class ต้องใส่ Attribute ของ Class<Void,Void,Void> ด้วย 3 ค่า คือ Params ใช้ที่ doinBackground,Progress ใช้ตอน onProgressUpdate ใช้ทำพวก Loading Progress,Result ใช้ที่ doinBackground ตอนที่ Return กับ onPostExecute
 
<pre class="lang:default decode:true " >
 public class FetchWeatherTask extends AsyncTask&lt;String,Void,String []&gt;{
        @Override
        protected void onPostExecute(String[] results) {
        }

        @Override
        protected String[] doInBackground(String... params) {
            return null;
        }
 }</pre> 

3. HttpURLConnection Wrapper เอามาจาก Gits แต่ว่่าไม่ได้ยากอะไรจำวิธีใช้งานไว้แล้วกันครับ ตัว Class นี้เราได้ทดลองการใช้ Uri Builder ด้วยตาม Code ด้านล่างนี้เลยซึ่งก็สะดวกดีแทนที่จะเอามาบวกกันแบบ บ้านๆ
        
<pre class="lang:default decode:true " >
        private String callWebforecastService(String... location){
            Log.v(ActivityTag,"Enter call webservice");
            // These two need to be declared outside the try/catch
            // so that they can be closed in the finally block.
            HttpURLConnection urlConnection = null;
            BufferedReader reader = null;

            // Will contain the raw JSON response as a string.
            String forecastJsonStr = null;

            try {
                // Construct the URL for the OpenWeatherMap query
                // Possible parameters are avaiable at OWM's forecast API page, at
                // http://openweathermap.org/API#forecast
                final String BASE_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?";
                final String QUERY_PARAM= "q";
                final String FORMAT_PARAM =  "mode";
                final String UNIT_PARAM = "units";
                final String DAYS_PARAM = "cnt";

                Uri buildUri = Uri.parse(BASE_URL).buildUpon()
                        .appendQueryParameter(QUERY_PARAM, location[0])
                        .appendQueryParameter(FORMAT_PARAM, format)
                        .appendQueryParameter(UNIT_PARAM, units)
                        .appendQueryParameter(DAYS_PARAM,Integer.toString(numDays))
                        .build();
                // URL url = new URL("http://api.openweathermap.org/data/2.5/forecast/daily?q="+location+"&amp;mode=json&amp;units=metric&amp;cnt=7");
                URL url = new URL(buildUri.toString());
                Log.v(ActivityTag,"Build URL ="+buildUri.toString());


                // Create the request to OpenWeatherMap, and open the connection
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.connect();

                // Read the input stream into a String
                InputStream inputStream = urlConnection.getInputStream();
                StringBuffer buffer = new StringBuffer();
                if (inputStream == null) {
                    // Nothing to do.
                    forecastJsonStr = null;
                }
                reader = new BufferedReader(new InputStreamReader(inputStream));

                String line;
                while ((line = reader.readLine()) != null) {
                    // Since it's JSON, adding a newline isn't necessary (it won't affect parsing)
                    // But it does make debugging a *lot* easier if you print out the completed
                    // buffer for debugging.
                    buffer.append(line + "\n");
                }

                if (buffer.length() == 0) {
                    // Stream was empty.  No point in parsing.
                    forecastJsonStr = null;
                }
                forecastJsonStr = buffer.toString();
            } catch (IOException e) {
                Log.e("PlaceholderFragment", "Error ", e);
                // If the code didn't successfully get the weather data, there's no point in attemping
                // to parse it.
                forecastJsonStr = null;
            } finally{
                if (urlConnection != null) {
                    urlConnection.disconnect();
                }
                if (reader != null) {
                    try {
                        reader.close();
                    } catch (final IOException e) {
                        Log.e("PlaceholderFragment", "Error closing stream", e);
                    }
                }
            }
            return forecastJsonStr;
        }</pre> 

4. สิ่งที่ทำหลังจากนั้นก็คือการ Serialize stream String ที่ได้มาเป็น JSON ให้อยู่ในรูปแบบ String[] เพื่อเอาไปใช้ใน ListView ก็ได้ใช้ Code ด้านล่างนี้จัดการ
         
<pre class="lang:java decode:true " >
        /* The date/time conversion code is going to be moved outside the asynctask later,
        * so for convenience we're breaking it out into its own method now.
        */
        private String getReadableDateString(long time){
            // Because the API returns a unix timestamp (measured in seconds),
            // it must be converted to milliseconds in order to be converted to valid date.
            SimpleDateFormat shortenedDateFormat = new SimpleDateFormat("EEE MMM dd");
            return shortenedDateFormat.format(time);
        }

        /**
         * Prepare the weather high/lows for presentation.
         */
        private String formatHighLows(double high, double low) {
            // For presentation, assume the user doesn't care about tenths of a degree.
            long roundedHigh = Math.round(high);
            long roundedLow = Math.round(low);

            String highLowStr = roundedHigh + "/" + roundedLow;
            return highLowStr;
        }

        /**
         * Take the String representing the complete forecast in JSON Format and
         * pull out the data we need to construct the Strings needed for the wireframes.
         *
         * Fortunately parsing is easy:  constructor takes the JSON string and converts it
         * into an Object hierarchy for us.
         */
        private String[] getWeatherDataFromJson(String forecastJsonStr, int numDays) throws JSONException {

            // These are the names of the JSON objects that need to be extracted.
            final String OWM_LIST = "list";
            final String OWM_WEATHER = "weather";
            final String OWM_TEMPERATURE = "temp";
            final String OWM_MAX = "max";
            final String OWM_MIN = "min";
            final String OWM_DESCRIPTION = "main";

            JSONObject forecastJson = new JSONObject(forecastJsonStr);
            JSONArray weatherArray = forecastJson.getJSONArray(OWM_LIST);

            // OWM returns daily forecasts based upon the local time of the city that is being
            // asked for, which means that we need to know the GMT offset to translate this data
            // properly.

            // Since this data is also sent in-order and the first day is always the
            // current day, we're going to take advantage of that to get a nice
            // normalized UTC date for all of our weather.

            Time dayTime = new Time();
            dayTime.setToNow();

            // we start at the day returned by local time. Otherwise this is a mess.
            int julianStartDay = Time.getJulianDay(System.currentTimeMillis(), dayTime.gmtoff);

            // now we work exclusively in UTC
            dayTime = new Time();

            String[] resultStrs = new String[numDays];
            for(int i = 0; i &lt; weatherArray.length(); i++) {
                // For now, using the format "Day, description, hi/low"
                String day;
                String description;
                String highAndLow;

                // Get the JSON object representing the day
                JSONObject dayForecast = weatherArray.getJSONObject(i);

                // The date/time is returned as a long.  We need to convert that
                // into something human-readable, since most people won't read "1400356800" as
                // "this saturday".
                long dateTime;
                // Cheating to convert this to UTC time, which is what we want anyhow
                dateTime = dayTime.setJulianDay(julianStartDay+i);
                day = getReadableDateString(dateTime);

                // description is in a child array called "weather", which is 1 element long.
                JSONObject weatherObject = dayForecast.getJSONArray(OWM_WEATHER).getJSONObject(0);
                description = weatherObject.getString(OWM_DESCRIPTION);

                // Temperatures are in a child object called "temp".  Try not to name variables
                // "temp" when working with temperature.  It confuses everybody.
                JSONObject temperatureObject = dayForecast.getJSONObject(OWM_TEMPERATURE);
                double high = temperatureObject.getDouble(OWM_MAX);
                double low = temperatureObject.getDouble(OWM_MIN);

                highAndLow = formatHighLows(high, low);
                resultStrs[i] = day + " - " + description + " - " + highAndLow;
            }

            return resultStrs;
        }</pre> 

4.1 ลืมเขียนขอแทรกตรงนี้แล้วกันคือหลังจากได้ค่าแล้ว ก็ใช้ Event Thread ของ AsynsTask onPostExecute()
 
<pre class="lang:java decode:true " >        @Override
        protected void onPostExecute(String[] results) {
            AdapterforecastEntry = new ArrayAdapter&lt;String&gt;(getApplicationContext(),R.layout.list_item_forecast,R.id.list_item_forevast_textview,results);
            ListView listview = (ListView)findViewById(R.id.listview_forecast);
            listview.setAdapter(AdapterforecastEntry);
            Log.v(ActivityTag,"Async Post Execute");
        }
</pre> 

5. Logcat เพื่อดูสถานะการทำงาน Log.v Log.d Log.w Log.e Log.i  ทำความเข้าใจของ Log แต่ล่ะประเภท
<a href="http://developer.android.com/tools/debugging/debugging-log.html">http://developer.android.com/tools/debugging/debugging-log.html</a>

6. Permissions ที่จำเป้นต้องใช้ INTERNET Permission ในไฟล์ maifest
 
<pre class="lang:default decode:true " >&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.itopplus.tonmanport.sunshinelab" &gt;

    &lt;application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" &gt;
        &lt;activity
            android:name=".MainActivity"
            android:label="@string/app_name" &gt;
            &lt;intent-filter&gt;
                &lt;action android:name="android.intent.action.MAIN" /&gt;

                &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;
    &lt;/application&gt;
    &lt;uses-permission android:name="android.permission.INTERNET" /&gt;
&lt;/manifest&gt;</pre> 

สรุปใน Lesson นี้เราได้ทดสอบการใช้งานเหมือน Application จริงๆ ที่ใช้ HttpURLConnection เพื่ออ่าน Data ที่เป็น JSON มาเพื่อทำการแสดงบน Application ของเราผมลัพธ์ก็ตามรูปด้านล่างนี้ครับ

ปล. ตัวหนังสือด้านบนยังไม่ได้ปรับนะครับ รวมถึงรูปภาพกับคำบรรยายด้วยจะทำใน Lesson ต่อไปนะครับ 

<a href="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-17-20-32-09.jpg"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/Screenshot_2015-08-17-20-32-09.jpg" alt="Screenshot_2015-08-17-20-32-09" width="720" height="1280" class="alignnone size-full wp-image-414" /></a>


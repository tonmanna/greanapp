---
title: ทบทวนบทเรียน Android Development กับ Nanodegree ที่ Udacity ตอนที่หก
date: 2016-08-02T02:57:21
description: เป็นการเริ่ม Project Popular Movies โดยอาศัยการติดต่อ API ของ Themoviedb ใครที่สนใจใช้งานเพื่อการศึกษาสามารถสมัครใช้งานฟรีได้ โดยไปที่เว็บ http://www.themoviedb.or
---

เป็นการเริ่ม Project Popular Movies โดยอาศัยการติดต่อ API ของ Themoviedb ใครที่สนใจใช้งานเพื่อการศึกษาสามารถสมัครใช้งานฟรีได้ โดยไปที่เว็บ <a href="http://www.themoviedb.org/">http://www.themoviedb.org/</a> โดยหลังจากสมัครแล้วกดยืนยันว่าเพื่อใช้ในการศุึกษาเขาก็จะให้ Token มาเพื่อใช้ในการ Access นะครับ

<a href="http://www.greanapp.com/wp-content/uploads/2015/09/Untitled.png"><img src="http://www.greanapp.com/wp-content/uploads/2015/09/Untitled.png" alt="Untitled" width="996" height="604" class="alignnone size-full wp-image-531" /></a>

โดยใน Project นี้ผมได้พยายามทำ HTTPGet ให้่อยู่ในโครงสร้างที่มี Interface เป็นตัวกลางเพื่อใช้ในอนาคตเขียนเผื่อ Reused นั่นแหละครับ

1. File Model (TheMoviewModel.js) ใช้เพื่อรับค่ามาจาก ThemovieDB แล้วจะเก็บเป็น Object ประเภทนี้
 
<pre class="lang:default decode:true " >package api;

import java.util.Date;
import java.util.List;

/**
 * Created by Tonman on 26/8/2558.
 */
public class TheMoviesModel {
    public int page;
    public int total_pages;
    public int total_results;
    public List&lt;TheMoviesResultList&gt; results;
}
</pre> 

2. File TheMoviesResultList.java ซึ่ง ใช้เก็บ result ที่เป็น JSON Array ที่ได้มากจากการ Request API
 
<pre class="lang:default decode:true " >package api;

import java.io.Serializable;
import java.util.Date;

public class TheMoviesResultList implements Serializable {
    public boolean adult;
    public String backdrop_path;
    public long id;
    public String original_language;
    public String original_title;
    public String overview;
    public Date release_date;
    public String poster_path;
    public float poppularity;
    public String title;
    public boolean video;
    public float vote_average;
    public int vote_count;
}
</pre> 

จริงๆ ทั้ง 2 ไฟล์ไม่มีอะไรมาก แค่เราจัดโครงสร้างให้มันตรงกับ JSON ที่ได้มาจากการเรียก API เมื่อเวลาจะเอาไปใช้จะได้ไม่ลำบากนั่นเอง

3. File TheMoviesRepository.java ใช้ในการทำงานหลักทั้งหมดในการติดต่อ API
 
<pre class="lang:default decode:true " >
package api;
import android.net.Uri;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import lib.IHTTPRequestParam;
import lib.Utility;

public class TheMoviesRepository implements IHTTPRequestParam
{
    //get Popular movies;
    public final String BASE_URL = "http://api.themoviedb.org/3/discover/movie?";

    public String api = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // ใส่ API KEY ตรงนี้
    private final String API_KEY = "api_key";

    public String mode = "popularity"; // Default sort by popularity desc

    public String sort = "desc"; // Default sort by popularity desc
    private final String SORT_BY = "sort_by";


    public int page = 1;
    private final String PAGE = "page";

    public TheMoviesModel getMovie(TheMoviesRepository moviesAPI) throws JSONException { 
        String result = Utility.HTTPGet(moviesAPI); // moviesAPI เพื่อติดต่อโดยส่งค่า Object ไปใช้ Utility HTTPGet ซึ่งจะอธิบายต่อในภายหลัง

        JSONObject JsonObj = new JSONObject(result);
        TheMoviesModel returnResult = new TheMoviesModel();
        returnResult.page = Integer.parseInt(JsonObj.getString("page"));
        JSONArray resultsMoviesArray = JsonObj.getJSONArray("results");  //เนื่องจากค่า results นั้นจะอยู่ในรูปแบบ Array เราจึงต้องทำการ getJsonArray อีกรอบ
        returnResult.results = new ArrayList&lt;TheMoviesResultList&gt;(); // สร้าง Object เพื่อรองรับค่าที่จะมายัดใส่

        for (int i = 0; i &lt; resultsMoviesArray.length(); i++) { // วน for เพื่อ ยัดค่าตัวแปรที่ได้มาจาก results
            TheMoviesResultList movies = new TheMoviesResultList(); // ชุดล่างนี้ไม่ต่างอะไรกับด้านบนค่อยยัด Object กลับไปให้ returnResult.results
            JSONObject resultMovies = resultsMoviesArray.getJSONObject(i);
            movies.backdrop_path = "http://image.tmdb.org/t/p/w185" + resultMovies.getString("backdrop_path");
            movies.id = Long.parseLong(resultMovies.getString("id"));
            movies.title = resultMovies.getString("title");
            movies.original_title = resultMovies.getString("original_title");
            movies.overview = resultMovies.getString("overview");
            movies.poster_path = "http://image.tmdb.org/t/p/w185" + resultMovies.getString("poster_path");
            returnResult.results.add(movies);
        }
        if (result != null) {
            return returnResult;
        } else {
            return null;
        }
    }

    @Override
    public Uri getURL() {  // เป็น Methode ที่ Override มาเพื่อสร้าง URL ในการ Request ซึ่ง Utility.HTTPGet นั้นจะต้องใช้ Class ที่ Implement IHTTPRequestParam เป็น Parameter 
        Uri buildUri = Uri.parse(BASE_URL).buildUpon()
                .appendQueryParameter(SORT_BY, mode+"."+sort)
                .appendQueryParameter(PAGE, String.valueOf(page))
                .appendQueryParameter(API_KEY, api)
                .build();
        return buildUri;
    }
}
</pre> 

4. IHTTPRequestParam.java ไฟล์นี้ไม่มีอะไรครับแค่ Interface ที่เราใช้ในการบังคับ Class ที่จะใช้ Utility.HTTPGet ของเราต้อง Implement method getURL() แค่นั้นเอง
 
<pre class="lang:default decode:true " >
package lib;

import android.net.Uri;

public interface IHTTPRequestParam {
    Uri getURL();
}</pre> 

5. Utility.java  Class ที่ผมได้ว่างไว้ เพื่อเขียน HTTPGet ถ้ามีเวลาจะกลับมาทำ HTTPPost / Multipath ให้ด้วยเพราะใจจริงอยากจะเก็บไว้ใช้ในงานต่อๆ ไปด้วย แต่อาจจะเปลี่ยนใจในภายหลังใช้พวก System Library อื่นแต่ตอนนี้ขอเขียนมือล้วนๆ แบบนี้ไปก่อนแล้วกันครับ จริงๆ แล้วเอามาจากบทความเดิมนะครับย้อนกลับไปอ่านกันได้
 
<pre class="lang:default decode:true " >
package lib;

import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Utility {

    private Utility(){}

    public static String HTTPGet(IHTTPRequestParam params){
        // These two need to be declared outside the try/catch
        // so that they can be closed in the finally block.
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        // Will contain the raw JSON response as a string.
        String resultString = null;

        try {
            URL url = new URL(params.getURL().toString());

            // Create the request to OpenWeatherMap, and open the connection
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.connect();

            // Read the input stream into a String
            InputStream inputStream = urlConnection.getInputStream();
            StringBuffer buffer = new StringBuffer();
            if (inputStream == null) {
                // Nothing to do.
                resultString = null;
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
                resultString = null;
            }else {
                resultString = buffer.toString();
            }
        } catch (IOException e) {
            Log.e("UTILITYHelperTAG", "Error ", e);
            // If the code didn't successfully get the weather data, there's no point in attemping
            // to parse it.
            resultString = null;
        } finally{
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (final IOException e) {
                    Log.e("UTILITYHelperTAG", "Error closing stream", e);
                }
            }
        }
        return resultString;
    };
}
</pre> 


6. มาถึงไฟล์ที่ใช้ในการเรียก ซึ่งผมได้ใช้ AsyncTask แยก Class ออกมาชื่อว่า FetchMoviesAsyncTask.java ก็ extends AsyncTask และมี Parameter เป็น TheMoviewsRepository เพื่อกำหนด Scope ที่จะ request API เช่น mode,sort,page ซึ่ง Class TheMoviewsRepository สามารถกำหนดค่าลงไปในนี้ได้เลย
 
<pre class="lang:default decode:true " >
package com.itopplus.tonmanport.popularmovies;

import android.os.AsyncTask;
import org.json.JSONException;

import api.TheMoviesRepository;
import api.TheMoviesModel;

public class FetchMoviesAsyncTask extends AsyncTask&lt;TheMoviesRepository,Void, TheMoviesModel&gt; {
    private final String TAG = "FetchMoviesAsyncTaskTAG";
    @Override
    protected TheMoviesModel doInBackground(TheMoviesRepository... theMovies) {
        TheMoviesRepository theMovieRepo = new TheMoviesRepository();

        try {
            TheMoviesModel result = theMovieRepo.getMovie(theMovies[0]);
            return result;
        }catch (JSONException ex){
            return null;
        }
    }
}
</pre> 


 <strong>สรุป</strong> ชุดนี้คือ Class ที่เตรียมไว้สำหรับการทำงานหลักของ Movies ที่เราได้มา ซึ่งจริงๆ แล้วนั้น มันคือส่วนของ Controller และ Model แต่ในตอนต่อไปผมจะมาเขียนบทความเรื่อง Views ในการใช้งาน ListItem และ การใช้งาน Glide ในการ Load รูปภาพ มาแสดงโดยโหลดภาพจาก url  โดยจะแสดงรูปที่ได้มาจาก API ของ ThemovieDB ก็จะเป็นการครบ Concept MVC ของ Android Development แล้วเจอกันใหม่ครับ

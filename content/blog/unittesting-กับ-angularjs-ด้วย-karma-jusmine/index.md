---
title: Unit Testing กับ AngularJS ด้วย Karma , Jusmine  ตอนที่ 1 เริ่มต้นใช้งาน
date: 2016-08-02T02:52:44
description: หลังจากไปลองเรียน Android/IOS Development กับ Udacity ซะนานกลับมาเขียนบทความเกี่ยวกับการพัฒนา Web Application กันบ้างในตอนนี้ขอเขียนบทความเกี่ยวกับการทำ Unit Testing บน A
---

<a href="http://www.greanapp.com/wp-content/uploads/2015/08/images.png"><img src="http://www.greanapp.com/wp-content/uploads/2015/08/images.png" alt="images" width="429" height="117" class="alignnone size-full wp-image-464" /></a>

หลังจากไปลองเรียน Android/IOS Development กับ Udacity ซะนานกลับมาเขียนบทความเกี่ยวกับการพัฒนา Web Application กันบ้างในตอนนี้ขอเขียนบทความเกี่ยวกับการทำ Unit Testing บน AngularJS โดย Framework ที่ใช้ในการทดสอบก็คือ Justmine และตัว Runner ก็คือ Karma เริ่มกันเลยนะครับ เพื่อไม่ให้เสียเวลาเราเริ่มจากลงส่วนประกอบที่ต้องใช้กันก่อนนะครับ
ปล. ใครที่ยังไม่มี NodeJS ,NPM ให้ไป Download มาลงก่อนลงมือทำนะครับ น่าจะเป็นเครื่องมือสำคัญในการพัฒนาโปรแกรมสมัยนี้ไปล่ะเจ้า NPM, Bower Package manager

1.ขั้นตอนการติดตั้งส่วนประกอบต่างๆ ก่อนการใช้งาน
<pre class="lang:default decode:true " >
//Installation Karma with global access
npm install -g karma 

// If don't need to global acces,But you can have both wihout any problem
npm install karma --save 

// For used chrome are default browser 
npm install karma-chrome-launcher --save

// frame work for unittest.
npm install karma-jasmine --save</pre> 



2.ไฟล์ Configuration โดยผมอธิบายใน Comment นะครับ karma.conf.js ย้ำนะครับชื่อไฟล์ต้องตรงตามนี้ 
<pre class="lang:default decode:true " >
/**
// karma.conf.js */
module.exports = function(config) {
    config.set({
        // Base path for all script '' it mean current
        basePath: '',
        
        // Frameworks for testscript but you can define multiple
        frameworks: ['jasmine'],

        
        // File are include before test must includ unittesting file
        files:[
            // our project used concat all angularjs,angular-route,angular-animate,etc file to single file
            '../dist/js/Client/itopplusAngular.js',

            // angular-mock is require for test angularjs app
            '../bower_components/angular-mocks/angular-mocks.js',
            'Test/**/*.js', // our current test script path  <<----- keep test file to this folder ./Test/*.js
        ],
        
        //exclud file list
        exclude:[
            ''
        ],
        
        // if you have alot plugins can define here.
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher'
        ],
        port:9876,
        colors:true,
        
        // dot,progress,junit,growl,coverage
        reporters:['progress'],
        //...

        // possible values:
        // config.LOG_DISABLE
        // config.LOG_ERROR
        // config.LOG_WARN
        // config.LOG_INFO
        // config.LOG_DEBUG
        //logLevel: config.LOG_INFO,

        //autoWatch: false,

        browsers: ['Chrome']

        //singleRun: true
    });
};</pre> 

2.จากนั้นก็ลงมือเขียน Test Script กันเลยเอาง่ายๆก่อนแล้วกัน ผมไม่ได้พูดถึงพื้นฐาน AngularJS นะครับดังนั้นผมเข้าใจว่าทุกคนรู้จัก Service และ Controller มาอย่างดีแล้วนะครับ หรือถ้าใครเพิ่งศึกษา AngularJS ให้ลองอ่านข้อมูลบน Internet หรือลองทำ Lab ของ AngularJS ของผมก็ได้นะครับที่ <a href="http://angularjs.greanapp.com/#!/">http://angularjs.greanapp.com/#!/</a> ถ้าคล่องแล้วค่อยกลับมาอ่านเรื่อง Test ก็ยังไม่สายครับ

 
<pre class="lang:default decode:true " >// ถ้าคุณมี Global Variable สามารถ Define ง่ายแบบนี้ล่ะครับ
var IEOld = true;

describe("Hello World example ", function() {

    // Load Module App ของคุณ  ชื่อตาม App ของคุณเลยครับ
    beforeEach(module("iTopPlusApp"));
    
    // ถ้าคุณมีการ Resolve ก่อนการทำงาน route ก็ให้ Mock Provider มาใช้งานก่อนได้ครับ แต่ถ้าไม่ได้ใช้
    // ข้ามไปได้ครับชุดนี้
    beforeEach(module(function($provide) {
        $provide.value('ComponentLoad2', {
            query: {}
        });
    }));


    var ComponentCtrl,
        scope;

    // โหลด Controller ครับ  ชื่อต้องตรงนะครับ
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ComponentCtrl = $controller("ComponentCtrl", {
            $scope: scope        
     });
    }));

    // ถ้าใน Controller ของคุณกำหนด $scope.testScope = true ไว้ผลการทดสอบนี้ก็จะ Success ครับ
    // หลังจากนี้ เราจะลอง Running ดูที่หน้าจะ Karma ได้ครับ แต่ถ้าไม่ ก็แดงเทือกครับ
    // expect นี่เป็น method ในการตรวจสอบค่าที่เราต้องการควรศึกษาเพิ่มเติมที่เว็บของ Jusmine นะครับ
    it("dropzoneclass should be zoneHide", function () {
        expect(scope.testScope).toEqual(true);
    });

});</pre> 


3. ง่ายสุดล่ะขั้นตอนสุดท้าย มันจะ runfile karma.conf.js ของเราครับ และ browser chrome จะเปิดขึ้นมาซึ่งถ้าคุณต้องการ Debug ให้กดปุ่ม Debug ที่อยู่ขวาบน บนหน้าจอ Chrome แล้วจากนั้นให้คุณเปิด Console Developer Ctrl+Shift+J ก็สามารถเห็น Error และ Warning โดยที่คุณสามารถ console.log ออกมาได้ครับ ซึ่งเหมือนกับการเขียน Javascript ทั่วๆ ไป ลองรันคำสั่งด้านล่างนี้เลยนะครับ
<pre class="lang:default decode:true " >karma start </pre> 


สรุป การใข้งาน karma ค่อนข้างง่ายครับ จุดที่ยากน่าจะอยู่ที่การ mock Service ต่างๆ ที่เราเขียนมาใช้งาน ยิ่งถ้าเรามีการใช้งานพวก Dependensy Injection (DI) เยอะๆ และถ้าเราใช้มีการงาน Globalvariable การควบคุมการทดสอบยิ่งยากเข้าไปใหญ่ ดังนั้นถ้าหลีกเลี่ยงได้ก็ดีกว่าครับพวก Global Variable น่าจะลดเวลาในการเขียน Test ลงไปได้พอสมควรว่างๆ จะกลับมาเขียน Series นี้ต่อนะครับ แล้วเจอกันใหม่


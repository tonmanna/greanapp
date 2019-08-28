---
title: GraphQL ดียังไง แล้วดีกว่า Rest ยังไง
date: 2017-03-31T21:50:09
description: ก่อนอื่นต้องขอออกตัวก่อน เพิ่งใช้ GraphQL มาไม่นาน ส่วนตัวที่ใช้ กะเอามาแทน RESTful API เดิมที่เคยใช้ ซึ่งตอนเอามามาใช้ก็ Replace แทนของเดิมได้เลยคือ POST/GET ข้อดีที่เห็นชัดเลยก็ Document กับการทำ Hi
---

ก่อนอื่นต้องขอออกตัวก่อน เพิ่งใช้ GraphQL มาไม่นาน ส่วนตัวที่ใช้ กะเอามาแทน RESTful API เดิมที่เคยใช้ ซึ่งตอนเอามามาใช้ก็ Replace แทนของเดิมได้เลยคือ POST/GET ข้อดีที่เห็นชัดเลยก็ Document กับการทำ Hierarchical เรื่องการดึงข้อมูลที่ง่าย ส่วนวันนี้ผมจะมายกตัวอย่างการใช้ GraphQL กับ MySQL นะครับ

เพื่อมเติมอีกนิดเรื่อง GraphQL มันเป็นเป็นภาษาในการ Query ภาษาหนึ่งเหมาะเอามาทำ API โดยตัวมันทำงานผ่าน NodeJS เป็น Server ซึ่งจะเลือกใช้ GraphiQL หรือ RESTful ก็แล้วแต่เรา แต่ด้วยตัวมันเองไม่ใช่ Database มันต้องอาศัยการเขียนโปรแกรมเพื่อเชื่อม Database ไปอีกที่นึง สัญลักษณ์สวยงมตามท้องเรื่องสีชมพู GraphSQL นั้นถูกใช้และสร้างโดย Facebook ก่อนที่จะโอนไปเป็น Opensource ในเว็บ GraphQL.org โดยเอาไปใช้กับ FacebookMobile ปัจจุบันยังใช้อยู่หรือเปล่าอันนี้ไม่ทราบ แต่ด้วยความสามารถมันแล้วถือว่าดีมาก

<strong>ก่อนที่เราจะเริ่มต้องทำความเข้าใจ คำศัพท์ใหม่ บนเรื่องเก่าซะก่อน</strong>
1. Field -- &gt;&gt; จริงๆ ผมอยากเรียกว่า Query แต่มันก็จะทับ กับ Query ที่บน GraphQL ที่ทำหน้าที่เหมือนจะเป็น Table
2. Type -- &gt;&gt; จริงๆ ผมอยากเรียกว่า Filed แต่มันก็จะทับกับคำว่า Field ที่บน GraphQL ที่ทำหน้าที่เหมือนจะเป็น Query ซึ่งมันสามารถทำ Sub Query ได้อีกตรง Type
3. Argument --&gt;&gt; ตรงตัว มันคือ Parameter ที่ใช้

<strong>เริ่มสร้าง Project ด้วย Express generator ก็ได้ครับ</strong>
ลง Node นะครับรุ่นไหนก็ได้ครับ
<pre class="lang:default decode:true">##
สร้าง folder และ package.json ด้วย npm init และติดตั้ง express pexpress-graphql graphql

$mkdir graphql_lab
$cd graphql_lab
$npm init
$npm install express graphql express-graphql
##</pre>
ต่อไปเราก็จะลองแยก GraphQL ออกเป็น 3 ส่วนนะครับ
อันนี้เป็นการแยกเพื่อให้ดูแลรักษา Code ได้ง่ายนะครับ

- Model มีหน้าที่เก็บ Type , Argument , SQL Command
- Controller มีหน้าที่เก็บ Description ของ Query และ รายการ Query ทั้งหมดของ Controller นั้นๆ แต่ไม่เก็บ Query Command เพราะจะได้คง Concept เป็น Controller

<strong>เริ่มสร้าง Model </strong>
<pre class="lang:js decode:true">import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType
} from "graphql";  // ชนิดของ Type มีคล้ายๆ Database ทั่วไป String / Int ID  ที่ต่างหน่อยก็คง List 
export default class Province extends mySQLHelper {
    constructor() {
        super();
        this.getProvinceType = {
            "PROVINCE_ID": {
                type: GraphQLString,
                description: `id ของจังหวัด`
            },
            "PROVINCE_NAME": {
                type: GraphQLString,
                description: `ชื่อจังหวัด`
            }
        }
    }
}</pre>
เริ่มสร้าง Controller โดย นำข้อมูล import มาจาก model
<pre class="lang:default decode:true ">import model from './model';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType
} from "graphql";


export default class ProvinceCtrl {
    constructor() {
        this.schemaProvince = new GraphQLSchema({
            query: this.queryProvince()
        });
    }

    queryProvince() {
        return new GraphQLObjectType({
            name: `Query ข้อมูลจังหวัด`,
            description: `Query ข้อมูลจังหวัดทั้งประเทศไทย`,
            fields: () =&gt; ({
                getProvince: {
                    type: new GraphQLList(new GraphQLObjectType({
                        name: `getProvinceType`,
                        description: `ผลลัพธ์ข้อมูลของ Province ในประเทศไทย`,
                        fields: () =&gt; model.getProvinceType
                    })),
                    description: `ดึงค่า Province ทั้งหมด ใช้สำหรับเลือกจังหวัด`,
                    resolve: (_, args) =&gt; new Promise((resolve, reject) =&gt; {
                        var promise = model.getProvince();
                        promise.then(function(result) {
                            resolve(result);
                        });
                    })
                }
            })
        })
    }
}</pre>
สร้างไฟล์ app.js
<pre class="lang:default decode:true ">import express from 'express';
import graphqlHTTP from 'express-graphql';
import controller from 'controller';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: controller.schemaProvince,
    graphiql: true
}));

app.listen(4000);</pre>
จากนั้น บันทึกและทำการ NPM Star

&nbsp;

&nbsp;

var mysql = require("mysql")
var dayjs = require("dayjs")
var sanitizeHtml = require("sanitize-html")
var fs = require("fs")
var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "password",
  database: "greanapp",
  ssl: false,
  debug: true
})
connection.connect(err => {
  connection.query(
    'SELECT * FROM wp_posts WHERE post_status = "publish" AND post_content != ""',
    function(error, results, fields) {
      if (err) {
      } else {
        results.map(result => {
          let dirname = folderName(result)

          fs.mkdirSync(dirname)
          let filename = dirname + "/index.md"
          var content = createContent(result)
          fs.writeFileSync(filename, content)
        })
      }
      connection.end()
    }
  )
})

function folderName({ post_name, ID }) {
  var result = decodeURI(post_name).match(/[a-zA-Z0-9]+/g)  
  var pathPrefix = "../content/blog/";
  if(result!=null){
    result = result.join("")
    var path = pathPrefix + result;
    if(fs.existsSync(path) && result != undefined){
      result = path + ID;
    }else{
      result = path;
    }
  }else{
    result = pathPrefix + "P" + ID;
  }
  return result;
  
}

function createContent({ post_title, post_modified, post_content }) {
  return `---
title: ${post_title}
date: ${formatdate(post_modified)}
description: ${descriptionFiltter(post_content, 200)}
---

${fillter(post_content)}
`
}

function descriptionFiltter(post_content, max) {
  var result = sanitizeHtml(
    post_content
      .replace(/\r/, "")
      .replace(/\n/, "")
      .replace(/\r\n/, "")
      .replace(/\t/, " ")
      .trim()
      .slice(0, max),
    {
      allowedTags: ["b", "i", "em", "strong"],
    }
  )

  if (result.length == 0) {
    return descriptionFiltter(post_content, max + 200)
  } else {
    return result
  }
}

function fillter(text) {
  return text
}

function formatdate(post_modified) {
  //date: Tue Aug 05 2014 03:11:48 GMT+0700 (+07)
  // date: "2015-05-01T22:12:03.284Z"

  console.log("post_modified: ", post_modified)

  return dayjs(post_modified).format("YYYY-MM-DDTHH:mm:ss")
  // return dayjs(post_date,"DDD MMM DD YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss")
}

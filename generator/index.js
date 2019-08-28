var mysql      = require('mysql');
var connection = mysql.createConnection({
  port     : 3306,
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'greanapp',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  ssl: false,
  debug: true
});
connection.connect((err)=>{
    console.log(err);
    connection.query('SELECT * FROM wp_posts WHERE post_status = "publish" AND post_content != ""', function (error, results, fields) {        
        console.log('The solution is: ', results);
        connection.end();
      });
});




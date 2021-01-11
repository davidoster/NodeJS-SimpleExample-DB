 // require the module mysql (npm install mysql)
var http = require("http");

var mysql = require("mysql");
const { listenerCount } = require("process");

 // create the connection with the db
 // e.g. 
 /* 
    host: ra1.anystream.eu
    port: 5420
    username: cb12ptjs
    password: cb12ptjs
    database: cb12ptjs
 */

var dbhost_ra1 = {
    host: "ra1.anystream.eu",
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};
var sql = "SELECT * FROM `cb12ptjs`.`customers`;";

var con = mysql.createConnection(dbhost_ra1);

function myDBAccess() {
    var obj1;
    obj1 = con.connect(function (err) {
        let data;
        if(err) {
            console.log("Error Connecting");
        } else {
            console.log("Yeap, this is MySQL Server talking! At your Services!");
            con.query(sql, function(ee, result, fields) {
                if(err) throw err;
                // 1st Way
                // let customers = JSON.stringify(result);
                // console.log(customers);
                // console.dir(result);
                
                // 2nd Way
                // Object.keys(result).forEach(function(key) {
                //     var row = result[key];
                //     console.log(row.id);
                //     console.log(row.firstname);
                //     console.log(row.lastname);
                //     console.log(row.email);
                //     console.log(row.telephone);
                // });
                
                // 3rd Way
                data = Object.assign({}, result[0]);
                // console.log(obj1);
                // 4th Way???

                // var results = result.map(v => Object.assign({}, v));
                // console.log(results);
                // var datadiv = document.getElementById("datadiv");
                // datadiv.innerHTML = "<p>" + results + "</p>";
            });
            
            con.end(function(err) {
                console.log("Disconnected from MySQL server");
            });
        }
        return(data);
    });
    return(obj1);
}

function mySimpleText() {
    var text = "This is some text";
    return(text);
}

var server = http.createServer(function(request,response) {
    response.writeHead(200, {"Content-Type":"text/plain"});
    var dbtext = JSON.stringify(myDBAccess());
    // console.log(dbtext);
    // response.write(dbtext);
    response.write(mySimpleText());
    response.end("\nHello World");
}).listen(8088);

console.log("Server Running at http://localhost:8088/");

// How to display HTML data that come from a database without express.js?
// https://coursesweb.net/nodejs/select-mysql-output-html-table

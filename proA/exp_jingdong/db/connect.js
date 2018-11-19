var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database:'testnodejs',
    port: 3306
});
conn.connect();
conn.query('SELECT * from testtable', function(err, rows, fields) {
    if (err) throw err;
    rows.forEach(function(key) {
        console.log('The solution is: ', key.u_name);
    }, this);
});
conn.end();
/**
 * User: nadir93
 * Date: 13. 9. 13.
 * Time: 오전 10:39
 */
var oracle = require("oracle");

var connectData = { "hostname": "192.168.1.39", "user": "aap4web", "password": "aap4web1234", "database": "orcl" };
console.log('connecting : ',connectData);
oracle.connect(connectData, function (err, connection) {
    if(err)
    {
        console.log('err : ', err);
        return;
    }

    console.log('conn : ', connection);
    connection.close(); // call this when you are done with the connection
});

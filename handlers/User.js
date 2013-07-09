/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 9
 * Time: 오후 3:24
 * To change this template use File | Settings | File Templates.
 */
var User = function (name, email) {
    this.name = name;
    this.email = email;
//    this.add = function(a)
//    {
//        return a+a;
//    };
};
User.prototype.add = function (a) {
    return a + a;
};
module.exports = User;
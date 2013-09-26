/**
 * User: nadir93
 * Date: 13. 9. 23.
 * Time: 오후 6:03
 */
hashCode = function (str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

console.log('hashCode', hashCode('/test001/test.jsp'));
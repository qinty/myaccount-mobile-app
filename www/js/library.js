/**
 * Created by radudalbea on 5/14/16.
 */
function isEmailAddress(str) {
    var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean 
}

function getUser()
{
    var userInfo = localStorage.getItem('user');
    if (!userInfo) {
        return null;
    } else {
        userInfo = JSON.parse(userInfo);
    }

    return userInfo;
}


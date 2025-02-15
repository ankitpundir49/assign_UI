const keyName1="token";
const keyName2="user";
function login(obj)
{   let tokenstr=JSON.stringify(obj.token);
    localStorage.setItem(keyName1,tokenstr);
    let userstr=JSON.stringify(obj.user);
    localStorage.setItem(keyName2,userstr);
}
function logout()
{   localStorage.removeItem(keyName1);
    localStorage.removeItem(keyName2);
}
function getToken()
{   let str=localStorage.getItem(keyName1);
    let obj=str?JSON.parse(str):null;
    return obj;
}
function getUser()
{   let str=localStorage.getItem(keyName2);
    let obj=str?JSON.parse(str):null;
    return obj;
}
export default
{   login,
    logout,
    getToken,
    getUser,
}

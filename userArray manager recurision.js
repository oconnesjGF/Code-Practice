var grSysUser = new GlideRecord('sys_user');
grSysUser.addEncodedQuery("active=true^managerISNOTEMPTY");
grSysUser.query();
var userSysIDArr = [];
while (grSysUser.next()) {
    userSysIDArr.push(grSysUser.getValue('sys_id'));

}
var userIDArrLength = userSysIDArr.length - 1;

userSysIDLoop(userSysIDArr, 0); // this calls the function and passes the sysd id array and the starting point 

function userSysIDLoop(userSysIDArr, counter) {

    if (counter === userIDArrLength) {
        return;
    }
    var userSysID = userSysIDArr[counter];

    var objectString = 'outputArr[' + counter + ']["employee"]["manager"]';
    //gs.info(userSysID);


    //before userSysIDLoop increments it needs to pass in the current sys id to the manager recurse function 
    var grSysUser = new GlideRecord('sys_user');
    grSysUser.get(userSysID);
    var usersManagerID = grSysUser.getValue('manager');

    if (usersManagerID === null) {
        return outputArr;
    }
    var userFullName = grSysUser.getDisplayValue('name');
    var usersManagerName = grSysUser.getDisplayValue('manager');

    if (counter === 0) {

        outputArr.push({
            "employee": {
                "name": userFullName,
                "manager": {
                    "name": usersManagerName
                }
            }
        });
    } else {
        objectString += '["manager"]'
        eval(objectString + ' = {"name": "' + usersManagerName + '"}');

    }
    return userSysIDLoop(userSysIDArr, counter + 1)


}
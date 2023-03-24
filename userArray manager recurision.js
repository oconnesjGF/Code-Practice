function getUserRecords() {
    /*This function gets all active users that have a manager and returns an array of sys ID. Then its gets the length of the array - 1. The return statement will call the recursive function to go through each sys id */

    var grSysUser = new GlideRecord('sys_user');
    grSysUser.addEncodedQuery("active=true^managerISNOTEMPTY");
    grSysUser.query();
    var userSysIDArr = [];
    while (grSysUser.next()) {
        userSysIDArr.push(grSysUser.getValue('sys_id'));

    }
    var userIDArrLength = userSysIDArr.length - 1;
    //function ends


    function userSysIDLoop(userSysIDArr, userIDArrLength) {
        /*This function will recursively increment through the user Sys ID array and pass each sys id into the next function */
        var objectString = 'outputArr[' + counter + ']["employee"]["manager"]';

        if (counter === userIDArrLength) {
            return;
        }
        var userSysID = userSysIDArr[counter];



        grSysUser = new GlideRecord('sys_user');
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


    }
    return userSysIDLoop(userSysIDArr, userIDArrLength);

}
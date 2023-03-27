function getUserRecords() {
    /*This function gets all active users that have a manager and returns an array of sys ID. Then its gets the length of the array - 1. The return statement will call the recursive function to go through each sys id */

    var grSysUser = new GlideRecord('sys_user');
    grSysUser.addEncodedQuery("active=true^managerISNOTEMPTY");
    grSysUser.query();
    var userSysIDArr = [];
    while (grSysUser.next()) {
        userSysIDArr.push(grSysUser.getValue('sys_id'));

    }
    //function ends
    //gs.info(userSysIDArr) // this returns correclty 
    function userSysIDLoop(counterA, userSysIDArr) {
        var userIDArrLength = userSysIDArr.length - 1;
        /*This function will recursively increment through the user Sys ID array and pass each sys id into the next function */
        var objectString = 'outputArr[' + counterA + ']["employee"]["manager"]';
        if (counterA === userIDArrLength) {
            return outputArr;
        }

        var userSysID = userSysIDArr[counterA];


        function managerRecurse(userSysID, outputArr, counterB, objectString) {

            var sysUser = new GlideRecord('sys_user');
            sysUser.get(userSysID);
            var usersManagerID = sysUser.getValue('manager');

            if (usersManagerID === null) {
                return userSysIDLoop(counterA + 1, userSysIDArr);
            }
            var userFullName = sysUser.getDisplayValue('name');
            var usersManagerName = sysUser.getDisplayValue('manager');

            if (counterB === 0) {

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
            return managerRecurse(usersManagerID, outputArr, counterB + 1, objectString);
        }
        return managerRecurse(userSysID, outputArr, 0, objectString);
    }
    var outputArr = [];

    return gs.info(JSON.stringify(userSysIDLoop(0, userSysIDArr)));

}

getUserRecords();
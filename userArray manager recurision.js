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
    //gs.info(userSysIDArr) // this returns correclty 
    function userSysIDLoop(counterA) {
        /*This function will recursively increment through the user Sys ID array and pass each sys id into the next function */
        var objectString = 'outputArr[' + counterA + ']["employee"]["manager"]';
        if (counterA === userIDArrLength) {
            return outputArr;
        }
        //gs.info('counter value is: ' + counter); // this is not getting returned correctly 

        var userSysID = userSysIDArr[counter];
        //gs.info('User sys ids are: '+userSysID);

        function managerRecurse(userSysID, outputArr, counterB, objectString) {

            grSysUser = new GlideRecord('sys_user');
            grSysUser.get(userSysID);
            var usersManagerID = grSysUser.getValue('manager');

            if (usersManagerID === null) {
                return userSysIDLoop(counter) ;
            }
            var userFullName = grSysUser.getDisplayValue('name');
            var usersManagerName = grSysUser.getDisplayValue('manager');

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
            return managerRecurse(usersManagerID,outputArr, counterB +1, objectString)
        }
        return managerRecurse(userSysID,[],0,objectString);
    }
    return userSysIDLoop(0);

}

gs.info(getUserRecords())
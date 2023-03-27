function stringify(string) {
    gs.info(JSON.stringify(string));
}


function getUserRecords() {
    var sysUserGR = new GlideRecord('sys_user');
    sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
    sysUserGR.query();
    var userSysIDArr = [];
    while (sysUserGR.next()) {
        userSysIDArr.push(sysUserGR.getValue('sys_id'));

    }
    var outputArr = [];
    var managerArr = [{
        "Top Level Manager": {
            "employee": "top level manager",
            "direct reports": [{
                "employee": "name",
            }]
        }
    }];

    function passEachID(counterA, userSysIDArr, outputArr,managerArr) {
        userArrLength = userSysIDArr.length - 1;

        if (counterA === userArrLength) {
            return outputArr;
        }

        var userSysID = userSysIDArr[counterA];

        function userRecurse(userSysID, outputArr,managerArr) {
            var sysUserGR = new GlideRecord('sys_user');
            sysUserGR.get(userSysID);
            var currentUsersManagerID = sysUserGR.getValue('manager');

            if (currentUsersManagerID != null) {
                return managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr,managerArr);
            }

            function managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr,managerArr) {
                var currentUserID = currentUsersManagerID;
                sysUserGR.get(currentUserID);
                currentUsersManagerID = sysUserGR.getValue('manager');
                if (currentUsersManagerID === null) {
                    if (outputArr.indexOf(currentUserID) === -1) {
                        outputArr.push(currentUserID);
                    }
                    return passEachID(counterA + 1, userSysIDArr, outputArr, managerArr);
                }

                return managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr, managerArr)
            }
        }
        return userRecurse(userSysID, outputArr, managerArr);
    }
    return passEachID(0, userSysIDArr, outputArr, managerArr);
}

gs.info(getUserRecords());
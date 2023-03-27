function stringify(string) {
    gs.info(JSON.stringify(string));
}
var managerArr = [{
    "Top Level Manager": {
        "employee": "top level manager",
        "direct reports": [{
            "employee": "name",
        }]
    }
}];

function getUsersWithManagersRecords() {
    var sysUserGR = new GlideRecord('sys_user');
    sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
    sysUserGR.query();
    var userSysIDArr = [];
    while (sysUserGR.next()) {
        userSysIDArr.push(sysUserGR.getValue('sys_id'));

    }
    var topLevelManagersArr = [];
    

    function passEachID(counterA, userSysIDArr, topLevelManagersArr) {
        userArrLength = userSysIDArr.length - 1;

        if (counterA === userArrLength) {
            return topLevelManagersArr;
        }

        var userSysID = userSysIDArr[counterA];

        function userRecurse(userSysID, topLevelManagersArr) {
            var sysUserGR = new GlideRecord('sys_user');
            sysUserGR.get(userSysID);
            var currentUsersManagerID = sysUserGR.getValue('manager');

            if (currentUsersManagerID != null) {
                return managerRecurseCheck(sysUserGR, currentUsersManagerID, topLevelManagersArr);
            }

            function managerRecurseCheck(sysUserGR, currentUsersManagerID, topLevelManagersArr) {
                var currentUserID = currentUsersManagerID;
                sysUserGR.get(currentUserID);
                currentUsersManagerID = sysUserGR.getValue('manager');
                if (currentUsersManagerID === null) {
                    if (topLevelManagersArr.indexOf(currentUserID) === -1) {
                        topLevelManagersArr.push(currentUserID);
                    }
                    return passEachID(counterA + 1, userSysIDArr, topLevelManagersArr);
                }

                return managerRecurseCheck(sysUserGR, currentUsersManagerID, topLevelManagersArr)
            }
        }
        return userRecurse(userSysID, topLevelManagersArr);
    }
    return passEachID(0, userSysIDArr, topLevelManagersArr);
}

gs.info(getUsersWithManagersRecords());
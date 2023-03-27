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

function getUserRecords() {
    var sysUserGR = new GlideRecord('sys_user');
    sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
    sysUserGR.query();
    var userSysIDArr = [];
    while (sysUserGR.next()) {
        userSysIDArr.push(sysUserGR.getValue('sys_id'));

    }
    var outputArr = [];


    function passEachID(counterA, userSysIDArr, outputArr) {
        userArrLength = userSysIDArr.length - 1;

        if (counterA === userArrLength) {
            return outputArr;
        }

        var userSysID = userSysIDArr[counterA];

        function userRecurse(userSysID, outputArr) {
            var sysUserGR = new GlideRecord('sys_user');
            sysUserGR.get(userSysID);
            var currentUsersManagerID = sysUserGR.getValue('manager');

            if (currentUsersManagerID != null) {
                return managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr);
            }

            function managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr) {
                var currentUserID = currentUsersManagerID;
                sysUserGR.get(currentUserID);
                currentUsersManagerID = sysUserGR.getValue('manager');
                if (currentUsersManagerID === null) {
                    if (outputArr.indexOf(currentUserID) === -1) {
                        outputArr.push(currentUserID);
                    }
                    return passEachID(counterA + 1, userSysIDArr, outputArr);
                }

                return managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr)
            }
        }
        return userRecurse(userSysID, outputArr);
    }
    return passEachID(0, userSysIDArr, outputArr);
}

gs.info(getUserRecords());
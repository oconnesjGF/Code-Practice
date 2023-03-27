function stringify(string) {
    gs.info(JSON.stringify(string));
}

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
// topLevelManagersArr gets the top most users that dosent have a manager and pushes into an array 
var topLevelManagersArr = getUsersWithManagersRecords();

function reportsTo(counter, topLevelManagersArr, managerArr) {
    managerArrLength = topLevelManagersArr.length;
    var topMangerID = topLevelManagersArr[counter];


    if (counter === managerArrLength) {
        return managerArr;
    }

    managerArr.push([{
        "employee": getName(topMangerID),
        "direct reports": [{
            "employee": "name",
        }]

    }]);

    function getName(topMangerID, sysUserGR) {
        sysUserGR = new GlideRecord('sys_user');
        sysUserGR.get(topMangerID);
        return sysUserGR.getValue('name');
    }

    function findDirectReports(topMangerID, managerArr) {
        var currentManagerID = topMangerID;


        var queryString = "manager.sys_id=" + currentManagerID;
        var sysUserGR = new GlideRecord('sys_user');
        sysUserGR.addEncodedQuery(queryString);
        sysUserGR.query();
        
        while (sysUserGR.next()) {
            userSysIDArr.push(sysUserGR.getValue('sys_id'));

        }
        
        return reportsTo(counter + 1, topLevelManagersArr, managerArr)
    }
    return findDirectReports(topMangerID, managerArr)
    //return reportsTo(counter+1, topLevelManagersArr, outputArr);

}

stringify(reportsTo(0, topLevelManagersArr, []))
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
function getName(userID) {
    var sysUserGR = new GlideRecord('sys_user');
    sysUserGR.get(userID);
    return sysUserGR.getValue('name');
}

function reportsTo(counter, topLevelManagersArr, managerArr) {
    managerArrLength = topLevelManagersArr.length;
    var topMangerID = topLevelManagersArr[counter];
    //this functions goes through each id in the array and passes into the next function 

    if (counter === managerArrLength) {
        return managerArr;
    }

    managerArr.push({
        "employee": getName(topMangerID),
        "direct reports": []
    });

    function findDirectReports(topMangerID, managerArr, counter) {
        //this function does a query to find the users who manager is the currentManagerID 
        var currentManagerID = topMangerID;
        var directReportsIDArr = [];
        var queryString = "manager.sys_id=" + currentManagerID;
        var sysUserGR = new GlideRecord('sys_user');
        sysUserGR.addEncodedQuery(queryString);
        sysUserGR.query();

        while (sysUserGR.next()) {

            managerArr[counter]["direct reports"].push({
                "employee": getName(sysUserGR.getValue('sys_id'))
            })
            //directReportsIDArr.push(sysUserGR.getValue('sys_id'));

        }

        return reportsTo(counter + 1, topLevelManagersArr, managerArr)
    }
    return findDirectReports(topMangerID, managerArr, counter)
    //return reportsTo(counter+1, topLevelManagersArr, outputArr);

}
//gs.info(JSON.stringify(reportsTo(0, topLevelManagersArr, [])[0]['direct reports'][0]))
stringify(reportsTo(0, topLevelManagersArr, []))

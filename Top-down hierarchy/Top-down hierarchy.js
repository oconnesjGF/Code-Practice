var userSysIDArr = ["02826bf03710200044e0bfc8bcbe5d88", "06826bf03710200044e0bfc8bcbe5d57", "02826bf03710200044e0bfc8bcbe5d91", "5137153cc611227c000bbd1bd8cd2007", "02826bf03710200044e0bfc8bcbe5d76", "06826bf03710200044e0bfc8bcbe5d41", "02826bf03710200044e0bfc8bcbe5d64", "02826bf03710200044e0bfc8bcbe5d55", "02826bf03710200044e0bfc8bcbe5d7f", "02826bf03710200044e0bfc8bcbe5d3f", "02826bf03710200044e0bfc8bcbe5d5e", "0382abf03710200044e0bfc8bcbe5d42", "02826bf03710200044e0bfc8bcbe5d6d"];


var managerArr = [{
    "Top Level Manager": {
        "employee": "top level manager",
        "direct reports": [{
            "employee": "name",
            "direct reports": [{
                "employee": "name"
            }]
        }]
    }
}];
managerArr[0]["Top Level Manager"]


managerArr[0]["Top Level Manager"]["employee"] = "Joe";


function stringify(string) {
    gs.info(JSON.stringify(string));
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
        var userFullName = sysUserGR.getDisplayValue('name');
        var usersManagerName = sysUserGR.getDisplayValue('manager');
        //gs.info('I get here');
        //gs.info('counter is: ' + counterA)
        if (currentUsersManagerID != null) {
            //gs.info(currentUsersManagerID)
            return managerRecurseCheck(sysUserGR,currentUsersManagerID, outputArr);
        }

        function managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr) {
            var currentUserID = currentUsersManagerID;
            sysUserGR.get(currentUserID);
            currentUsersManagerID = sysUserGR.getValue('manager');
            //gs.info(currentUsersManagerID);
            if (currentUsersManagerID === null) {
                outputArr.push(sysUserGR.getDisplayValue('name'));
                return passEachID(counterA + 1, userSysIDArr, outputArr);
            }

            return managerRecurseCheck(sysUserGR, currentUsersManagerID, outputArr)
        }
    }
    return userRecurse(userSysID, outputArr);
}


gs.info(passEachID(0, userSysIDArr, outputArr));
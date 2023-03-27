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


function passEachID(counterA, userSysIDArr) {
    userArrLength = userSysIDArr.userArrLength - 1;

    if (counterA === userIDArrLength) {
        return outputArr;
    }

    var userSysID = userSysIDArr[counterA];

    function userRecurse(userSysID, outputArr, counterB) {
        var sysUserGR = new GlideRecord('sys_user');
        sysUserGR.get(userSysID);
        var usersManagerID = sysUserGR.getValue('manager');
        var userFullName = sysUserGR.getDisplayValue('name');
        var usersManagerName = sysUserGR.getDisplayValue('manager');

        if (usersManagerID != null) {

            return managerCheck(sysUserGR,usersManagerID);
        }
        function managerCheck(sysUserGR,usersManagerID){
            if(usersManagerID === null){
                return passEachID(counterA+1,userSysIDArr);
            }
        }
    }

}




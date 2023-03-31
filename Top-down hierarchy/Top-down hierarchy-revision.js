function stringifyOutput(string) {
    gs.info(JSON.stringify(string));
}

function getUsersWithManagersRecords() {
    //getUsersWithManagersRecords() gets all records where users have managers
    var sysUserGR = new GlideRecord("sys_user");
    sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
    sysUserGR.query();
    var userObjectArr = [];
        var usersManagerID = sysUserGR.getValue('manager');

    while (sysUserGR.next()) {
        userObjectArr.push({
            sys_id: sysUserGR.getValue("sys_id"),
            name: sysUserGR.getValue("name"),
            parentID: sysUserGR.getValue('manager'),
            parentName: sysUserGR.getDisplayValue('manager')
        });
    };
    
    stringifyOutput(userObjectArr)
/*
    userObjectArr.forEach(function (elment) {
        sysUserGR = new GlideRecord("sys_user");
        sysUserGR.get(elment);
        var usersManagerID = sysUserGR.getValue('manager');
        var userFullName = sysUserGR.getDisplayValue('name');
        var usersManagerName = sysUserGR.getDisplayValue('manager');

        if(userObjectArr.indexOf(elment.sys_id,0) === -1){
            stringifyOutput(elment)
        }


    })
*/
}

getUsersWithManagersRecords()
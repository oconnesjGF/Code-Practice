function stringifyOutput(string) {
    gs.info(JSON.stringify(string));
}

function getUsersWithManagersRecords() {
    //getUsersWithManagersRecords() gets all records where users have managers
    var sysUserGR = new GlideRecord("sys_user");
    sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
    sysUserGR.query();
    var userObjectArr = [];

    while (sysUserGR.next()) {
        userObjectArr.push({
            sys_id: sysUserGR.getValue("sys_id"),
            name: sysUserGR.getValue("name"),
            managerID: sysUserGR.getValue('manager'),
            managerName: sysUserGR.getDisplayValue('manager'),
            direct_reports: []
        });
    };



        filterManagerID = userObjectArr.filter(function (element) {
            return element.managerID != undefined || null;
        }).map(function (user) {
            return user.managerID
        });
    

    var outputArr = [];

    function getManagers(filterManagerID, outputArr) {

        if (outputArr.length > 0) {
            filterManagerID = outputArr.filter(function (element) {
                return element.managerID != undefined || null;
            }).map(function (user) {
                return user.managerID
            })
        }


        var managerIDArr = filterManagerID;
        if (managerIDArr.length === 0) {
            return outputArr;
        }
        managerIDArr.forEach(function (element) {
            sysUserGR = new GlideRecord("sys_user");
            sysUserGR.get(element);
            var currentUserManagerID = sysUserGR.getValue('manager')
            if (currentUserManagerID != null) {
                outputArr.push({
                    sys_id: element,
                    name: sysUserGR.getValue("name"),
                    managerID: sysUserGR.getValue('manager'),
                    managerName: sysUserGR.getDisplayValue('manager'),
                    direct_reports: []
                });
            }
            if (currentUserManagerID === null) {
                outputArr.push({
                    sys_id: element,
                    name: sysUserGR.getValue("name"),
                    managerID: null,
                    managerName: null,
                    direct_reports: []
                });
            }
        });
        return getManagers(filterManagerID, outputArr);
    }

    return getManagers(filterManagerID, outputArr);
}

stringifyOutput(getUsersWithManagersRecords());
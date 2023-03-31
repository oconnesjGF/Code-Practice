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



        filterManagerIDArr = userObjectArr.filter(function (element) {
            return element.managerID != undefined || null;
        }).map(function (user) {
            return user.managerID
        });
    

    var outputArr = [];

    function getManagers(filterManagerIDArr, outputArr) {
        var managerIDArr = filterManagerIDArr;

        if (managerIDArr.length > 0) {
            managerIDArr = outputArr.filter(function (element) {
                return element.managerID != undefined || null;
            }).map(function (user) {
                return user.managerID
            })
        }


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
        return getManagers(filterManagerIDArr, outputArr);
    }

    return getManagers(filterManagerIDArr, outputArr);
}

stringifyOutput(getUsersWithManagersRecords());
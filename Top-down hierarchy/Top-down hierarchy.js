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
    
}



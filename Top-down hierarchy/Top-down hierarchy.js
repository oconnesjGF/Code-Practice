function stringify(string) {
  gs.info(JSON.stringify(string));
}

function getUserManager(sys_id) {
  var sysUserGR = new GlideRecord("sys_user");
  sysUserGR.get(sys_id);
  return sysUserGR.getValue("manager");
}

function getUsersWithManagersRecords() {
  var sysUserGR = new GlideRecord("sys_user");
  sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
  sysUserGR.query();
  var userSysIDArr = [];

  while (sysUserGR.next()) {
    userSysIDArr.push({
      sys_id: sysUserGR.getValue("sys_id"),
      name: sysUserGR.getValue("name"),
      managerID: getUserManagers(sysUserGR.getValue("sys_id")),
    });
  }

  return userSysIDArr;
}

stringify(getUsersWithManagersRecord());

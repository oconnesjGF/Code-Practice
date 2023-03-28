function stringify(string) {
    gs.info(JSON.stringify(string));
  }
  
  function getUserInfo(sys_id, value) {
    var sysUserGR = new GlideRecord("sys_user");
    sysUserGR.get(sys_id);
    return sysUserGR.getValue(value);
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
        managerID: getUserInfo(sysUserGR.manager.getValue("sys_id"), "sys_id"),
        managerName: getUserInfo(sysUserGR.manager.getValue("sys_id"), "name"),
      });
    }
  
    function getManagers(userSysIDArr, counter) {
     // var userArrLength = userSysIDArr.length - 1;
      
      var currentManagerID = userSysIDArr[counter].managerID;
      if(getUserInfo(currentManagerID, "manager") === "null"){
          return getManagers(userSysIDArr, counter+1);
      }
  
      userSysIDArr.push({
          sys_id: getUserInfo(currentManagerID, "sys_id"),
          name: getUserInfo(currentManagerID, "name"),
          managerID: getUserInfo(currentManagerID, "manager"),
        //  managerName: getUserInfo(currentManagerID, "manager").name,
        });
  
        return userSysIDArr;
    }
    return getManagers(userSysIDArr, 0);
  }
  
  stringify(getUsersWithManagersRecords());
  
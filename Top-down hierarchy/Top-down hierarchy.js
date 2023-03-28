function stringify(string) {
  gs.info(JSON.stringify(string));
}


function getUsersWithManagersRecords() {
  //getUsersWithManagersRecords() gets all records where users have managers
  var sysUserGR = new GlideRecord("sys_user");
  sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
  sysUserGR.query();
  var userSysIDArr = [];

  while (sysUserGR.next()) {
    userSysIDArr.push(sysUserGR.getValue("sys_id"))
  };
//while loop pushes sys ids into array
  function userSysIDLoop(counterA, userSysIDArr) {
    var userIDArrLength = userSysIDArr.length - 1;
    if (counterA === userIDArrLength) {
      return outputArr;
    }
    //userSysIDLoop steps through each id in the array and passes it into the next function
    var userSysID = userSysIDArr[counterA];

    function managerRecurse(userSysID, outputArr) {

      var sysUser = new GlideRecord('sys_user');
      sysUser.get(userSysID);
      var usersManagerID = sysUser.getValue('manager');
      var userFullName = sysUser.getDisplayValue('name');
      var usersManagerName = sysUser.getDisplayValue('manager');
      
      if (usersManagerID === null) {
        return userSysIDLoop(counterA + 1, userSysIDArr);
      }




    }
  }
}

stringify(getUsersWithManagersRecords());
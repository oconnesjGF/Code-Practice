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


  function userSysIDLoop(counterA, userSysIDArr, objectArr) {
    var userIDArrLength = userSysIDArr.length - 1;

    if (counterA === userIDArrLength) {
      return objectArr;
    }
    var userSysID = userSysIDArr[counterA];

    /*userSysIDLoop recursively gets each sys id in the array
     and passes it in the next function.*/
    
    
    function managerRecurse(userSysID,objectArr) {

      var sysUser = new GlideRecord('sys_user');
      sysUser.get(userSysID);
      var usersManagerID = sysUser.getValue('manager');
      var userFullName = sysUser.getDisplayValue('name');
      var usersManagerName = sysUser.getDisplayValue('manager');
      
      if(usersManagerID === null){
        objectArr.push({
          sys_id: userSysID,
          name: userFullName,
          managerID: null,
          managerName: null
        })
        return userSysIDLoop(counterA+1, userSysIDArr, objectArr);

      }


      objectArr.push({
        sys_id: userSysID,
        name: userFullName,
        managerID: usersManagerID,
        managerName: usersManagerName
      })

      return userSysIDLoop(counterA+1, userSysIDArr, objectArr);

    }

    return managerRecurse(userSysID,objectArr);
  }
  return(userSysIDLoop(0,userSysIDArr,[]));
}

stringify(getUsersWithManagersRecords());
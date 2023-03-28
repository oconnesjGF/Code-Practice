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
    var userIDArrLength = userSysIDArr.length;

    if (counterA === userIDArrLength) {
      return objectArr;
    }
    var userSysID = userSysIDArr[counterA];

    /*userSysIDLoop recursively gets each sys id in the array
     and passes it in the next function.*/


    function managerRecurse(userSysID, objectArr) {

      var sysUser = new GlideRecord('sys_user');
      sysUser.get(userSysID);
      var usersManagerID = sysUser.getValue('manager');
      var userFullName = sysUser.getDisplayValue('name');
      var usersManagerName = sysUser.getDisplayValue('manager');

      if (usersManagerID === null) {
        objectArr.push({
          sys_id: userSysID,
          name: userFullName,
          managerID: null,
          managerName: null
        })
        return userSysIDLoop(counterA + 1, userSysIDArr, objectArr);

      }


      objectArr.push({
        sys_id: userSysID,
        name: userFullName,
        managerID: usersManagerID,
        managerName: usersManagerName
      })

      return userSysIDLoop(counterA + 1, userSysIDArr, objectArr);

    }

    return managerRecurse(userSysID, objectArr);
  }
  return (userSysIDLoop(0, userSysIDArr, []));
}

var objectArr = getUsersWithManagersRecords();



function checkValues(objectArr, counterB, counterC) {
  var objectArrLength = objectArr.length;
  var userSysID = objectArr[counterB].managerID;
  var sysUser = new GlideRecord('sys_user');
  sysUser.get(userSysID);
  var usersManagerID = sysUser.getValue('manager');
  var userFullName = sysUser.getDisplayValue('name');
  var usersManagerName = sysUser.getDisplayValue('manager');

  if (counterB === objectArrLength) {
    return objectArr;
  }

  if (counterC === objectArrLength) {
    //testArr.push(objectArr[counterB].managerID);
    if (userSysID != null) {

      if (usersManagerID === null) {
        objectArr.push({
          sys_id: userSysID,
          name: userFullName,
          managerID: null,
          managerName: null
        })
      } else {

        objectArr.push({
          sys_id: userSysID,
          name: userFullName,
          managerID: usersManagerID,
          managerName: usersManagerName
        })
      }
    }

    return checkValues(objectArr, counterB + 1, 0)

  }

  if (objectArr[counterB].managerID === objectArr[counterC].sys_id) {
    return checkValues(objectArr, counterB + 1, 0)
  }
  return checkValues(objectArr, counterB, counterC + 1)

}
stringify(checkValues(objectArr, 0, 0));
function stringifyOutput(string) {
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
  // This is the end of the first recursion loop
}

var objectArr = getUsersWithManagersRecords();


function checkValues(objectArr, counterB, counterC) {
  var objectArrLength = objectArr.length;
  var currentManagerSysID = objectArr[counterB].managerID;
  var sysUser = new GlideRecord('sys_user');
  sysUser.get(currentManagerSysID);
  var usersManagerID = sysUser.getValue('manager');
  var userFullName = sysUser.getDisplayValue('name');
  var usersManagerName = sysUser.getDisplayValue('manager');

  /*
    The main logic of this function works by first passing in a managerID from the array
    and checking if the mangerID equals the sys_id property in any 
    of the objects in the array. If a match is found, the function is called again 
    with the next object in the array. If no match is found, the function is called again
    with counterC incremented. Once counterC is equal to the length of the objectArr 
    it will do an additional check to see if the currentManagerSysID value is null 
    to prevent empty records from being pushed. It will then check if the current sysID has a manager or not. 
    Once the function has gone through each managerID in the array, it will stop the recursion and return the results.
  */

  if (counterB === objectArrLength) {
    return objectArr;
  }

  if (counterC === objectArrLength) {
    if (currentManagerSysID != null) {
      if (usersManagerID === null) {
        objectArr.push({
          sys_id: currentManagerSysID,
          name: userFullName,
          managerID: null,
          managerName: null
        })
      } else {
        objectArr.push({
          sys_id: currentManagerSysID,
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

var unsortedArr = checkValues(objectArr, 0, 0);


var groupedArr = unsortedArr.reduce(function (result, current) {
  if (current.managerName !== null) {
    if (!result[current.managerName]) {
      result[current.managerName] = {
        direct_reports: []
      };
    }
    result[current.managerName].direct_reports.push({
      name: current.name
    });
  }
  return result;
}, {});

groupedArr = {
  "Employee Hierarchy": groupedArr
};
stringifyOutput(groupedArr);
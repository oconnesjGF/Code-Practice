function managerRecurse(userSysID, outputArr, counter) {
  var grSysUser = new GlideRecord('sys_user');
  grSysUser.get(userSysID);
  var usersManagerID = grSysUser.getValue('manager');
  if (usersManagerID === null) {
    return outputArr;
  }

  var userFullName = grSysUser.getDisplayValue('name');
  var usersManagerName = grSysUser.getDisplayValue('manager');

  if (counter === 0) {

    outputArr.push({
      "employee": {
        "name": userFullName,
        "manager": {
          "name": usersManagerName
        }
      }
    })
  } else {

    var managerObject = 'outputArr[0]["employee"]["manager"]';

    function addManager(managerName, managerObject) {
      var newManagerObject = managerObject + '["manager"]';
      eval(newManagerObject + ' = {"name": "' + managerName + '"}');
      return newManagerObject;
    }
    managerObject = addManager(userFullName, managerObject);

  }
  return managerRecurse(usersManagerID, outputArr, counter + 1);

}



var resultArr = managerRecurse('02826bf03710200044e0bfc8bcbe5d88', [],0);
gs.info(JSON.stringify(resultArr));
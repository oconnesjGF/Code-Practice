var objectString = 'outputArr[0]["employee"]["manager"]';

function managerRecurse(userSysID, outputArr, counter, objectString) {
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
    });
  } else {
    objectString += '["manager"]'
    eval(objectString + ' = {"name": "' + usersManagerName + '"}');

  }
  return managerRecurse(usersManagerID, outputArr, counter + 1, objectString);

};



var resultArr = managerRecurse('02826bf03710200044e0bfc8bcbe5d88', [], 0, objectString);
gs.info(JSON.stringify(resultArr));
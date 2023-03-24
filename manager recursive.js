function managerRecurse(userSysID, outputArr) {
  var grSysUser = new GlideRecord('sys_user');
  grSysUser.get(userSysID);

  var usersManagerID = grSysUser.getValue('manager');
  if (usersManagerID === null) {
    return outputArr;
  }

  var userFullName = grSysUser.getDisplayValue('name');
  var usersManagerName = grSysUser.getDisplayValue('manager');

  outputArr.push({employee:userFullName, userManager:{name:usersManagerName}});

  return managerRecurse(usersManagerID,outputArr);

}



var resultArr = managerRecurse('02826bf03710200044e0bfc8bcbe5d88',[]);
gs.info(JSON.stringify(resultArr));
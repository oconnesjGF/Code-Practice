function getUserRecords() {

  var grSysUser = new GlideRecord('sys_user');
  grSysUser.addEncodedQuery("active=true^managerISNOTEMPTY");
  grSysUser.query();
  var userSysIDArr = [];
  while (grSysUser.next()) {
    userSysIDArr.push(grSysUser.getValue('sys_id'));

  }
  var userIDArrLength = userSysIDArr.length - 1;

  function userSysIDLoop(userSysIDArr, userIDArrLength) {
    var objectString = 'outputArr[' + counter + ']["employee"]["manager"]';

    if (counter === userIDArrLength) {
      return;
    }
    var userSysID = userSysIDArr[counter];



    grSysUser = new GlideRecord('sys_user');
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


  }
  return userSysIDLoop(userSysIDArr, userIDArrLength);

}
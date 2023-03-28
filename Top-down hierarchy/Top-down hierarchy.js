function stringify(string) {
  gs.info(JSON.stringify(string));
}

function getUserInfo(sysID, value){
    var sysUserGR = new GlideRecord("sys_user");

}

function getUsersWithManagersRecords() {
  var sysUserGR = new GlideRecord("sys_user");
  sysUserGR.addEncodedQuery("active=true^managerISNOTEMPTY");
  sysUserGR.query();
  var userSysIDArr = [];


  while (sysUserGR.next()) {
    userSysIDArr.push({
        sys_id: 
    });
  }

  function passEachID(counterA, userSysIDArr, topLevelManagersArr) {
    userArrLength = userSysIDArr.length - 1;
    if (counterA === userArrLength) {
      return topLevelManagersArr;
    }

    var userSysID = userSysIDArr[counterA];

    function userRecurse(userSysID, topLevelManagersArr) {
      var sysUserGR = new GlideRecord("sys_user");
      sysUserGR.get(userSysID);
      var currentUsersManagerID = sysUserGR.getValue("manager");
    }
  }
}

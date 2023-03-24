var grSysUser = new GlideRecord('sys_user');
grSysUser.addEncodedQuery("active=true^managerISNOTEMPTY");
grSysUser.query();
var userSysIDArr = [];
while (grSysUser.next()) {
     userSysIDArr.push(grSysUser.getValue('sys_id'));
   
}
//gs.info(userSysIDArr);
  //var objectString = 'outputArr['+ arrCounter + ']["employee"]["manager"]';

    var userIDArrLength = userSysIDArr.length-1;

//gs.info(userSysIDArr[userIDArrLength])

function userSysIDLoop(userSysIDArr,counter){
   // gs.info(userIDArrLength)
    gs.info('counter is: ' +counter);

    if(counter === userIDArrLength){
        return;
    }
    //gs.info(userSysIDArr[counter])
    userSysIDLoop(userSysIDArr,counter+1)
}


gs.info(userSysIDLoop(userSysIDArr,0))


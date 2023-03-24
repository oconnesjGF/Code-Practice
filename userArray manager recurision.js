var grSysUser = new GlideRecord('sys_user');
grSysUser.addEncodedQuery("active=true^managerISNOTEMPTY");
grSysUser.query();
var userSysIDArr = [];
while (grSysUser.next()) {
    userSysIDArr.push(grSysUser.getValue('sys_id'));

}

var userIDArrLength = userSysIDArr.length - 1;


function userSysIDLoop(userSysIDArr, counter) {

    if (counter === userIDArrLength) {
        return;
    }
    var userSysID = userSysIDArr[counter];

    var objectString = 'outputArr[' + counter + ']["employee"]["manager"]';
    gs.info(userSysID);
    userSysIDLoop(userSysIDArr, counter + 1)


    
}
userSysIDLoop(userSysIDArr, 0)


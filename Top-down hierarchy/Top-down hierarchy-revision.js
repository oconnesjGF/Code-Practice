function stringifyOutput(string) {
    gs.info(JSON.stringify(string));
}


    //getUsersWithManagersRecords() gets all records where users have managers
    var sysUserGR = new GlideRecord("sys_user");
    sysUserGR.addEncodedQuery("active=true");
    sysUserGR.query();
    var userObjectArr = [];

    while (sysUserGR.next()) {
        userObjectArr.push({
            sys_id: sysUserGR.getValue("sys_id"),
            name: sysUserGR.getValue("name"),
            managerID: sysUserGR.getValue('manager'),
            managerName: sysUserGR.getDisplayValue('manager'),
            direct_reports: []
        });
    };

var usersWithManager = userObjectArr.filter(function(element){
     return element.managerID !== null
    
})

var usersWithoutManager = userObjectArr.filter(function(element){
     return element.managerID === null
    
})


var test = usersWithoutManager.forEach(function(element,i){
    for(var blah in element){
      gs.log(i+': ' + blah + ': ' + element[blah])  
    }
})

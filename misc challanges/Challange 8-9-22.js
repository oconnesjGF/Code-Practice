/*
create a function that takes a role sys_id as an input and gives 
an output of an array of group sys_ids that the role is a part of 
where the group does not have any members
*/

gs.info(findNonGroupMember("e098ecf6c0a80165002aaec84d906014"));

function findNonGroupMember(input) {
  //var input = "e098ecf6c0a80165002aaec84d906014";
  var queryString = "role=" + input;
  var groupOutputArr = [];
  var groupOutputArr2 = [];

  var grSGHR = new GlideRecord("sys_group_has_role");
  grSGHR.addEncodedQuery(queryString);

  grSGHR.query();
  while (grSGHR.next()) {
    groupOutputArr.push(grSGHR.group.toString());
  }

  var grSUGM = new GlideRecord("sys_user_grmember");
  var queryString2 = "group=" + groupOutputArr.join("^ORgroup=");
  grSUGM.addEncodedQuery(queryString2);
  grSUGM.query();
  while (grSUGM.next()) {
    groupOutputArr2.push(grSUGM.group.toString());
  }
  var arrayUtil = new ArrayUtil();
  groupOutputArr2 = arrayUtil.unique(groupOutputArr2);

  var result = arrayUtil.diff(groupOutputArr, groupOutputArr2);
  return result;
}
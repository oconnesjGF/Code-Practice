gs.info(findGroupsDontContainRole("62826bf03710200044e0bfc8bcbe5df1"));
​
function findGroupsDontContainRole(input) {
  //var input = "62826bf03710200044e0bfc8bcbe5df1"; // Abel Tuter
  var grSUHR = new GlideRecord("sys_user_has_role");
  var queryString = "user=" + input;
  var userRoles = [];
  grSUHR.addEncodedQuery(queryString);
  grSUHR.query();
  while (grSUHR.next()) {
    userRoles.push(grSUHR.role.toString());
  }
  // Abel turter has 35 roles
​
  var grSGHR = new GlideRecord("sys_group_has_role");
  var queryString2 = "role=" + userRoles.join("^ORrole=");
  var groupContainsRole = [];
  grSGHR.addEncodedQuery(queryString2);
  grSGHR.query();
  while (grSGHR.next()) {
    groupContainsRole.push(grSGHR.role.toString());
  }
​
  var arrayUtil = new ArrayUtil();
  groupContainsRole = arrayUtil.unique(groupContainsRole);
​
  var roleIsNotPartOfGroup = arrayUtil.diff(userRoles, groupContainsRole);
  return roleIsNotPartOfGroup;
}
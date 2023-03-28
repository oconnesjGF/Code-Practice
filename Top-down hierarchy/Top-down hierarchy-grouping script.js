var objectTest = [{"sys_id":"02826bf03710200044e0bfc8bcbe5d5e","name":"Melinda Carleton","managerID":"02826bf03710200044e0bfc8bcbe5d3f","managerName":"Lucius Bagnoli"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d64","name":"Jewel Agresta","managerID":"02826bf03710200044e0bfc8bcbe5d3f","managerName":"Lucius Bagnoli"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d88","name":"Billie Cowley","managerID":"02826bf03710200044e0bfc8bcbe5d7f","managerName":"Krystle Stika"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d3f","name":"Lucius Bagnoli","managerID":"02826bf03710200044e0bfc8bcbe5d88","managerName":"Billie Cowley"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d7f","name":"Krystle Stika","managerID":"06826bf03710200044e0bfc8bcbe5d41","managerName":"Jess Assad"},{"sys_id":"0382abf03710200044e0bfc8bcbe5d42","name":"Naomi Greenly","managerID":"06826bf03710200044e0bfc8bcbe5d41","managerName":"Jess Assad"},{"sys_id":"06826bf03710200044e0bfc8bcbe5d41","name":"Jess Assad","managerID":"06826bf03710200044e0bfc8bcbe5d57","managerName":"Cherie Fuhri"},{"sys_id":"06826bf03710200044e0bfc8bcbe5d57","name":"Cherie Fuhri","managerID":"06826bf03710200044e0bfc8bcbe5d66","managerName":"Geri Forness"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d55","name":"Jimmie Barninger","managerID":"06826bf03710200044e0bfc8bcbe5d81","managerName":"Justina Dragaj"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d76","name":"Jacinto Gawron","managerID":"06826bf03710200044e0bfc8bcbe5d93","managerName":"Bridget Knightly"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d6d","name":"Sean Bonnet","managerID":"0e826bf03710200044e0bfc8bcbe5d61","managerName":"Logan Muhl"},{"sys_id":"5137153cc611227c000bbd1bd8cd2007","name":"David Loo","managerID":"46c6f9efa9fe198101ddf5eed9adf6e7","managerName":"Bud Richman"},{"sys_id":"02826bf03710200044e0bfc8bcbe5d91","name":"Christian Marnell","managerID":"fd826bf03710200044e0bfc8bcbe5d39","managerName":"Janice Twiet"},{"sys_id":"06826bf03710200044e0bfc8bcbe5d66","name":"Geri Forness","managerID":null,"managerName":null},{"sys_id":"06826bf03710200044e0bfc8bcbe5d81","name":"Justina Dragaj","managerID":null,"managerName":null},{"sys_id":"06826bf03710200044e0bfc8bcbe5d93","name":"Bridget Knightly","managerID":null,"managerName":null},{"sys_id":"0e826bf03710200044e0bfc8bcbe5d61","name":"Logan Muhl","managerID":null,"managerName":null},{"sys_id":"46c6f9efa9fe198101ddf5eed9adf6e7","name":"Bud Richman","managerID":null,"managerName":null},{"sys_id":"fd826bf03710200044e0bfc8bcbe5d39","name":"Janice Twiet","managerID":null,"managerName":null}];

function stringify(string) {
  gs.info(JSON.stringify(string));
}
var grouped = objectTest.reduce(function(result, current) {
  if (current.managerName !== null) {
    if (!result[current.managerName]) {
      result[current.managerName] = { direct_reports: [] };
    }
    result[current.managerName].direct_reports.push({employee:current.name});
  }
  return result;
}, {});


stringify(grouped)
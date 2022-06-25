
const modulesPermissions =
  JSON.parse(localStorage.getItem("permissions")) || [];
  console.log(modulesPermissions);
 function checkPermission(permissionName, module) {
    if (module !== "") {
      const checkData = permissionName + "|" + module;
      if (modulesPermissions.length > 0) {
        let match = 0;
        modulesPermissions.forEach((el) => {
          if (el.name === checkData) {
            match++;
          }
        });
        if (match === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

export default checkPermission;
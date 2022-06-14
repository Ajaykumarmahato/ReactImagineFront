import React from "react";


function checkPermission(permissionName,Module){
    let permissions=localStorage.getItem('permissions');
    if(permissions.includes(permissionName+'|'+Module)){
        return true;
    }else{
        return false;
    }
}

export default checkPermission;
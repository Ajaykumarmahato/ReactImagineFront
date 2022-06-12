


export const checkPermission=(permissionName,Module)=>{
    let permissions=localStorage.getItem('permissions');
    if(permissions.includes(permissionName+'|'+Module)){
        return true;
    }else{
        return false;
    }
}
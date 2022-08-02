export const serverLocation = "http://127.0.0.1:8001/api";
  

export const fileUrl = "http://127.0.0.1:8001/storage";

export const pagination=10;

export const URL = {
    registerUser:`${serverLocation}/free/register-user`,
    login:`${serverLocation}/free/login`,
    logout:`${serverLocation}/auth/logout`,




    // modules
    modules:`${serverLocation}/free/modules`,

    // categories
    categories:`${serverLocation}/auth/categories`,
    storeCategory:`${serverLocation}/auth/categories/store`,
    deleteCategory:`${serverLocation}/auth/categories/delete`,
    searchCategory:`${serverLocation}/auth/categories/search`,
    getAllCategories:`${serverLocation}/auth/categories/get-all-categories`,

    // roles
    roles:`${serverLocation}/auth/roles`,
    editRolePermissions:`${serverLocation}/auth/roles/edit-role-permissions`,
    deleteRole:`${serverLocation}/auth/roles/delete`,
    searchRole:`${serverLocation}/auth/roles/search`,


    // permissions
    permissions:`${serverLocation}/auth/permissions`,
    modulePermissions:`${serverLocation}/auth/permissions/module-permissions`,
    moduleRolePermissions:`${serverLocation}/auth/permissions/module-role-permission`,

    // nominal-accounts
    insertNominalAccounts:`${serverLocation}/auth/nominal-accounts/store`,
    nominalAccounts:`${serverLocation}/auth/nominal-accounts`,
   
};


export const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")} `,
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Client-Ip": localStorage.getItem("my_ip"),
  };
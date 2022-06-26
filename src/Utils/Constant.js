export const serverLocation = "http://127.0.0.1:8001/api";
  

export const fileUrl = "http://127.0.0.1:8001/storage";



export const URL = {
    registerUser:`${serverLocation}/free/register-user`,
    login:`${serverLocation}/free/login`,




    // modules
    modules:`${serverLocation}/free/modules`,

    // categories
    categories:`${serverLocation}/auth/categories`,
    deleteCategory:`${serverLocation}/auth/categories/delete`,
};


export const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")} `,
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Client-Ip": localStorage.getItem("my_ip"),
  };
import React, { useEffect, useState } from "react";
import WindowModal from "../WindowModal/WindowModal";
import CategoryDetail from "./CategoryDetail";
import CategoryForm from "./CategoryForm";
import Swal from "sweetalert2";
import SideBar from "../Sidebar/SideBar";
import { fileUrl, URL } from "../../Utils/Constant";
import { axiosGet } from "../../Utils/AxiosApi";
import swal from "sweetalert";
function Category(){

  const [addCategoryModalOpen,setAddCategoryModalOpen]=useState(false);
  const [detailCategoryModalOpen,setDetailCategoryModalOpen]=useState(false);
  const [categoryDetail,setCategoryDetail]=useState("");
  const [categories,setCategories]=useState([]);



  useEffect(()=>{
    getCategories();
  },[])

  const toggleAddCategory = () => {
    setAddCategoryModalOpen(!addCategoryModalOpen);
  };

  const toggleDetailCategory = (category) => {
    setDetailCategoryModalOpen(!detailCategoryModalOpen);
    setCategoryDetail(category);
  };

  const getCategories=()=>{
    axiosGet(URL.categories,(response)=>{
      if(response.data.success){
        debugger;
        setCategories(response.data.data.items)
      }
    },(error)=>{

    })
  }

  const deleteCategory = (id) => {
    debugger;
    swal({
      title: "Warning",
      text:
        "Are you sure you want to delete this record.",
      icon: "error",
      dangerMode: true,
      closeOnClickOutside: false,
      outsideClick: false,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((willDelete) => {
      if (willDelete) {
        axiosGet(`${URL.deleteCategory}/${id}`,(response)=>{
          if(response.data.success){
            swal('Success',response.data.message,'success');
            getCategories();
          }
        },
        (error)=>{

        })

      }else{
        swal('Info','Your record is safe','info');
      }
    });
  };

    return (
      <>
        <div className="landing">
          <button
            className="btn btn-primary m-4"
            onClick={toggleAddCategory}
          >
            Add Category
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length>0?(
                categories.map((category, idx) => {
                return (
                  <>
                    <tr>
                      <th>{idx + 1}</th>
                      <td>{category.media.length>0?(
                       <>
                       <img className="img-fluid image" src={fileUrl+'/'+category.media[0].id+'/'+category.media[0].file_name}/>
                       </>
                      ):<>-</>}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        <button
                          className="btn btn-success mr-3"
                          onClick={()=>toggleDetailCategory(category)}
                        >
                          Details
                        </button>
                        <button className="btn btn-warning mr-2 ">Edit</button>
                        <button
                          className="btn btn-danger mr-2"
                          onClick={()=>deleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
              ):null}
              
            </tbody>
          </table>
        </div>

        {/* add category modal start */}
        <WindowModal
          titleModal="Add Category"
          openModal={addCategoryModalOpen}
          toggleModal={toggleAddCategory}
          footerModal={null}
          bodyModal={
            <>
              <CategoryForm getCategories={getCategories} toggleAddCategory={toggleAddCategory}/>
            </>
          }
        />
        {/* add category modal end */}

        {/* category detail modal start */}
        <WindowModal
          titleModal={categoryDetail.name}
          openModal={detailCategoryModalOpen}
          toggleModal={toggleDetailCategory}
          footerModal={null}
          bodyModal={
            <>
              <CategoryDetail category={categoryDetail} />
            </>
          }
        />
        {/* category detail modal end */}
      </>
    );
}
export default Category;

import React, { useEffect, useState } from "react";
import WindowModal from "../WindowModal/WindowModal";
import CategoryDetail from "./CategoryDetail";
import CategoryForm from "./CategoryForm";
import Swal from "sweetalert2";
import SideBar from "../Sidebar/SideBar";
import { fileUrl, URL } from "../../Utils/Constant";
import { axiosGet } from "../../Utils/AxiosApi";
import swal from "sweetalert";
import { RiDeleteBin7Line,RiAddCircleLine,RiEditBoxLine} from "react-icons/ri";
import { TbListDetails} from "react-icons/tb";
import SmallSpinner from "../Spinner/SmallSpinner";

function Category(){

  const [addCategoryModalOpen,setAddCategoryModalOpen]=useState(false);
  const [detailCategoryModalOpen,setDetailCategoryModalOpen]=useState(false);
  const [categoryDetail,setCategoryDetail]=useState("");
  const [categories,setCategories]=useState([]);
  const [spinner,setSpinner]=useState(true);



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
        setCategories(response.data.data.items);
        setSpinner(false);
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
            Add <RiAddCircleLine title="Add" className="add-icon"/>
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
              {spinner?(
                  <SmallSpinner/>
              ):null}
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
                        <TbListDetails title="view" className="detail-icon"  onClick={()=>toggleDetailCategory(category)}/>
                        {/* <RiEditBoxLine title="edit" className="edit-icon"/> */}
                        <RiDeleteBin7Line title="delete" className="delete-icon" onClick={()=>deleteCategory(category.id)} />
                      </td>
                    </tr>
                  </>
                );
              })
              ):<tr>
                No records...
                </tr>}
              
            </tbody>
          </table>
        </div>

        {/* add category modal start */}
        <WindowModal
          size={'lg'}
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
          size={'md'}
          titleModal={categoryDetail.name}
          openModal={detailCategoryModalOpen}
          toggleModal={()=>toggleDetailCategory("")}
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

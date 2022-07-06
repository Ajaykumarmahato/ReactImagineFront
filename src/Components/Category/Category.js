import React, { useEffect, useState } from "react";
import WindowModal from "../WindowModal/WindowModal";
import CategoryDetail from "./CategoryDetail";
import CategoryForm from "./CategoryForm";
import { fileUrl, URL } from "../../Utils/Constant";
import { axiosGet, axiosPost } from "../../Utils/AxiosApi";
import swal from "sweetalert";
import { RiDeleteBin7Line,RiAddCircleLine} from "react-icons/ri";
import { BiSearchAlt} from "react-icons/bi";
import { TbListDetails} from "react-icons/tb";
import SmallSpinner from "../Spinner/SmallSpinner";
import checkPermission from "../../Utils/PermissionChecker";
import FullWindowSpinner from "../Spinner/FullWindowSpinner";
import SearchCategory from "./SearchCategory";
import Pagination from "../Pagination/Pagination";


function Category(){

  const [addCategoryModalOpen,setAddCategoryModalOpen]=useState(false);
  const [detailCategoryModalOpen,setDetailCategoryModalOpen]=useState(false);
  const [searchCategoryModalOpen,setSearchCategoryModalOpen]=useState(false);
  const [categoryDetail,setCategoryDetail]=useState("");
  const [categories,setCategories]=useState([]);
  const [spinner,setSpinner]=useState(true);
  const [submitSpinner,setSubmitSpinner]=useState(false);
  const [searchSubmitSpinner,setSearchSubmitSpinner]=useState(false);
  // const [itemPerPage,setItemPerPage]=useState(5);
  // const [currentPage,setCurrentPage]=useState(1);
  // const [totalCategory,setTotalCategory]=useState(null);
  // const [totalPage,setTotalPage]=useState(null);

  



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
  const toggleSearchCategory = () => {
    setSearchCategoryModalOpen(!searchCategoryModalOpen);
  };

  const getCategories=()=>{
    setSpinner(true);
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
        setSubmitSpinner(true);
        axiosGet(`${URL.deleteCategory}/${id}`,(response)=>{
          if(response.data.success){
        setSubmitSpinner(false);
            swal('Success',response.data.message,'success');
            getCategories();
          }
        },
        (error)=>{
        setSubmitSpinner(false);
        swal('Error',error.response.data.message,'error');

        })

      }else{
        swal('Info','Your record is safe','info');
      }
    });
  };


  const searchCategory=(name)=>{
    setSearchSubmitSpinner(true);
    let data={
        name:name
    }
    axiosPost(URL.searchCategory,data,(response)=>{
      if(response.data.success){
        setSearchSubmitSpinner(false);
        toggleSearchCategory();
        setCategories(response.data.data.items);
      }

    },(error)=>{
      setSearchSubmitSpinner(false);
      swal('Error',error.response.data.message,'error');
    })
}


  // const handleNext=()=>{
  //   let current=currentPage+1;
  //   setCurrentPage(current);
  //   getCategories();
  // }
  // const handlePrevious=()=>{
  //   let current=currentPage-1;
  //   setCurrentPage(current);
  //   getCategories();
  // }

    return (
      <>
      <FullWindowSpinner text="Please Wait. Deleting..." display={submitSpinner} />
      <FullWindowSpinner text="Please Wait. Searching..." display={searchSubmitSpinner} />
        <div className="landing">
         <div className="d-flex justify-content-between">
         {checkPermission('create','Category')?(
           <button
            className="btn btn-primary m-4"
            onClick={toggleAddCategory}
          >
            Add <RiAddCircleLine title="Add" className="add-icon"/>
          </button>
         ):null}
         {checkPermission('search','Category')?(
           <button
            className="btn btn-warning m-4 text-light"
            onClick={toggleSearchCategory}
          >
            Search <BiSearchAlt title="Search" className="search-icon"/>
          </button>
         ):null}
         </div>
         <div className="tableContainerDiv" >

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
            <tbody >
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
                      <td >
                        {checkPermission('details','Category')?(
                          <TbListDetails title="view" className="detail-icon"  onClick={()=>toggleDetailCategory(category)}/>
                        ):null}
                        {checkPermission('delete','Category')?(
                          <RiDeleteBin7Line title="delete" className="delete-icon" onClick={()=>deleteCategory(category.id)} />
                          ):null}
                        
                        
                      </td>
                    </tr>
                  </>
                );
              })
              ):(<tr>
                  <td colSpan={5} className="text-center">
                  {spinner ? (
                      <>
                      <SmallSpinner color="#0000FF" size={30}/>
                      <br></br>Loading Data...
                      </>
                  ) : (
                    'No Categories'
                    )}
                  </td>
                </tr>)}

                {/* <tr>
                  <td colSpan={5} className="text-center">
                    <Pagination totalPage={totalPage} handlePrevious={handlePrevious} handleNext={handleNext} currentPage={currentPage} itemPerPage={itemPerPage} total={totalCategory}/>
                  </td>
                </tr> */}
              
            </tbody>
          </table>
                    </div>
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
        {/* category search modal start */}
        <WindowModal
          size={'md'}
          titleModal="Search category"
          openModal={searchCategoryModalOpen}
          toggleModal={()=>toggleSearchCategory()}
          footerModal={null}
          bodyModal={
            <>
              <SearchCategory searchCategory={searchCategory} />
            </>
          }
        />
        {/* category search modal end */}
      </>
    );
}
export default Category;

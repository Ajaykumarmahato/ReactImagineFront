import React, { useState } from "react";
import { RiAddCircleLine} from "react-icons/ri";
import { BiSearchAlt} from "react-icons/bi";
import checkPermission from "../../Utils/PermissionChecker";
import WindowModal from "../WindowModal/WindowModal";
import NominalAccountForm from "./NominalAccountForm";
function NominalAccount(){

    const [isIncome,setIsIncome]=useState(true);
    const [addNominalAccountModalOpen,setAddNominalAccountModalOpen]=useState(false);


    const toggleAddNominalAccount=()=>{
        setAddNominalAccountModalOpen(!addNominalAccountModalOpen);
    }

    const toggleAccount=(isIncome)=>{
        setIsIncome(isIncome);
    }

    return (
        <>
          <div className="landing">
            <div className="d-flex border">
                <div onClick={(e)=>toggleAccount(true)} className={`${isIncome?"col-6 p-2 text-center border bg-info":"col-6 p-2 text-center border"}`}>
                    <h5>Income</h5>
                </div>
                <div onClick={(e)=>toggleAccount(false)} className={`${!isIncome?"col-6 p-2 text-center border bg-info":"col-6 p-2 text-center border"}`}>
                    <h5>Expenditure</h5>
                </div>
            </div>
             <div className="d-flex justify-content-between">
         {checkPermission('create','Nominal Account')?(
           <button
            className="btn btn-primary m-4"
            onClick={toggleAddNominalAccount}
          >
            Add{isIncome?" Income":" Expenditure"} <RiAddCircleLine title="Add" className="add-icon"/>
          </button>
         ):null}
         {checkPermission('search','Nominal Account')?(
           <button
            className="btn btn-warning m-4 text-light"
          >
            Search{isIncome?" Income":" Expenditure"} <BiSearchAlt title="Search" className="search-icon"/>
          </button>
         ):null}
         </div>
         <div className="tableContainerDiv" >

          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
                
            </thead>
            <tbody  >
             
              
            </tbody>
          </table>
        </div>
          </div>

           {/* add nominal account modal start */}
        <WindowModal
          size={'lg'}
          titleModal={`${isIncome?"Add Income":"Add Expenditure"}`}
          openModal={addNominalAccountModalOpen}
          toggleModal={toggleAddNominalAccount}
          footerModal={null}
          bodyModal={
            <>
            <NominalAccountForm isIncome={isIncome}/>
            </>
          }
        />
        {/* add nominal account modal end */}
        </>
    );

}

export default NominalAccount;
import React, { useEffect, useState } from "react";
import checkPermission from "../../Utils/PermissionChecker";
import WindowModal from "../WindowModal/WindowModal";
import NominalAccountForm from "./NominalAccountForm";
import { axiosPost } from "../../Utils/AxiosApi";
import { fileUrl, URL } from "../../Utils/Constant";
import SmallSpinner from "../Spinner/SmallSpinner";
import { RiDeleteBin7Line,RiAddCircleLine} from "react-icons/ri";
import { BiSearchAlt} from "react-icons/bi";
import { TbListDetails} from "react-icons/tb";
import PreviewFile from "../PreviewFile/PreviewFile";


function NominalAccount(){

    const [isIncome,setIsIncome]=useState(true);
    const [addNominalAccountModalOpen,setAddNominalAccountModalOpen]=useState(false);
    const [nominalAccounts,setNominalAccounts]=useState([]);
    const [spinner,setSpinner]=useState(true);
    const [media,setMedia]=useState([]);
    const [filePreviewModalOpen,setFilePreviewModalOpen]=useState(false);

    useEffect(()=>{
      getNominalAccounts();
    },[isIncome])

    const toggleAddNominalAccount=()=>{
        setAddNominalAccountModalOpen(!addNominalAccountModalOpen);
    }

    const toggleFilePreview = (media) => {
      setMedia(media);
      setFilePreviewModalOpen(!filePreviewModalOpen);
    };

    const getNominalAccounts=()=>{
      setSpinner(true);
      const data={
        isIncome:isIncome
      }

      axiosPost(URL.nominalAccounts,data,(response)=>{
      setSpinner(false);

          if(response.data.success){

            setNominalAccounts(response.data.data.items);
          }
      },(error)=>{
      setSpinner(false);

      })
    }

    return (
        <>
          <div className="landing">
            <div className="d-flex border">
                <div onClick={(e)=>setIsIncome(true)} className={`${isIncome?"col-6 p-2 text-center border bg-info":"col-6 p-2 text-center border"}`}>
                    <h5>Income</h5>
                </div>
                <div onClick={(e)=>setIsIncome(false)} className={`${!isIncome?"col-6 p-2 text-center border bg-info":"col-6 p-2 text-center border"}`}>
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
                <th>File</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
                
            </thead>
            <tbody>
             {nominalAccounts.length>0?(
                nominalAccounts.map((nominalAccount, idx) => {
                  return (
                    <>
                  <tr>
                     
                      <th>{idx + 1}</th>
                      <td>{nominalAccount.title}</td>
                      <td>{nominalAccount.media.length>0?(
                        <>
                       <img className="img-fluid image" src={fileUrl+'/'+nominalAccount.media[0].id+'/'+nominalAccount.media[0].file_name} onClick={()=>toggleFilePreview(nominalAccount.media)}/>
                       </>
                      ):<>-</>}</td>
                      <td>{nominalAccount.amount}</td>
                      <td>{nominalAccount.category.name}</td>
                      <td>{nominalAccount.description}</td>
                      <td>{nominalAccount.date}</td>
                      <td >
                        {checkPermission('details','Nominal Account')?(
                          <TbListDetails title="view" className="detail-icon"  />
                        ):null}
                        {checkPermission('delete','Nominal Account')?(
                          <RiDeleteBin7Line title="delete" className="cursor-pointer delete-icon"  />
                          ):null}
                      </td>
                    </tr>
                  </>
                );
              })
              ):(<tr>
                  <td colSpan={8} className="text-center">
                  {spinner ? (
                      <>
                      <SmallSpinner color="#0000FF" size={30}/>
                      <br></br>Loading Data...
                      </>
                  ) : (
                    'No Data'
                    )}
                  </td>
                </tr>)}
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
            <NominalAccountForm isIncome={isIncome} getNominalAccounts={getNominalAccounts} toggleAddNominalAccount={toggleAddNominalAccount}/>
            </>
          }
        />
        {/* add nominal account modal end */}
         {/* nominal account file preview start */}
         <WindowModal
          size={'xl'}
          titleModal="File Viewer"
          openModal={filePreviewModalOpen}
          toggleModal={()=>toggleFilePreview()}
          footerModal={null}
          bodyModal={
            <>
             <PreviewFile media={media}/>
            </>
          }
        />
        {/* nominal account file preview end */}
        </>
    );

}

export default NominalAccount;
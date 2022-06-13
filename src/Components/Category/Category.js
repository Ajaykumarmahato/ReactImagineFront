import React, { Component } from "react";
import WindowModal from "../WindowModal/WindowModal";
import CategoryDetail from "./CategoryDetail";
import CategoryForm from "./CategoryForm";
import Swal from "sweetalert2";
import SideBar from "../Sidebar/SideBar";
class Category extends Component {
  state = {
    addCategoryModalOpen: false,
    detailCategoryModalOpen: false,
    categories: [
      {
        id: 1,
        title: "Food",
        description: "food for good",
      },
      {
        id: 2,
        title: "Transportation",
        description: "Bus Transportation",
      },
    ],
    categoryDetail: "",
  };

  toggleAddCategory = () => {
    this.setState({
      addCategoryModalOpen: !this.state.addCategoryModalOpen,
    });
  };

  toggleDetailCategory = (category) => {
    this.setState({
      detailCategoryModalOpen: !this.state.detailCategoryModalOpen,
      categoryDetail: category,
    });
  };

  deleteCategory = () => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
  };

  render() {
    return (
      <>
        <div className="landing">
          <button
            className="btn btn-primary m-4"
            onClick={this.toggleAddCategory}
          >
            Add Category
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.categories.map((category, idx) => {
                return (
                  <>
                    <tr>
                      <th>{idx + 1}</th>
                      <td>{category.title}</td>
                      <td>{category.description}</td>
                      <td>
                        <button
                          className="btn btn-success mr-3"
                          onClick={() => this.toggleDetailCategory(category)}
                        >
                          Details
                        </button>
                        <button className="btn btn-warning mr-2 ">Edit</button>
                        <button
                          className="btn btn-danger mr-2"
                          onClick={this.deleteCategory}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* add category modal start */}
        <WindowModal
          titleModal="Add Category"
          openModal={this.state.addCategoryModalOpen}
          toggleModal={this.toggleAddCategory}
          footerModal={null}
          bodyModal={
            <>
              <CategoryForm />
            </>
          }
        />
        {/* add category modal end */}

        {/* category detail modal start */}
        <WindowModal
          titleModal={this.state.categoryDetail.title}
          openModal={this.state.detailCategoryModalOpen}
          toggleModal={this.toggleDetailCategory}
          footerModal={null}
          bodyModal={
            <>
              <CategoryDetail category={this.state.categoryDetail} />
            </>
          }
        />
        {/* category detail modal end */}
      </>
    );
  }
}
export default Category;

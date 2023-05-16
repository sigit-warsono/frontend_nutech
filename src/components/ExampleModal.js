import React from "react";

const ExampleModal = () => {
  return (
    <div
      className="modal fade"
      id="editProduct"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Product
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-primary">
                      <form>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input type="hidden" name="id" />
                                <label htmlFor="exampleInputEmail1">
                                  *Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control select2"
                                  id="name"
                                  placeholder="Product name"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  *Price
                                </label>
                                <input
                                  type="number"
                                  name="price"
                                  className="form-control select2"
                                  id="price"
                                  placeholder="Price"
                                />
                                <small
                                  id="passwordHelp"
                                  className="text-danger"
                                ></small>
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Detail
                                </label>
                                <input
                                  name="detail"
                                  className="form-control"
                                  id="detail"
                                  placeholder="Detail"
                                />
                                <small
                                  id="passwordHelp"
                                  className="text-danger"
                                ></small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <button
                            type="submit"
                            // onClick={() => props.setEditing(false)}
                            className="btn btn-success float-right"
                          >
                            Update
                          </button>
                          <button
                            className="btn"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleModal;

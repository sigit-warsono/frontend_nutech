import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   price: yup.string().required(),
// });

const ProductCreate = (props) => {
  // const { register, handleSubmit, errors, reset } = useForm({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = (data) => {
  //   console.log(data);
  //   props.addProduct(data);
  //   reset();
  // };
  return (
    <div
      className="modal fade"
      id="createProduct"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create Product
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
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">*Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control select2"
                              id="name"
                              placeholder="Product name"
                              // ref={register({
                              //   required: true,
                              //   maxLength: 50,
                              // })}
                            />
                            <small id="passwordHelp" className="text-danger">
                              {/* {errors.name?.message} */}
                            </small>
                          </div>

                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">*Price</label>
                            <input
                              type="number"
                              name="price"
                              className="form-control select2"
                              id="price"
                              placeholder="Price"
                              // ref={register({ required: true })}
                            />
                            <small id="passwordHelp" className="text-danger">
                              {/* {errors.price?.message} */}
                            </small>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Detail</label>
                            <input
                              name="detail"
                              className="form-control"
                              id="detail"
                              placeholder="Detail"
                              // ref={register}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary mr-3"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-success">
                            Create
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

export default ProductCreate;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.scss";
import withReactContent from 'sweetalert2-react-content';

const ModalDelete = (props) => {
    const Swal = require('sweetalert2');
    const MySwal = withReactContent(Swal);
    const [product, setProduct] = useState(props.currentProduct);
    useEffect(()=>{
        setProduct(props.currentProduct);
    })
 
    const deleteProduct = async(IdProduct)=>{
        try {
          await axios.delete(`https://backendnutech.up.railway.app/products/${IdProduct}`).then((response)=>{
            MySwal.fire({
                html: <p><strong style={{ fontSize: "20px" }}>Delete product success</strong><br /></p>,
                icon: 'success',
                showConfirmButton: false,
                confirmButtonColor: '#0099ff',
                timer: 1500
      
              })
            props.setPopUpDelete(!props.popUpDelete);
          props.getProducts();

          });
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div className="modalSigit">
        <div className="popSigitDelete">
            <span>You sure delete this product ? </span>
            <div className="flexButtonDelete">
                <button className='yesDelete' onClick={()=>deleteProduct(product.id)}>Yes</button>
                <button className='noDelete' onClick={()=> props.setPopUpDelete(!props.popUpDelete)}>No</button>
            </div>
        </div>
        </div>
  )
}

export default ModalDelete
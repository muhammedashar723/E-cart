import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../Redux/slice/wishlistSlice';
import { addtoCart } from '../Redux/slice/cartSlice';

function View() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const cart = useSelector(state => state.cartReducer)
  const { wishlist } = useSelector(state => state.wishlistReducer)
  const dispatch = useDispatch()

  const handleWishlist = (product) => {
    const existingProduct = wishlist.find(item => item.id == product.id)
    if (existingProduct) {
      alert("product already exist")
    } else {
      dispatch(addToWishlist(product))
      alert("product added")
    }
  }

  const handleCart = (product) => {
    const existingProduct = cart.find(item => item.id == product.id)
    if (existingProduct) {
      dispatch(addtoCart(product))

      alert("products added")
    } else {
      dispatch(addtoCart(product))
      alert("product added")
    }
  }

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("allProducts"))
    setProduct(allProducts.find(item => item.id == id))
  }, [])
  console.log(product);

  return (
    <div>
      <Header />
      <div style={{ marginTop: "200px" }} >
        <div className="row w-100 container">
          <div className="col-lg-4 mt-5">
            <img src={product.thumbnail} alt="" />
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-6 mt-5">
            <p>pid:{product.id}</p>
            <p>{product.title}</p>
            <p>{product.description}</p>
            <h3>Price: <span className='text-danger'>{product.price}</span> </h3>


            <div className="d-flex justify-content-between">
              <Button onClick={() => handleWishlist(product)} className='btn btn-info rounded'>wishlist<i className='fa-solid fa-heart text-danger'></i></Button>
              <Button onClick={() => handleCart(product)} className='btn btn-info rounded'>Cart<i className='fa-solid fa-cart-shopping text-warning'></i></Button>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default View
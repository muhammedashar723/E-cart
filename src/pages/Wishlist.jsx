import React from 'react'
import Header from '../Components/Header'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../Redux/slice/wishlistSlice'
import { addtoCart } from '../Redux/slice/cartSlice'

function Wishlist() {
  const dispatch=useDispatch()
const {wishlist}=useSelector(state=>state.wishlistReducer)
const handleCart=(product)=>{
  dispatch(addtoCart(product))
  dispatch(removeFromWishlist(product.id))
}
  return (
    <div>
      <Header/>
         <div style={{marginTop:'100px'}} className='container-fluid'>
        <Row>
          {
            wishlist.length>0?
            wishlist.map(product=>(
              <Col className='m-3'>
           <Card style={{ width: '18rem' }}>
            <Link to={'/view/:id'}> <Card.Img variant="top" src={product.thumbnail} /></Link>
     
      <Card.Body>
        <Card.Title>{product.title.slice(0,15)}</Card.Title>
        <Card.Text>
        {product.description.slice(0,30)}
        </Card.Text>
        <div className='d-flex justify-content-between'>
           <Button  className='btn btn-light' onClick={()=>dispatch(removeFromWishlist(product.id))}><i className='fa-solid fa-trash text-danger'></i></Button>
           <Button  className='btn btn-light' onClick={()=>handleCart(product)}><i className='fa-solid fa-cart-shopping text-info'></i></Button>
        </div>
      
      </Card.Body>
    </Card>
          </Col>
            )
            ):<div className='text-center'>
             <img src='https://krosfitsports.com/public/empty-cart.gif' alt=""/>
             <h1 className='text-danger mt-5'>Your Wishlist is Empty..</h1>
            </div>
}
        </Row>
      </div>
    
    </div>
  )
}

export default Wishlist

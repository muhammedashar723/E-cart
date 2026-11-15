import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProducts} from '../Redux/slice/productSlice'
import { addToWishlist } from '../Redux/slice/wishlistSlice'
import {addtoCart} from '../Redux/slice/cartSlice'
function Home() {
 const dispatch=useDispatch()
 const{allProducts,loading,error}=useSelector(state=>state.productReducer)
const cart=useSelector(state=>state.cartReducer)

 useEffect(()=>{
  dispatch(fetchProducts())
 },[])
  const handleCart=(product)=>{
  const existingProduct=cart.find(item=>item.id==product.id)
  if(existingProduct){
        dispatch(addtoCart(product))

    alert("products added")
  }else{
    dispatch(addtoCart(product))
    alert("product added")
  }
 }

const { wishlist } = useSelector(state => state.wishlistReducer)
 const handleWishlist=(product)=>{
  const existingProduct=wishlist.find(item=>item.id==product.id)
  if(existingProduct){
    alert("product already exist")
  }else{
    dispatch(addToWishlist(product))
    alert("product added")
  }
 }

  return (
    <div>
      <Header insideHome/>
      <div style={{marginTop:'100px'}} className='container-fluid'>
        {loading?
        <div className='text-center'>
           <Spinner animation="border" variant="primary" />
        </div>:
        
        <Row>
        {allProducts.map(product=>(
            <Col className='m-3' key={product.id}>
           <Card style={{ width: '18rem' }}>
            <Link to={`/view/${product.id}`}> <Card.Img variant="top" src={product.thumbnail} /></Link>
     
      <Card.Body>
        <Card.Title className='text-warning'>{product.title.slice(0,15)}</Card.Title>
        <Card.Text>
         {product.description.slice(0,30)}
        </Card.Text>
        <div className='d-flex justify-content-between'>
           <Button  className='btn btn-light' onClick={()=>handleWishlist(product)}><i className='fa-solid fa-heart text-danger'></i></Button>
           <Button  className='btn btn-light' onClick={()=>handleCart(product)}><i className='fa-solid fa-cart-shopping text-info'></i></Button>
        </div>
      
      </Card.Body>
    </Card>
          </Col>
        ))}
        </Row>}
      </div>
    
</div>
)
}

export default Home
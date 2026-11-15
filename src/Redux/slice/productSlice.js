import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchProducts=createAsyncThunk('fetchProducts/products',async()=>{
    const result=await axios.get('https://dummyjson.com/products')
    localStorage.setItem("allProducts",JSON.stringify(result.data.products))
   // console.log(result.data.products)
   return result.data.products
})

const productSlice=createSlice({
    name:"products",
    initialState:{
        allProducts:[],
        allProductsDummy:[],
           loading: false,
        error: ""
    },
    reducers:{
    searchProduct:(state,action)=>{
    state.allProducts=state.allProductsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
}},
extraReducers:(buider)=>{
    buider.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.allProducts=action.payload
        state.allProductsDummy=action.payload
        state.loading=false
        state.error=""
    })
    buider.addCase(fetchProducts.pending,(state,action)=>{
        state.allProducts=[]
        state.loading=true
        state.error=""
    })
    buider.addCase(fetchProducts.rejected,(state,action)=>{
        state.allProducts=[]
        state.loading=false
        state.error="API failed"
    })
}
})
export default productSlice.reducer
export const { searchProduct } = productSlice.actions
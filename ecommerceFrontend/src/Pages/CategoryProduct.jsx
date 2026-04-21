import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../extras/Loading4.webm";
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../component/ProductListView'
import { fetchAllProducts } from '../api/axios'
import Navbar2 from '../component/Navbar2';

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const category = params.category
  const navigate = useNavigate()

  const getAllData = async ()=>{
    try {
      setIsLoading(true);
      const res = await fetchAllProducts();
      
       setData(res)

    } catch (error) {
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getAllData()
    window.scrollTo(0,0)
  },[])

const filteredData = data?.filter(
  (product) =>
    product.category?.toLowerCase() === category?.toLowerCase()
);

console.log(filteredData)
  return (
    <div>
        <Navbar2/>
      {
        isLoading ? (
          <div className='flex items-center justify-center h-[400px]'>
             <video muted autoPlay loop>
              <source src={Loading} type='video/webm'/>
             </video>
          </div>
        ) : filteredData?.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
             <button onClick={()=>navigate('/home')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>
             {
              filteredData.map((product, index) =>{
                return <ProductListView key={index} product={product}/>
              })
             }
          </div>
        ):(
          <div className='flex flex-col items-center justify-center h-[400px]'>
             <h2 className='text-2xl font-bold text-gray-700'>No products found in "{category}"</h2>
             <button onClick={()=>navigate('/categories')} className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg'>Browse Other Categories</button>
          </div>
        )
      }
    </div>
  )
}

export default CategoryProduct
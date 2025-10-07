import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const HotelReg = () => {

  const {setShowHotelReg, axios, getToken, setIsOwner} = useAppContext()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [city, setCity] = useState('')

  const onSubmitHandler = async (event)=>{
    try {
      event.preventDefault();
      const {data} = await axios.post(`/api/hotels/`,{name, contact, address, city}, {headers: {Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        toast.success(data.message)
        setIsOwner(true)
        setShowHotelReg(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div onClick={()=> setShowHotelReg(false)} className='flex top-0 bottom-0 left-0 right-0 z-100 items-centerjustify-center bg-black/70'>
     <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className='flex bg-white rounded-xlmax-w-4xl max:mx-2'>
      <img src={assets.regImage} alt='reg-image' className='w-1/2 rounded-xl hidden md:block' />

      <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
        <img src={assets.closeIcon} alt='close-icon' className='absolute top-25 right-4 h-4 w-4 cursor-pointer' onClick={()=> setShowHotelReg(false)}/>
        <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>
       
       {/* hotel name*/}
        <div className='w-full mt-4'>
          <label htmlFor='name' className='fony-medium text-sm text-gray-600'>
          Hotel Name
          </label>

          <input id='name' onChange={(e)=> setName(e.target.value)} value={name} type='text' placeholder='type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
        </div>
        {/* phone*/}
        <div className='w-full mt-4'>
          <label htmlFor='contact' className='fony-medium text-sm text-gray-600'>phone</label>

          <input onChange={(e)=> setContact(e.target.value)} value={contact}  id='contact' type='text' placeholder='type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
        </div>
        {/* address*/}
        <div className='w-full mt-4'>
          <label htmlFor='address' className='fony-medium text-sm text-gray-600'>Address</label>

          <input onChange={(e)=> setAddress(e.target.value)} value={address}  id='address' type='text' placeholder='type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
        </div>

        {/* city*/}
        <div className='w-full mt-4 max-w-60 mr-auto'>
          <label htmlFor='city' className='font-medium text-gray-500'>city</label>
          <select onChange={(e)=> setCity(e.target.value)} value={city}  id='city' className='border border-gray-200 rounded w-full px-3 py-2.5 outline-indigo-500 font-light' required>
            <option value=''>select city</option>
               {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
               ))}
          </select>
        </div>
        <button className='bg-indigo-500 text-white transition-all mr-auto  rounded w-full px-6 py-2 mt-6 font-semibold hover:bg-indigo-600 cursor-pointer'>Register</button>

        
      </div>
     </form>  
    </div>
  )
}

export default HotelReg

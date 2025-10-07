import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetails = () => {
    const {id} = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {
        const room = roomsDummyData.find(room => room._id === id) 
        room && setRoom(room)
        room && setMainImage(room.images[0])
    },[])

  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 '>
      {/* Room Details */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3x1 md:text-4x1 font-playfair'>
        {room.hotel.name}<span className='font-inter text-sm'>({room.roomType})</span></h1>
        <p className='text-xs font-inter py-1.5 px-3 text-white bg-blue-400
        rounded-full'>20% Off</p>
      </div>
        {/* Room rating */}
        <div className='flex items-center gap-2 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
        </div>
        {/* Room address */}
        <div className='flex items-center gap-1 mt-2 text-gray-500'>
            <img src={assets.locationIcon} alt='location-icon'/>
            <span>{room.hotel.address}</span>
        </div>


        {/* Room images */}
        <div className='flex flex-col lg:flex-row gap-6 mt-6'>
          <div className='lg:w-1/2 w-full'>
            <img src={mainImage} alt='room image' 
            className='w-full shadow-lg object-cover rounded-xl '/>
          </div>
          <div className='grid grid-cols-2 lg:w-1/2 w-full gap-4'>
            {room?.images.length > 1 && room.images.map((image, index)=>(
              <img onClick={()=> setMainImage(image)}
               key={index} src={image} alt='room image'
               className={`w-full rounded-x1 shadow-md object-cover
               cursor-pointer ${mainImage === image && 'outline-3 outline-blue-500'}`} />
            ))}
          </div>
        </div>
        {/* Room highl */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
              <div className='flex flex-col'>
                <h1 className='text-3x1 md:text-4x1 font-playfair'>Experience Luxury Life Never Before</h1>
                <div className='flex flex-wrap items-center gap-2 mt-3 mb-6'>
                  {room.amenities.map((item, index)=>(
                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                      <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                      <p className='text-xs'>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Room price */}
              <p className='text-2xl font-medium'>₹ {room.pricePerNight}/night</p>
        </div>

{/* check in */}
                  <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
                    <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>

                      <div className='flex flex-col'>
                        <label htmlFor='checkInDate' className='font-medium'>Check-In</label>
                        <input type='date' id='checkInDate' placeholder='Check-In'
                          className='w-full border border-gray-300 rounded border px-4 mt-2 outline-none border-blue-500'
                        required/>
                      </div>
                      <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                      <div className='flex flex-col'>
                        <label htmlFor='checkOutDate' className='font-medium'>Check-Out</label>
                        <input type='date' id='checkOutDate' placeholder='Check-Out'
                          className='w-full border border-gray-300 rounded border px-4 mt-2 outline-none border-blue-500'
                        required/>
                      </div>
                        <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                      <div className='flex flex-col'>
                        <label htmlFor='guests' className='font-medium'>Guests</label>
                        <input type='number' id='guests' placeholder='0'
                          className='max-w-20 border border-gray-300 rounded border px-3 mt-1.5 outline-none border-blue-500'
                        required/>
                      </div>
                    </div>

                    <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                      Check Availability
                    </button>

                  </form>


        {/* comm spe*/}
        <div className='mt-25 space-y-4'>
          {roomCommonData.map((spec,  index)=>(
            <div key={index} className='flex items-center gap-2'>
              <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5'/>
              <div>
                <p className='text-base'>{spec.title}</p>
                <p className='text-gray-500'>{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='max-w-4xl my-15 border-y border-gray-300 py-10 text--gray-500'>
          <p>"Be Our Guest, Stay Home" which emphasizes the importance 
          of the guest's comfort and the feeling of being home while
           traveling, or "Guests Welcome, Smiles Abound", which focuses 
           on the positive atmosphere of the experience. Other options 
           could be "Your Comfort, Our Priority" or "Making Memories Together". </p>
        </div>

        {/* hotel details */}
        <div className='flex flex-col items-start gap-2'>
          <div className='flex gap-4'>
            <img src={assets.ownerr} alt='Host' 
              className='h-14 w-14 rounded-full md:h-18 md:w-18'
            />
            <div>
              <p className='text-lg md:text-xl'>Hosted by <br/>abhi_kaldate</p>
              <div className='flex items-center mt-1'>
                <StarRating/>
                <p className='ml-2'>200+reviews</p>
              </div>
            </div>
          </div>
          <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact Now<br/>+91 917-506-1225</button>
        </div>
    </div>
  )
}

export default RoomDetails

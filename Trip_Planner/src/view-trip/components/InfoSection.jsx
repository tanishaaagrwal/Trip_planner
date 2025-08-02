import Button from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function InfoSection({trip}) {
  const[PhotoUrl,setPhotoUrl] = useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp =>{
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <div className="relative">
      {/* Hero Image with Overlay */}
      <div className="relative h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src={PhotoUrl} 
          className='w-full h-full object-cover' 
          alt="Destination"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {trip?.userSelection?.location?.label}
          </h1>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white font-medium">
              🗓️ {trip.userSelection?.noOfDays} Days
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white font-medium">
              💰 {trip.userSelection?.budget} Budget
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white font-medium">
              👥 {trip.userSelection?.traveler}
            </div>
          </div>
        </div>
        
        {/* Share Button */}
        <div className="absolute top-6 right-6">
          <Button className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-full p-3">
            <IoIosSend className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InfoSection;
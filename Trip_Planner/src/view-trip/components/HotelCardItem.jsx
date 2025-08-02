import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({hotel}) {
  const[PhotoUrl,setPhotoUrl] = useState();
  
  useEffect(()=>{
    hotel&&GetPlacePhoto();
  },[hotel])
  
  const GetPlacePhoto=async()=>{
    const data = {
      textQuery: hotel?.name
    }
    const result = await GetPlaceDetails(data).then(resp =>{
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+ hotel?.address}
      target="_blank"
    >
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100">
        <div className="relative overflow-hidden">
          <img
            src={PhotoUrl}
            className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Hotel"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium text-gray-700">
              ⭐ {hotel?.rating}
            </div>
          </div>
        </div>
        <div className="p-5">
          <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{hotel?.name}</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">📍</span>
              <p className="text-sm text-gray-600 line-clamp-2">{hotel?.address}</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                <span className="text-green-600">💰</span>
                <span className="font-semibold text-lg text-gray-900">{hotel?.pricePerNight}</span>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                View Details
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem;
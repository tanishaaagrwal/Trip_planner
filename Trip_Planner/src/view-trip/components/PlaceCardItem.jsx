import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({place}) {
  const[PhotoUrl,setPhotoUrl] = useState();
  
  useEffect(()=>{
    place&&GetPlacePhoto();
  },[place])
  
  const GetPlacePhoto=async()=>{
    const data = {
      textQuery: place.place
    }
    const result = await GetPlaceDetails(data).then(resp =>{
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.place} target="_blank">
      <div className="group bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 hover:scale-102 hover:border-blue-200">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img 
              src={PhotoUrl} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
              alt="Place"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {place.place}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {place.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-green-600 font-medium">💰</span>
                <span className="font-semibold text-gray-900">{place.cost}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-blue-600 text-sm font-medium">View on Map →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem;

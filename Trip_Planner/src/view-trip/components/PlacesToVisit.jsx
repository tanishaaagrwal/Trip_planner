import PlaceCardItem from "./PlaceCardItem"

function PlacesToVisit({trip}) {
  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Places to Visit</h2>
        <p className="text-gray-600">Your day-by-day itinerary with amazing destinations</p>
      </div>
      
      <div className="space-y-8">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 md:p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{item.day}</h3>
            </div>
            
            <div className="grid gap-6">
              {item.activities?.map((place,activityIndex)=>(
                <div key={activityIndex} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      ⏰ {place.time}
                    </div>
                  </div>
                  <PlaceCardItem place={place}/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit;
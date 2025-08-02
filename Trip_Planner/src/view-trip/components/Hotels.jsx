import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hotel Recommendations</h2>
        <p className="text-gray-600">Handpicked accommodations for your perfect stay</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
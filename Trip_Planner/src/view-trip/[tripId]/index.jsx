import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebaseConfig.jsx';
import { toast } from 'sonner';
import { useState } from 'react';
import InfoSection from '../components/InfoSection.jsx';
import Hotels from '../components/Hotels.jsx';
import PlacesToVisit from '../components/PlacesToVisit.jsx';

function Viewtrip(){
  const { tripId } = useParams();
  const [trip,setTrip] = useState([])
  
  useEffect(() => {
    const GetTripData = async () => {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast('No such trip found!');
      }
    };
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Information about the trip */}
        <InfoSection trip={trip} />
        
        {/* Recommendations of hotels*/}
        <Hotels trip={trip} />
        
        {/* Itinerary for each day */}
        <PlacesToVisit trip={trip} />
      </div>
    </div>
  )
}

export default Viewtrip;
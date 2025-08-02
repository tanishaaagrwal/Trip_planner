import { useState , useEffect} from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { createChat,chatWithGemini} from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig"; // Adjust the import path as necessary
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const[openDialog,setOpenDialog]=useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const handleInputChange = (name,value) => {

   
      setFormData({
        ...formData,
        [name]: value
      })
  }

  useEffect(()=>{
    console.log(formData);
  },[formData])
   
  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

 const OnGenerateTrip = async () => {
  const user = localStorage.getItem("user");
  if (!user) {
    setOpenDialog(true);
    return;
  }

  if (
    formData?.noOfDays > 5 ||
    !formData?.location ||
    !formData?.budget ||
    !formData?.travelers
  ) {
    toast("Please fill all the fields");
    return;
  }

  setLoading(true);

  const FINAL_PROMPT = AI_PROMPT
    .replaceAll("{location}", formData?.location?.label || "")
    .replaceAll("{totalDays}", formData?.noOfDays || "")
    .replaceAll("{travelers}", formData?.travelers || "")
    .replaceAll("{budget}", formData?.budget || "");

  console.log("FINAL_PROMPT:", FINAL_PROMPT);

  const chat = createChat();
  const tripText = await chatWithGemini(chat, FINAL_PROMPT);
  console.log("-- tripText:", tripText);

  if (!tripText || tripText === "Sorry, chat failed!") {
    toast("AI failed to generate trip. Try again.");
    setLoading(false);
    return;
  }

  // ✅ Clean and parse tripText as JSON
  try {
    const cleanedText = tripText.replace(/```json|```/g, "").trim();
    const tripJSON = JSON.parse(cleanedText);
    await SaveAiTrip(tripJSON); // Save JSON object, not string
  } catch (error) {
    console.error("Error parsing AI response as JSON:", error);
    toast("Failed to parse AI trip response. Try again.");
  }

  setLoading(false);
};

const SaveAiTrip = async (tripData) => {
  if (!tripData) {
    console.error("tripData is undefined");
    toast("Trip data is missing, cannot save.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const docID = Date.now().toString();

  try {
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: tripData, // ✅ This is now an object, not a string
      userEmail: user?.email,
      id: docID,
    });
    navigate("/view-trip/" + docID);
    console.log("Trip saved to Firebase");
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    toast("Error saving trip data.");
  }
};


  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false)
      OnGenerateTrip();
    })

    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-40">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Tell us your travel preferences
          </h2>
          <p className="mt-3 text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
            Let us know what you love—whether it&apos;s adventure, relaxation, or cultural experiences—and our AI will craft the perfect trip just for you!
          </p>
        </div>

        {/* Form Section */}
        <div className="mt-10 space-y-8 max-w-2xl mx-auto">
          {/* Destination Input */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Which destination would you love to explore?
            </h2>
            
            {/* GooglePlacesAutocomplete */}
            <GooglePlacesAutocomplete
   apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
   selectProps={{
    value: place,
     onChange: (value) => {
     setPlace(value);
     handleInputChange('location', value);
 },
     placeholder: "Search for a destination...",
      styles: {
      control: (provided) => ({
      ...provided,
      height: '56px',
      fontSize: '18px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
     '&:hover': {
      borderColor: '#3b82f6'
 }
 })
 }
 }}
/>

          </div>

          {/* Duration Input */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              How long do you plan to stay?
            </h2>
            <Input 
              placeholder="Ex-5" 
              type="number" 
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
              className="w-full h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
        </div>

        {/* Budget Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
              What is your Budget?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {SelectBudgetOptions.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleInputChange('budget', item.title)}
                className={`group p-6 bg-white border-2 ${formData.budget === item.title ? 'border-indigo-400' : 'border-gray-200'} rounded-2xl hover:border-indigo-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
>
                  <div className="text-center">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel List Section */}
        <div className="mt-16 max-w-6xl mx-auto pb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
              Who will be your travel buddy on your next adventure?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SelectTravelesList.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleInputChange('travelers', item.people)}
                className={`group p-6 bg-white border-2 ${formData.travelers === item.people ? 'border-indigo-400' : 'border-gray-200'} rounded-2xl hover:border-indigo-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                 >

                  <div className="text-center">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    <div className="flex justify-center mt-12">
   <Button 
   disabled={loading}
   onClick={OnGenerateTrip}className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-10 py-5 rounded-2xl shadow-lg transition-all duration-300">
  {loading ?
  <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: ' Generate Trip'} 
  </Button>
</div>
    <Dialog open={openDialog} >
 
  <DialogContent>
    <DialogHeader>
      
     <DialogDescription className="flex flex-col items-center text-center px-6 pb-6">
 <img src="/logo.svg" alt="Trip Buddy Logo" className="w-40 h-30 mb-4" />
<h2 className="text-xl font-semibold text-gray-800 mb-2">Sign in with Google</h2>
 <p className="text-sm text-gray-600 mb-4">Sign in to the app with Google authentication</p>
 <Button
 
  onClick={login}
  variant="outline"
  className="bg-black hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 w-full mt-5"
>
 
  Sign In with Google

</Button>

</DialogDescription>

    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default CreateTrip;
export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'😎',
        people:'1'
    },
    {
        id:2,
        title:'With Friends',
        desc:'A group of friends on an adventure',
        icon:'👯‍♂️',
        people:'3-5'
    },
    {
        id:3,
        title:'With Family',
        desc:'A family trip filled with fun and bonding',
        icon:'👨‍👩‍👧‍👦',
        people:'2-6'
    },
    {
        id:4,
        title:'With Partner',
        desc:'A romantic getaway for two',
        icon:'❤️',
        people:'2'  
    }
];

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Budget',
        desc:'Affordable options for budget travelers',
        icon:'💰',
        
    },
    {
        id:2,
        title:'Mid-Range',
        desc:'Comfortable options for mid-range travelers',
        icon:'💵',
        
    },
    {
        id:3,
        title:'Luxury',
        desc:'Premium options for luxury travelers',
        icon:'💎',
       
    }
];
export const AI_PROMPT = `
You are an expert travel assistant specialized in creating detailed, personalized travel itineraries.
Generate a COMPLETE, VALID JSON-formatted travel plan for the following parameters:

Location: {location}
Duration: {totalDays} days
Travelers: {travelers}
Budget: {budget}

REQUIRED FORMAT:
1. Hotel recommendations (4 options):
   - Must include: name, address, rating (stars), price per night in dollar with sign, description
   - Optional: image URL if available

2. Daily itinerary (for each day):
   - Morning, afternoon, evening activities
   - Each activity must include: time, place, description, estimated cost
   - Specify "best time to visit" for each day

3. Local food recommendations (4 items):
   - name, description, recommended place to try it

4. Trip highlights (4 bullet points)

5. Travel tips (4 bullet points)

IMPORTANT INSTRUCTIONS:
- Your response MUST be a single, valid JSON object
- Do NOT include any extra text before or after the JSON
- Do NOT use comments or markdown formatting (like \`\`\`)
- Use double quotes around all keys and string values
- Escape special characters if needed
- Ensure the JSON includes all braces and commas correctly

EXAMPLE STRUCTURE:
{
  "location": "Destination Name",
  "duration": "X days",
  "travelers": "Description",
  "budget": "Budget Level",
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Full Address",
      "rating": "X stars",
      "pricePerNight": $123,
      "imageUrl": "https://example.com/image.jpg",
      "description": "Brief description highlighting key features"
    }
  ],
  "itinerary": [
    {
      "day": "Day 1: Title",
      "bestTime": "Morning/Afternoon/Evening",
      "activities": [
        {
          "time": "10:00 AM",
          "place": "Location Name",
          "description": "What the user will do",
          "cost": $100
        }
      ]
    }
  ],
  "localFood": [
    {
      "name": "Dish Name",
      "description": "Tasty explanation",
      "recommendedPlace": "Where to try it"
    }
  ],
  "highlights": [
    "Top thing 1",
    "Top thing 2"
  ],
  "travelTips": [
    "Tip 1",
    "Tip 2"
  ]
}

NOW GENERATE THE JSON OBJECT FOR:
Location: {location}
Duration: {totalDays} days
Travelers: {travelers}
Budget: {budget}
`;

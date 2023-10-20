import {Client} from "@googlemaps/google-maps-services-js";

export default {
conver:()=>{
    console.log("process.env.GOOGLE_MAPS_API_KEY",process.env.GOOGLE_MAPS_API_KEY);
    
    const client = new Client({});
    client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });
}
}

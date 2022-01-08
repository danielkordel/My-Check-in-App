  let lat, lon;
  
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      try{
      lat = position.coords.latitude.toFixed(2);
      lon = position.coords.longitude.toFixed(2);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      const weather = json.current.condition.text;
      const temp = json.current.temp_c;
      document.getElementById('here').textContent = json.location.name;
      document.getElementById('summary').textContent = json.current.condition.text;
      document.getElementById('temperature').textContent = json.current.temp_c;
      // console.log(json); // here is full object got from API


      const data = { lat, lon, weather, temp };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const db_response = await fetch('/api', options);
      const db_json = await db_response.json();
      console.log(db_json); // object saved in database 


    } catch (error){
      console.error(error);
    }
  });
} else {
  console.log('geolocation not available');
};
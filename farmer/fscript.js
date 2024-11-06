// scripts.js

const rainfallData = {
    "Mumbai": 120,   // Example value, replace as necessary
    "Delhi": 50,
    "Kolkata": 100,
    "Chennai": 90,
    "Bangalore": 60,
    "Hyderabad": 75,
    "Ahmedabad": 45,
    "Pune": 80,
    "Jaipur": 30,
    "Lucknow": 55,
    "Patna": 85,
    "Bhopal": 70,
    "Ranchi": 95,
    "Guwahati": 110,
    "Nagpur": 65
    // Add more cities and corresponding rainfall data as needed
  };
async function getWeatherData() {
    const apiKey = 'API_KEY';
    const location = document.getElementById('location').value;
  
    if (!location) {
      alert('Please enter a location.');
      return;
    }
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Location not found. Please enter a valid location.');
      }
      const data = await response.json();
  
      // Convert temperature from Kelvin to Celsius
      const temperature = Math.round(data.main.temp - 273.15);
      const rainfall = rainfallData[location] || 0;
      const radiation = Math.round((data.clouds.all / 100) * 800); // Approximate solar radiation based on cloudiness
  
      // Update the page with weather data
      document.getElementById('temp').textContent = `${temperature}°C`;
      document.getElementById('rainfall').textContent = `${rainfall} mm`;
      document.getElementById('radiation').textContent = `${radiation} W/m²`;
  
      // Update irrigation recommendations based on rainfall
      const recommendations = document.getElementById('recommendations');
      recommendations.innerHTML = ''; // Clear existing recommendations
      if (temperature > 30) {
        recommendations.innerHTML += `<li>Increase irrigation due to high temperatures.</li>`;
        }
        else{
            if (rainfall > 40) {
                recommendations.innerHTML += `<li>Reduce irrigation as rain is expected.</li>`;
              } else {
                
                recommendations.innerHTML += `<li>Normal irrigation suggested.</li>`;
                
              }
        }
      
      
    } catch (error) {
      alert(error.message);
    }
  }
  

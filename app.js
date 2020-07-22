window.addEventListener('load', ()=>
{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureHumidity = document.querySelector('.temperature-humidity');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    let convertDiv = document.querySelector('.convert');
    function ascii (a) { return String.fromCharCode(a); }
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c06110eb80a3daa3537f505a2a7dd509/${lat},${long}`;
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, humidity, icon}= data.currently;
                    //set DOM elements from data acquired
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    temperatureHumidity.textContent = humidity;

                    //conversion formula
                    let celsius = (temperature - 32) * (5 / 9);


                    // play icons 

                    setIcons(icon, document.querySelector('.icon'));
                    
                    //fahrenheit to celsius

                    convertDiv.addEventListener('click' , () => {
                        if(temperatureSpan.textContent === "F")
                        {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else
                        {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }

    function setIcons(icon, iconID)
    {   
        const skycons = new Skycons({color : "white"},{"resizeClear": true});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
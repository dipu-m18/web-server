const request= require('request')
var capitalize = require('capitalize')
const forecast = (latitude, longitude, callback) => {
     const key=process.env.API_forecastKey
     const url ='https://api.openweathermap.org/data/2.5/onecall?'+'lat='+latitude+'&lon='+longitude+'&exclude=minutely&appid='+key+'&units=metric'
   
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined, undefined)
        }else if(body.error){
            callback('Unable to find location', undefined, undefined)
        }else{
           var dailyArray=[]
           var n=body.daily.length
           var dayy={
               init: function(day, icon, detail, maxTemp, minTemp){
                    this.day = day;
                    this.icon = icon;
                    this.detail = detail;
                    this.maxTemp = maxTemp;
                    this.minTemp = minTemp;
               }
           }
           for(let i=0;i<n;i++){
                let block = Object.create(dayy);
                block.init(body.daily[i].dt, body.daily[i].weather[0].icon, body.daily[i].weather[0].description, body.daily[i].temp.max, body.daily[i].temp.min)
                dailyArray.push(block)
            }


            //hourly-details
            var hourlyArray=[]
            var nn=body.hourly.length
            var dayyy={
                init: function(day, icon, detail, temp){
                    this.day = day
                    this.icon = icon
                    this.detail = detail
                    this.temp = temp
                }
            }
            for(let i=0;i<nn;i++){
                let block=Object.create(dayyy)
                block.init(body.hourly[i].dt, body.hourly[i].weather[0].icon, body.hourly[i].weather[0].description, body.hourly[i].temp)
                hourlyArray.push(block)
            }



            //console.log(hourlyArray)
            callback(undefined, {
                time: body.current.dt,
                temp: body.current.temp,
                 weatherDesc: capitalize(body.current.weather[0].description), 
                 icon: body.current.weather[0].icon,
                 maxx: body.daily[0].temp.max,
                 minn: body.daily[0].temp.min,
                 feelsLike: body.current.feels_like,
                 dewsPoint: body.current.dew_point,
                 clouds: body.current.clouds,
                 humidity: body.current.humidity,
                 pressure: body.current.pressure,
                 windSpeed: body.current.wind_speed,
             }, 
            dailyArray,
            hourlyArray
            )
        }
    })
}


module.exports= forecast

// weather_descriptions: body.current.weather_descriptions,
//                 temperature: body.current.temperature,
//                 chance_of_rain: body.current.precip
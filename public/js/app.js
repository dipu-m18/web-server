
console.log('Client side javascript file is loaded!')
function myFunction() {
    var elmnt = document.getElementById("ccc");
    elmnt.scrollBy(200, 0);
    }
    function myFunctionn() {
        var elmnt = document.getElementById("ccc");
        elmnt.scrollBy(-200, 0);
        }

// window.onresize = displayWindowSize;
// window.onload = displayWindowSize;
// function displayWindowSize() {
//     // your size calculation code here
//     myWidth = window.innerWidth;
//     myHeight = window.innerHeight;
//     document.getElementById("dimensions").innerHTML = myWidth + "x" + myHeight;
// };

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#date')
const messageThree = document.querySelector('#temperature')
const messageFour = document.querySelector('#weatherDescription')
const messageFive = document.querySelector('#maxTemp')
const messageSix = document.querySelector('#minTemp')
const feelsLike = document.querySelector('#feelsLike')
const dewsPoint= document.querySelector('#dewsPoint')
const clouds= document.querySelector('#clouds')
const humidity= document.querySelector('#humidity')
const pressure= document.querySelector('#pressure')
const wind= document.querySelector('#wind')

 
let dailyArray
let hourlyArray
let weatherData
//let location
let background
background='clear'
displayBackground(background)


let locationIcon = document.querySelector('.weather-icon')
let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// let mm=['st','nd','rd','th']

//get the modal
const modal = document.getElementById("myModal")
//get the button that opens the modal
var moreDetails=document.getElementById("moreDetails")

//get the span element that closes the button
const span = document.getElementsByClassName("close")[0]
//when the user clicks the button, open the modal


//when hte user clicks on <span> (x), close the modal
span.onclick = function(){
    modal.style.display = "none";
}
// const close2 = document.getElementById("close2")
//  close2.onclick= function(){
//      modal.style.display= "none";
//  }

 moreDetails.onclick = function(){
   modal.style.display="block";
 }

 //const locationn = 'Mumbai'
    
    var ddd =new Date()
    messageTwo.textContent= ddd.toDateString()
    messageOne.textContent = "Loading..."


        
//         fetch('/weather?address='+locationn).then((response) => {
//     response.json().then((data) => {
        
//         if(data.error){
//             messageOne.textContent = data.error
//         }
//         else{
//         background=data.forecast.main.toLowerCase()
        
//             displayBackground(background)
//              displayWeather(data)
             
//              dailyArray= data.dailyArray.slice()
//              hourlyArray= data.hourlyArray.slice()
//              console.log(hourlyArray)
//             displayDaily(dailyArray)   
//        }
//     })
// })


moreDetails.onclick = function(){
    modal.style.display="block";

//     fetch('/weather?address='+location).then((response) => {
//     response.json().then((data) => {
        
//         if(data.error){
//             messageOne.textContent = data.error
//         }
//         else{
            
//             feelsLike = data.forecast.feelsLike+ '\u02DA'
//             dewsPoint= data.forecast.dewsPoint+ '\u02DA'
//             clouds= data.forecast.clouds+ '%'
//             humidity= data.forecast.humidity+ '%'
//             pressure= data.forecast.pressure+ 'hPa'
//             wind= data.forecast.windSpeed+ 'meter/sec'
            
//         }
//     })
// })   
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    var dd =new Date()
    messageTwo.textContent= dd.toDateString()
    messageOne.textContent = "Loading..."
    //messageTwo.textContent = ''
    
        
        fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            background=data.forecast.main.toLowerCase()
            console.log(background)
            displayBackground(background)
            displayWeather(data)
            // console.log(data.arr.length)
            // document.body.style.backgroundImage = "url('img_tree.png')";
            dailyArray= data.dailyArray
            hourlyArray= data.hourlyArray
            displayDaily(dailyArray)  
        
        }
    })
})
})



//////////////////////D I S P L A Y
function displayWeather(data){

    const icon= data.forecast.icon
    locationIcon.innerHTML = `<img src="icons/${icon}.png">`
    var d =new Date(data.forecast.time *1000)
    messageOne.textContent = data.location
    messageTwo.textContent= d.toGMTString()
    messageThree.textContent = data.forecast.temp+ '\u2103'
    messageFour.textContent = data.forecast.weatherDesc
    messageFive.textContent = data.forecast.maxx+ '\u02DA'
    messageSix.textContent = data.forecast.minn+ '\u02DA'
    feelsLike.textContent = data.forecast.feelsLike+ '\u02DA'
    dewsPoint.textContent= data.forecast.dewsPoint+ '\u02DA'
    clouds.textContent= data.forecast.clouds+ ' %'
    humidity.textContent= data.forecast.humidity+ ' %'
    pressure.textContent= data.forecast.pressure+ ' hPa'
    wind.textContent= data.forecast.windSpeed+ ' meter/sec'
}



/////////////////// F O O T E R

const click1= document.querySelector("#button1")
const click2= document.querySelector("#button2")
const btn= document.querySelector("#btn")
click1.addEventListener("click", getPosition1)
click2.addEventListener("click", getPosition2)
function getPosition1(){
    btn.style.left= 0+"px"; 
    displayDaily(dailyArray)  
}

function getPosition2(){
    btn.style.left= 110+"px"; 
    displayHourly()
}



function displayDaily(dailyArray){
    for(let j=0;j<7;j++){
        let dd = new Date((dailyArray[j].day)*1000)
        let mm;
        //console.log(dd)
        if(dd.getMonth()==0){
            mm='st'
        }
        else if(dd.getMonth()==1){
            mm='nd'
        }
        else if(dd.getMonth()==2){
            mm='rd'
        }
        else{
            mm='th'
        }
        document.querySelector('#day'+j).textContent = dayNames[dd.getDay()]+', '+monthName[dd.getMonth()]+' '+dd.getDate()+mm
        document.querySelector('#icon'+j).innerHTML=`<img src="icons/${dailyArray[j].icon}.png" style="width:40px;height:40px;">` 
        document.querySelector('#details'+j).textContent= dailyArray[j].detail
        document.querySelector('#maxTemp'+j).textContent= dailyArray[j].maxTemp
        document.querySelector('#minTemp'+j).textContent = dailyArray[j].minTemp
        //console.log(data.arr[j].maxTemp+" "+dailyArray[j].minTemp)
    }

    
       
}

function displayHourly(){
    console.log(hourlyArray)
    for(let j=0;j<8;j++){
        let dd = new Date((hourlyArray[j].day)*1000)
        //console.log(dd)
        document.querySelector('#day'+j).textContent = dayNames[dd.getDay()]
        document.querySelector('#icon'+j).innerHTML=`<img src="icons/${hourlyArray[j].icon}.png" style="width:40px;height:40px;">` 
        document.querySelector('#details'+j).textContent= hourlyArray[j].detail
        document.querySelector('#maxTemp'+j).textContent= hourlyArray[j].temp
        //console.log(data.arr[j].maxTemp+" "+dailyArray[j].minTemp)
    }
}

function displayBackground(background){
   if(background==='smoke' || background==='mist' || background==='haze' ||background==='dust' || background==='fog' || background==='sand' || background==='dust' || background==='ash'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/mist.jpg')";
    }
    else if(background==='clear'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/clearSky.jpg')";
    }
    else if(background==='clouds'){
        //"node src/app.js"
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/clouds.jpg')";
    }
    else if(background==='drizzle'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/drizzle.jpg')";
    }else if(background=== 'thunderstorm'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/thunder.jpg')";
    }
    else if(background==='snow'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/snow.jpg')";
    }
    else if(background==='squall'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/squall.jpg')";
    }
    else if(background==='tornado'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/tornado.jpg')";
    }
    else if(background==='rain'){
        document.body.style.backgroundImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),url('../wallpaper/rain.jpg')";
   
    }

}
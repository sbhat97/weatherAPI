//global variables
let citySearched = 'Atlanta'

//define funtion to use API:
let weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=38c15afc59b4cd327299f2d9a2f11807'
let weatherURLfour = 'http://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=38c15afc59b4cd327299f2d9a2f11807'
let weatherData
let weatherDatafour
var list
let entryCount = 1;
let entryID = [1];
//let allID = document.querySelectorAll("entryID")

//can be defined internally to save space
let node
let howMany
let contentArray
let index


//function to update panels:
function updatePanels(weatherData){
  let city = weatherData.name;
  let temp = ((weatherData.main.temp-273.15)*1.8)+32;
  temp = (Math.round(temp*10))/10;
  let wind = weatherData.wind.speed
  let humidity = weatherData.main.humidity

  document.getElementById("cityName").innerHTML = city;
  document.getElementById("temp").innerHTML = ('Temperature: '+temp + '°F');
  document.getElementById("windSpeed").innerHTML = ('Wind Speed: '+wind + 'm/s');
  document.getElementById("hum").innerHTML = ('Humidity: '+humidity + '%');
}

//function to panels for next four days:
function updateFour(weatherDatafour){
  let temp2 = ((weatherDatafour.list[11].main.temp-273.15)*1.8)+32;
  temp2 = (Math.round(temp2*10))/10;
  let wind2 = weatherDatafour.list[11].wind.speed;
  let hum2 = weatherDatafour.list[11].main.humidity;

  let temp3 = ((weatherDatafour.list[19].main.temp-273.15)*1.8)+32;
  temp3 = (Math.round(temp3*10))/10;
  let wind3 = weatherDatafour.list[19].wind.speed;
  let hum3 = weatherDatafour.list[19].main.humidity;

  let temp4 = ((weatherDatafour.list[27].main.temp-273.15)*1.8)+32;
  temp4 = (Math.round(temp4*10))/10;
  let wind4 = weatherDatafour.list[27].wind.speed;
  let hum4 = weatherDatafour.list[27].main.humidity;

  let temp5 = ((weatherDatafour.list[35].main.temp-273.15)*1.8)+32;
  temp5 = (Math.round(temp5*10))/10;
  let wind5 = weatherDatafour.list[35].wind.speed;
  let hum5 = weatherDatafour.list[35].main.humidity;

  document.getElementById("dayTwoTemp").innerHTML = ('Temperature: '+temp2 + '°F');
  document.getElementById("dayThreeTemp").innerHTML = ('Temperature: '+temp3 + '°F');
  document.getElementById("dayFourTemp").innerHTML = ('Temperature: '+temp4 + '°F');
  document.getElementById("dayFiveTemp").innerHTML = ('Temperature: '+temp5 + '°F');

  document.getElementById("dayTwoWind").innerHTML = ('Wind Speed: '+wind2 + 'm/s');
  document.getElementById("dayThreeWind").innerHTML = ('Wind Speed: '+wind3 + 'm/s');
  document.getElementById("dayFourWind").innerHTML = ('Wind Speed: '+wind4 + 'm/s');
  document.getElementById("dayFiveWind").innerHTML = ('Wind Speed: '+wind5 + 'm/s');

  document.getElementById("dayTwoHum").innerHTML = ('Humidity: '+hum2 + '%');
  document.getElementById("dayThreeHum").innerHTML = ('Humidity: '+hum3 + '%');
  document.getElementById("dayFourHum").innerHTML = ('Humidity: '+hum4 + '%');
  document.getElementById("dayFiveHum").innerHTML = ('Humidity: '+hum5 + '%');
}
//}

//function to update list:  include this in the query? non inputs to this function
// document.addEventListener("click",function(e){
//   console.log(e.target)
//   if(e.target.classList.contains("city")){
//     console.log("found the list item")
//   }
// })

function addCity(citySearched){

var newItem = document.createElement("li");
newItem.classList.add("city")

  var textnode = document.createTextNode(citySearched);
  newItem.appendChild(textnode);
  list = document.getElementById("citiesDisplayed")
  newItem.addEventListener("click",function(e){
    //console.log(e.target)
    console.log(e.target.textContent)
    getCityWeather(e.target.textContent)
  })

  node = list.firstElementChild;
  howMany = list.childElementCount;
  contentArray = [node.innerText];

  if (howMany>1){
  for (i=0; i < (howMany-1) ; i++){
    node = node.nextElementSibling
    var content = node.innerText
    contentArray.push(content)
  }
  }
  if (contentArray.indexOf(citySearched.toUpperCase()) >= 0){
    index = contentArray.indexOf(citySearched.toUpperCase());
    list.removeChild(list.childNodes[index])
  }
  entryCount++

  entryID.push(entryCount)


  newItem.id = entryCount.toString();
  list.insertBefore(newItem, list.childNodes[0]);


  //lazy workaround
  if ((citySearched.toUpperCase() === "ATLANTA") ){

    var atl = document.getElementById("1");
    atl.remove();
  }

  if (howMany > 10){
    list.removeChild(list.childNodes[howMany+1])
  }

}


//jquery for first API
getCityWeather("Atlanta")
		// $.ajax({
    //   url: weatherURL,
    //   type:"GET",
    //   success: function(data){
    //     console.log('success',data)
    //     weatherData = data
    //     updatePanels(weatherData)
    //   }
    // })
    //
    // $.ajax({
    //   url: weatherURLfour,
    //   type:"GET",
    //   success: function(data){
    //     console.log('success',data)
    //     weatherDatafour = data
    //     updateFour(weatherDatafour)
    //   }
    // })
//read the entry in the search box
//citySearched = document.getElementById("entry").value;

//check if the "enter" is pressed WHILE the search bar is active
//(ignore "enter" if search bar is not active)
window.addEventListener('keypress', function(e){
  valPressed = e.keyCode;
  let getFocus = document.getElementById('entry');
  if (valPressed == 13 && getFocus === document.activeElement){
    //call API function here
    citySearched = document.getElementById("entry").value;
    let weatherURL = ('http://api.openweathermap.org/data/2.5/weather?q='+ citySearched +'&appid=38c15afc59b4cd327299f2d9a2f11807')
    $.ajax({
      url: weatherURL,
      type:"GET",
      success: function(data){
        weatherData = data
        updatePanels(weatherData)
        addCity(citySearched)
      }
    })

    let weatherURLfour = ('http://api.openweathermap.org/data/2.5/forecast?q='+ citySearched +'&appid=38c15afc59b4cd327299f2d9a2f11807')
    $.ajax({
      url: weatherURLfour,
      type:"GET",
      success: function(data){
        console.log('success',data)
        weatherDatafour = data
        updateFour(weatherDatafour)
        //updatePanels(weatherData)
        //addCity(citySearched)
      }
    })
  //weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=38c15afc59b4cd327299f2d9a2f11807'
  //call function to add to ul list
}
})

//add another event listener for button click of the search
document.getElementById("searchIcon").addEventListener('click', function(){
  //call API function here (update citySearched and weatherURL)
  citySearched = document.getElementById("entry").value;
  getCityWeather(citySearched)
})

function getCityWeather(citySearched){
  let weatherURL = ('http://api.openweathermap.org/data/2.5/weather?q='+ citySearched +'&appid=38c15afc59b4cd327299f2d9a2f11807')
  $.ajax({
    url: weatherURL,
    type:"GET",
    success: function(data){
      weatherData = data
      updatePanels(weatherData)
      addCity(citySearched)
    }
  })
  let weatherURLfour = ('http://api.openweathermap.org/data/2.5/forecast?q='+ citySearched +'&appid=38c15afc59b4cd327299f2d9a2f11807')
  $.ajax({
    url: weatherURLfour,
    type:"GET",
    success: function(data){
      console.log('success',data)
      weatherDatafour = data
      updateFour(weatherDatafour)
    }
  })
}

  document.getElementById("1").addEventListener('click', function(){
    //call API function here (update citySearched and weatherURL)
    citySearched = document.getElementById("1").innerHTML;
    let weatherURL = ('http://api.openweathermap.org/data/2.5/weather?q='+ citySearched +'&appid=38c15afc59b4cd327299f2d9a2f11807')
    $.ajax({
      url: weatherURL,
      type:"GET",
      success: function(data){
        weatherData = data
        updatePanels(weatherData)
        addCity(citySearched)
      }
    })
    let weatherURLfour = ('http://api.openweathermap.org/data/2.5/forecast?q='+ citySearched +'&appid=38c15afc59b4cd327299f2d9a2f11807')
    $.ajax({
      url: weatherURLfour,
      type:"GET",
      success: function(data){
        console.log('success',data)
        weatherDatafour = data
        updateFour(weatherDatafour)
      }
    })

  })

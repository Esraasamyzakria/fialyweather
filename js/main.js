 const search=document.getElementById("search");
 const find =document.getElementById("find");
 const rowdata = document.querySelector("#rowdata");

 let array;
 async function getdate(type){
     let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=24cfbd38bc7743ebbfa154540241812&q=${type}&days=3`)
     let date =await response.json()
     console.log(date);
     display(date)
     
     
 }
 search.addEventListener("input",(e)=>{
    if(e.target.value.length  <4) return;
    getdate(e.target.value)

 })
 find.addEventListener("click",()=>{
    getdate(search.value)
 })
 function display(date){
    console.log(date)
    let array=date.forecast.forecastday;
    console.log(array);
    let location =date.location.name;

     let catrona =``;
     for (let i = 0; i < array.length; i++) {
       let x= getday(array[0].date)
       let y= getday(array[1].date)
       let z= getday(array[2].date)
        catrona=`
                                <div class=" col-md-4  shadow ">
                            <div class=" d-flex justify-content-between  color-1 py-2 px-2">
                                <span>${x.day}</span>
                                <span>19${x.month}</span>
                            </div>
                            <div class="colors py-3">
                                <span class=" ps-3 fs-4">${location}</span>
                                <h1>${date.current.temp_c} <sup>o</sup>C</h1>
                                <div class="">
                                    <img src="${array[0].day.condition.icon}" alt="" srcset="" width="100" height="100" class="ms-3 ">
                                </div>
                                <span class=" text-primary ps-4 fs-5">${array[0].day.condition.text}</span>
                                <div class="mt-5 ms-5">
                                    <span><img src="./image/icon-umberella.png" alt="" srcset="" width="20" height="20" class="ms-3 me-2">${array[i].day.avghumidity}%</span>
                                    <span><img src="./image/icon-wind.png" alt="" srcset="" width="20" height="20" class="ms-3 me-2 ">${array[i].day.maxwind_kph}km/h</span>
                                    <span><img src="./image/icon-compass.png" alt="" srcset="" width="20" height="20" class="ms-3 me-2">${date.current.wind_dir}</span>
                                </div>
                            </div>
                        </div>
                        <div class=" col-md-4  " >
                            <div class=" text-center py-2 color-2">
                                <span>${y.day}</span>
                            </div>
                            <div class=" colors-2 hl-50 d-flex flex-column justify-content-center align-items-center py-5">
                                <span><img src="${array[1].day.condition.icon}" alt="" srcset="" width="70" height="70" class="pb-3 mt-5"></span>
                                <h3 class=" text-white py-2 h2">${array[1].day.maxtemp_c} <sup>o</sup> C</h3>
                                <span class=" h4">${array[1].day.mintemp_c}<sup>o</sup> </span>
                                <span class=" text-primary pb-5 pt-3">${array[1].day.condition.text}</span>
                            </div>
                        </div>
                        <div class=" col-md-4  " >
                            <div class=" text-center py-2 color-1">
                                <span>${z.day}</span>
                            </div>
                            <div class=" colors hl-50 d-flex flex-column justify-content-center align-items-center py-5">
                                <span><img src="${array[2].day.condition.icon}" alt="" srcset="" width="70" height="70" class="pb-3 mt-5"></span>
                                <h3 class=" text-white py-2 h2">${array[2].day.maxtemp_c} <sup>o</sup> C</h3>
                                <span class=" h4">${array[2].day.mintemp_c}<sup>o</sup> </span>
                                <span class=" text-primary pb-5 pt-3">${array[2].day.condition.text}</span>
                            </div>
                        </div>`
        
     }
     rowdata.innerHTML=catrona
 }
 function getday(x){
    let date =new Date(x);
    let day =date.toLocaleDateString("en-Us",{weekday:"long"})
    let month =date.toLocaleDateString("en-Us",{month:"long"})

    console.log(day,month)
    return{day,month}
 }
 navigator.geolocation.getCurrentPosition(
    (data)=>{
        
        let x=data.coords.latitude;
        let Y=data.coords.longitude;
        getdate(`${x},${Y}`);

    },
    (err)=>{
        getdate("cairo")

    }
 )
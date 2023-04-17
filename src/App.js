import react, { useEffect, useState } from "react";
import city from './citys.json';

function App() {
  const [data,setdata]=useState("");
  const [weatherdetails,setweatherdetails]=useState(null);
  const [searchData,setsearchData]=useState([]);
  useEffect(() => {
    findWeather("bhopal")
  }, []);

  const eventHandlar =(e)=>{
    setdata(e.target.value);
    const filterdata=city.filter((value)=>{
      return(value.name.toLowerCase().includes(data.toLowerCase()));
    })
    setsearchData(filterdata);
    
  }
  const Search=(e)=>{
    findWeather(e,data);
  }
  const findWeather =(name)=>{
    let city_name=name;
    let API_key='00880af460ad9cae5b3ed30c41e488ff';
    let base_url=`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_key}`;
    fetch(base_url)
    .then(res =>res.json())
    .then(function(data){
      let img="http://openweathermap.org/img/w/"+data.weather[0].icon+".png"
      let Data ={
        name:city_name,
        Temp:data.main.temp,
        maxtemp:data.main.temp_max,
        mintemp:data.main.temp_min,
        image:img,
        discription:data.weather[0].description,
      }
      setweatherdetails(Data);
      setdata(city_name);
      setsearchData([])

    })
    .catch(err => console.log(err));
  }
 
  const clear=()=>{
    setdata("");
    setweatherdetails("");
    setsearchData([]);
    
  }
 
  return (
   <>
     <div className="container">
       <div className="search">
         <input type="text" placeholder="Search City...." onChange={eventHandlar} value={data}/> 
         <i className="ri-search-line" onClick={Search}></i>
         <i className="ri-close-line" onClick={clear}></i>
       </div>
       <div className="SearchItem">
        {
          searchData.slice(0,10).map((data,index)=>{
             return (<div className="Search" key={index} onClick={(e)=>findWeather(data.name)}>{data.name}</div>)
             })
        }
        
       </div>
       {
        weatherdetails?
        <div className="show">
        <h1>{weatherdetails.name}</h1>
         <h1> Tempratur = {weatherdetails.Temp} °C </h1>
         <h3>Max Temp = {weatherdetails.maxtemp} °C  | Min Temp =  {weatherdetails.mintemp} °C</h3>
         <img src={weatherdetails.image} alt="" />
         <h3>{weatherdetails.discription}</h3>
       </div>
       :
       <h1>No City Search</h1>
       }
      
     </div>
   </>
  );
  
}

export default App;

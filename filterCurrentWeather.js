exports.filterCurrentWeather = function (data) {
    console.log(data);
  return {
    location: data.location.name,
    country: data.location.country,
    region : data.location.region,
    localtime: data.location.localtime,

    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    // icon: data.current.condition.icon,
    
  };
}
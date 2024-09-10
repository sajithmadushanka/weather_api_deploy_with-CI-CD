// utils/filterCurrentWeather.js
exports.filterCurrentWeather = function (data) {
  return {
    location: data.location,
    country: data.location ? data.location.country : 'Unknown',
    region: data.location ? data.location.region : 'Unknown',
    localtime: data.location ? data.location.localtime : 'Unknown',
    temperature: data.current ? data.current.temp_c : 'Unknown',
    condition: data.current ? data.current.condition.text : 'Unknown',
    // icon: data.current && data.current.condition ? data.current.condition.icon : 'Unknown',
  };
};

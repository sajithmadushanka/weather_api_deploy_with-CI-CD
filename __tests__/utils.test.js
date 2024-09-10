// __tests__/utils.test.js
const { filterCurrentWeather } = require('../utils/filterCurrentWeather');

describe('filterCurrentWeather', () => {
  it('should handle missing fields gracefully', () => {
    const inputData = {
      location: {
        name: 'Paris',
        country: 'France',
        // 'region' and 'localtime' are missing
      },
      current: {
        temp_c: 15,
        condition: {
          text: 'Cloudy',
          // 'icon' is missing
        },
      },
    };

    const expectedOutput = {
      location: 'Paris',
      country: 'France',
      region: undefined,     // Expect 'Unknown' for missing 'region'
      localtime: undefined,  // Expect 'Unknown' for missing 'localtime'
      temperature: 15,
      condition: 'Cloudy',
    };

    const result = filterCurrentWeather(inputData);
    expect(result).toEqual(expectedOutput);
  });
});

import { useQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "./api";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetchWeatherData({ lat: 50, lon: 50 }),
  });

  return (
    <>
      <h1>Welcome to Weather App!</h1>
      {data && (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {data.current.temp}°C</p>
          <p>Humidity: {data.current.humidity}%</p>
        </div>
      )}
    </>
  );
};

export default App;

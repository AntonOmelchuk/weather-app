import { useQuery } from "@tanstack/react-query";

import { fetchWeatherData } from "./api";
import Card from "./components/cards/Card";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () => fetchWeatherData({ lat: 50, lon: 50 }),
  });

  return (
    <>
      <h1>Welcome to Weather App!</h1>
      <Card title="Current Weather">{data?.current.temp}</Card>
      <HourlyForecast />
      <DailyForecast />
    </>
  );
};

export default App;

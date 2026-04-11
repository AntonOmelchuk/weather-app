import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";

const App = () => {
  return (
    <>
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
    </>
  );
};

export default App;

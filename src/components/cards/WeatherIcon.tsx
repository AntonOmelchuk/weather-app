type Props = {
  icon: string;
  alt: string;
};

const WeatherIcon = ({ icon, alt }: Props) => {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      className="size-8"
      alt={alt}
    />
  );
};

export default WeatherIcon;

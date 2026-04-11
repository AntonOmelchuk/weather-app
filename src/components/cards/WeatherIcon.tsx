import clsx from "clsx";

type Props = {
  icon: string;
  alt: string;
  className?: string;
};

const WeatherIcon = ({ icon, alt, className }: Props) => {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      className={clsx("size-8", className)}
      alt={alt}
    />
  );
};

export default WeatherIcon;

type Props = {
  title: string;
  data: string;
};

const CurrentWeatherBlock = ({ title, data }: Props) => {
  return (
    <div className="flex flex-col justify-center xs:items-center gap-2">
      <p className="text-sl text-gray-500 text-center">{title}</p>
      <p className="text-sl xs:text-2xl font-bold">{data}</p>
    </div>
  );
};

export default CurrentWeatherBlock;

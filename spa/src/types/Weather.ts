export type WeatherInfo = {
  hour: Date;
  temp: number;
  display: {
    description: string;
    emoji: string;
  };
};

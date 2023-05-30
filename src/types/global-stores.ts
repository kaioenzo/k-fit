export type UserStore = {
  name: string;
  image?: string;
  email: string;
  waterLevel: number;
  waterPerDayInML?: number;
  doseOfWater: number;
  startNotificationHour: string;
  endNotificationHour: string;
  breaks: number;
  breaksMinutes: number;
};

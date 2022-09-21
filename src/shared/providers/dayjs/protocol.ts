type IDateProvider = {
  diffDateInHours(end_date: Date): number;
  diffDateInDays(end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfDateIsBefore(start_date: Date, end_date: Date): boolean;
};

export { IDateProvider };

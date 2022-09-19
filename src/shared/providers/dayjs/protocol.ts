type IDateProvider = {
  diffDateInHours(end_date: Date): number;
  diffDateInDays(end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
};

export { IDateProvider };

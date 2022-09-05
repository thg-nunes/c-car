type IDateProvider = {
  diffDateInHours(end_date: Date): number;
  diffDateInDays(end_date: Date): number;
};

export { IDateProvider };

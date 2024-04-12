export class StartDate {
  private _startDate: Date;

  constructor(startDate: Date) {
    this._startDate = startDate;
  }

  static createFromDate(startDate: Date): StartDate {
    return new StartDate(startDate);
  }

  static createFromString(startDate: string): StartDate {
    return new StartDate(new Date(startDate));
  }

  get value(): Date {
    return this._startDate;
  }
}

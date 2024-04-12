export class EndDate {
  private _endDate: Date;

  constructor(endDate: Date) {
    this._endDate = endDate;
  }

  static createFromDate(endDate: Date): EndDate {
    return new EndDate(endDate);
  }

  static createFromString(endDate: string): EndDate {
    return new EndDate(new Date(endDate));
  }

  get value(): Date {
    return this._endDate;
  }
}

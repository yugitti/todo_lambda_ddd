export class Title {
  private _title: string;

  // limitation
  static readonly maxLength = 30;

  constructor(title: string) {
    if (title.length > Title.maxLength) {
      throw new Error('Title is too long');
    }
    this._title = title;
  }

  static create(title: string): Title {
    return new Title(title);
  }

  get value(): string {
    return this._title;
  }
}

export class Description {
  private _description: string;

  // limitation
  static readonly maxLength = 200;

  constructor(description: string) {
    if (description.length > Description.maxLength) {
      throw new Error('Description is too long');
    }
    this._description = description;
  }

  static create(description: string): Description {
    return new Description(description);
  }

  get value(): string {
    return this._description;
  }
}

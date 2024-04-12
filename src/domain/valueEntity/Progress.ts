import { ProgressValue } from '../enum/ProgressEnum';

export class Progress {
  private _progress: ProgressValue;

  constructor(progress: ProgressValue) {
    this._progress = progress;
  }

  static createFromEnum(progress: ProgressValue): Progress {
    return new Progress(progress);
  }

  static createFromString(progress: string): Progress {
    return new Progress(progress as ProgressValue);
  }

  get value(): ProgressValue {
    return this._progress;
  }
}

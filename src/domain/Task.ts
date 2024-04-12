import { TaskId } from './valueEntity/TaskId';
import { Title } from './valueEntity/Title';
import { Description } from './valueEntity/Description';
import { DeleteStatus } from './valueEntity/DeleteStatus';
import { StartDate } from './valueEntity/StartDate';
import { EndDate } from './valueEntity/EndDate';
import { Category } from './valueEntity/Category';
import { Progress } from './valueEntity/Progress';
import { DeleteStatusEnum } from './enum/DeleteStatusEnum';

interface ITaskRequired {
  id: TaskId;
  projectId: string;
  groupId: string;
}

interface ITaskOptional {
  title?: Title;
  description?: Description;
  isDone?: boolean;
  deleteStatus?: DeleteStatus;
  startDate?: StartDate;
  endDate?: EndDate;
  category?: Category;
  progress?: Progress;
}

export class Task {
  readonly id: TaskId;
  readonly projectId: string;
  readonly groupId: string;
  private _title: Title;
  private _description: Description;
  private _isDone: boolean;
  private _deleteStatus: DeleteStatus;
  // allow undefined
  private _startDate?: StartDate;
  private _endDate?: EndDate;
  private _category?: Category;
  private _progress?: Progress;

  // defalut value
  readonly defaultTitle = new Title('No Title');
  readonly defaultDescription = new Description('');
  readonly defaultIsDone = false;
  readonly defaultDeleteStatus = new DeleteStatus(DeleteStatusEnum.NotDeleted);

  constructor(required: ITaskRequired, optional: ITaskOptional = {}) {
    // required fields
    this.id = required.id;
    this.projectId = required.projectId;
    this.groupId = required.groupId;

    // set initial value if undefined
    this._title = optional.title ?? this.defaultTitle;
    this._description = optional.description ?? this.defaultDescription;
    this._isDone = optional.isDone ?? this.defaultIsDone;
    this._deleteStatus = optional.deleteStatus ?? this.defaultDeleteStatus;

    // allow undefined
    this._startDate = optional.startDate;
    this._endDate = optional.endDate;
    this._category = optional.category;
    this._progress = optional.progress;

    // helper
  }

  static create(required: ITaskRequired, optional: ITaskOptional = {}): Task {
    return new Task(required, optional);
  }

  // title
  get title(): Title {
    return this._title;
  }
  changeTitle(title: Title): void {
    this._title = title;
  }

  // description
  get description(): Description {
    return this._description;
  }
  changeDescription(description: Description): void {
    this._description = description;
  }

  // isDone
  get isDone(): boolean {
    return this._isDone;
  }
  changeIsDone(isDone: boolean): void {
    this._isDone = isDone;
  }

  // isDeleted
  get deleteStatus(): DeleteStatus {
    return this._deleteStatus;
  }
  changeDeleteStatus(changeValue: DeleteStatus): void {
    // not allow if current status is "NotDeleted" and change to "PermanentlyDeleted
    if (
      this._deleteStatus.value === DeleteStatusEnum.NotDeleted &&
      changeValue.value === DeleteStatusEnum.PermanentlyDeleted
    ) {
      throw new Error('Cannot delete a non-deleted entity');
    }
    // not allow if current status is "PermanentlyDeleted"
    if (this._deleteStatus.value === DeleteStatusEnum.PermanentlyDeleted) {
      throw new Error('Cannot change the status of a permanently deleted entity');
    }
    this._deleteStatus = changeValue;
  }

  // startDate
  get startDate(): StartDate | undefined {
    return this._startDate;
  }
  changeStartDate(startDate: StartDate): void {
    this._startDate = startDate;
  }

  // endDate
  get endDate(): EndDate | undefined {
    return this._endDate;
  }
  changeEndDate(endDate: EndDate) {
    this._endDate = endDate;
  }

  // category
  get category(): Category | undefined {
    return this._category;
  }
  changeCategory(category: Category): void {
    this._category = category;
  }

  // progress
  get progress(): Progress | undefined {
    return this._progress;
  }
  changeProgress(progress: Progress): void {
    this._progress = progress;
  }

  changeOptionalFields(optional: ITaskOptional): void {
    const changeFields: { [K in keyof ITaskOptional]: (value: any) => void } = {
      title: this.changeTitle,
      description: this.changeDescription,
      isDone: this.changeIsDone,
      deleteStatus: this.changeDeleteStatus,
      startDate: this.changeStartDate,
      endDate: this.changeEndDate,
      category: this.changeCategory,
      progress: this.changeProgress,
    };

    Object.keys(optional).forEach((key) => {
      const property = key as keyof ITaskOptional;
      if (optional[property] !== undefined && changeFields[property]) {
        changeFields[property]?.(optional[property]);
      }
    });
  }
}

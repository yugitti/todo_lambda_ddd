import { v4 as uuidv4 } from 'uuid';

export class TaskId {
  private _taskId: string;

  constructor(taskId: string) {
    this._taskId = taskId;
  }

  static generate(): TaskId {
    const uuid = uuidv4();
    return new TaskId(uuid);
  }

  get taskId(): string {
    return this._taskId;
  }
}

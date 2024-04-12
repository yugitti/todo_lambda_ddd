import { DeleteStatusEnum, DeleteStatusValue } from '../enum/DeleteStatusEnum';

export class DeleteStatus {
  private _deleteStatus: DeleteStatusValue;

  constructor(deleteStatus: DeleteStatusValue) {
    this._deleteStatus = deleteStatus;
  }

  static createFromEnum(deleteStatus: DeleteStatusValue): DeleteStatus {
    return new DeleteStatus(deleteStatus);
  }

  static createFromBoolean(isDeleted: boolean): DeleteStatus {
    // if isDeleted is true, TentativeDelete, else return NotDeleted
    // not allow to create PermanentDelete by client
    const deleteStatus = isDeleted ? DeleteStatusEnum.TentativelyDeleted : DeleteStatusEnum.NotDeleted;
    return new DeleteStatus(deleteStatus);
  }

  get value(): DeleteStatusValue {
    return this._deleteStatus;
  }
}

//// Delete Status Object

import { fromKeyToValue, fromValueToKey } from '../../shared/utility/enumHelper';

export const DeleteStatusEnum = {
  NotDeleted: 'NotDeleted',
  TentativelyDeleted: 'TentativelyDeleted',
  PermanentlyDeleted: 'PermanentlyDeleted',
} as const;

export type DeleteStatusKey = keyof typeof DeleteStatusEnum;
export type DeleteStatusValue = typeof DeleteStatusEnum[keyof typeof DeleteStatusEnum];

// helper functions
export const deleteStatusKey = (value: DeleteStatusValue): DeleteStatusKey => fromValueToKey(DeleteStatusEnum, value);
export const deleteStatusValue = (key: DeleteStatusKey): DeleteStatusValue => fromKeyToValue(DeleteStatusEnum, key);

import { fromValueToKey, fromKeyToValue } from '../../shared/utility/enumHelper';

const ProgressEnum = {
  NotStarted: 'NotStarted',
  InProgress: 'InProgress',
  Completed: 'Completed',
  Stopped: 'Stopped',
  Canceled: 'Canceled',
  Pending: 'Pending',
  Others: 'Others',
} as const;

export type ProgressKey = keyof typeof ProgressEnum;
export type ProgressValue = typeof ProgressEnum[keyof typeof ProgressEnum];

// helper functions
export const progressKey = (value: ProgressValue): ProgressKey => fromValueToKey(ProgressEnum, value);
export const progressValue = (key: ProgressKey): ProgressValue => fromKeyToValue(ProgressEnum, key);

import { CategoryValue } from '../../../domain/enum/CategoryEnum';
import { DeleteStatusValue } from '../../../domain/enum/DeleteStatusEnum';
import { ProgressValue } from '../../../domain/enum/ProgressEnum';

export type TaskRes = {
  id: string;
  projectId: string;
  groupId: string;
  title?: string;
  description?: string;
  isDone?: boolean;
  deleteStatus?: DeleteStatusValue;
  startDate?: Date;
  endDate?: Date;
  category?: CategoryValue;
  progress?: ProgressValue;
};

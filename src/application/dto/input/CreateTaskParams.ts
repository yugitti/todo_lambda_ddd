import { DeleteStatusValue } from '../../../domain/enum/DeleteStatusEnum';
import { CategoryValue } from '../../../domain/enum/CategoryEnum';
import { ProgressValue } from '../../../domain/enum/ProgressEnum';

export type CreateTaskParam = {
  required: {
    projectId: string;
    groupId: string;
  };
  optional: {
    title?: string;
    description?: string;
    isDone?: boolean;
    deleteStatus?: DeleteStatusValue;
    startDate?: Date;
    endDate?: Date;
    category?: CategoryValue;
    progress?: ProgressValue;
  };
};

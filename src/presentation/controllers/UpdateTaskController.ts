////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { validate } from '../validation/TaskValidator';
import { IUpdateTaskUsecase } from '../../application/usecases/UpdateTaskUsecase';
import { IControllerResponse } from '../../shared/interfaces/IControllerResponse';

import { TaskValidateSchma } from '../validation/schema/TaskUpdateSchema';

interface ITaskUpdateInput {
  id: string;
  groupId: string;
  title?: string;
  description?: string;
  projectId?: string;
  isDone?: boolean;
  isDeleted?: boolean;
  startDate?: string;
  endDate?: string;
  category?: string;
  progress?: string;
}

/// lambda handler case
export const TaskUpdateController = async (
  body: { [key: string]: any },
  taskUsecase: IUpdateTaskUsecase,
): Promise<IControllerResponse> => {
  // validate
  const inputData = validate<ITaskUpdateInput>(TaskValidateSchma, body);

  // dto
  const { groupId, id: taskId, ...optional } = inputData;

  // usecase
  const res = await taskUsecase.run({
    required: { groupId, taskId },
    optional,
  });

  // return
  return { statusCode: 200, body: res };
};

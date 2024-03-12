////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { validate } from '../validation/TaskValidator';
import { IUsecase } from '../../application/interfaces/ITaskUsecase';
import { ITaskGetInput } from '../interfaces/ITaskGet';
import { IControllerResponse } from '../interfaces/IControllerResponse';

import { TaskValidateSchma } from '../validation/schema/TaskGetSchema';

/// lambda handler case
export const TaskGetController = async (
  body: { [key: string]: any },
  taskUsecase: IUsecase,
): Promise<IControllerResponse> => {
  // validate
  const inputData = validate<ITaskGetInput>(TaskValidateSchma, body);

  // dto

  // usecase
  const res = await taskUsecase.fetchTask(inputData.groupId, inputData.id);

  // return
  return { statusCode: 200, body: res };
};

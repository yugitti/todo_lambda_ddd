////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { validate } from '../validation/TaskValidator';
import { IUsecase } from '../../application/interfaces/ITaskUsecase';
import { ITaskDeleteInput } from '../interfaces/ITaskDelete';
import { IControllerResponse } from '../interfaces/IControllerResponse';

import { TaskValidateSchma } from '../validation/schema/TaskGetSchema';

/// lambda handler case
export const TaskDeleteController = async (
  body: { [key: string]: any },
  taskUsecase: IUsecase,
): Promise<IControllerResponse> => {
  // validate
  const inputData = validate<ITaskDeleteInput>(TaskValidateSchma, body);

  // dto

  // usecase
  const res = await taskUsecase.deleteTask(inputData.groupId, inputData.id);

  // return
  return { statusCode: 200, body: {} };
};

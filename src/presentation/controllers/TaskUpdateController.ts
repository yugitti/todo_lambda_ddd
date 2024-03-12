////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { validate } from '../validation/TaskValidator';
import { IUsecase } from '../../application/interfaces/ITaskUsecase';
import { ITaskUpdateInput } from '../interfaces/ITaskUpdate';
import { IControllerResponse } from '../interfaces/IControllerResponse';

import { TaskValidateSchma } from '../validation/schema/TaskUpdateSchema';

/// lambda handler case
export const TaskUpdateController = async (
  body: { [key: string]: any },
  taskUsecase: IUsecase,
): Promise<IControllerResponse> => {
  // validate
  const inputData = validate<ITaskUpdateInput>(TaskValidateSchma, body);

  // dto

  // usecase
  const res = await taskUsecase.updateTask(inputData);

  // return
  return { statusCode: 200, body: res };
};

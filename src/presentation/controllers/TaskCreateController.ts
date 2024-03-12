////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { validate } from '../validation/TaskValidator';
import { IUsecase } from '../../application/interfaces/ITaskUsecase';
import { ITaskCreateInput } from '../interfaces/ITaskCreate';
import { IControllerResponse } from '../interfaces/IControllerResponse';

import { TaskValidateSchma } from '../validation/schema/TaskCreateSchema';

/// lambda handler case
export const TaskCreateController = async (
  body: { [key: string]: any },
  taskUsecase: IUsecase,
): Promise<IControllerResponse> => {
  // validate
  const inputData = validate<ITaskCreateInput>(TaskValidateSchma, body);

  // dto

  // usecase
  const res = await taskUsecase.createTask(inputData.projectId, inputData.groupId);

  // return
  return { statusCode: 200, body: res };
};

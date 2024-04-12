////////////////////////////////////////////////
// Common controller for task processing
////////////////////////////////////////////////
import { validate } from '../validation/TaskValidator';
import { ICreateTaskUsecase } from '../../application/usecases/CreateTaskUsecase';
import { IControllerResponse } from '../../shared/interfaces/IControllerResponse';

import { TaskValidateSchma } from '../validation/schema/TaskCreateSchema';

interface ITaskCreateInput {
  projectId: string;
  groupId: string;
}

/// lambda handler case
export const TaskCreateController = async (
  body: { [key: string]: any },
  usecase: ICreateTaskUsecase,
): Promise<IControllerResponse> => {
  // validate
  const inputData = validate<ITaskCreateInput>(TaskValidateSchma, body);

  // dto

  // usecase
  const res = await usecase.run({
    required: {
      projectId: inputData.projectId,
      groupId: inputData.groupId,
    },
    optional: {},
  });

  // return
  return { statusCode: 200, body: res };
};

import { IRepository } from '../../domain/repository/IRepository';
import { TaskRes } from '../dto/output/TaskRes';
import { mapTaskToResponse } from '../mapper/mapTaskToResponse';

export interface IFindTaskByTaskIdUsecase {
  run: (groupId: string, taskId: string) => Promise<TaskRes | undefined>;
}

export const FindTaskByTaskIdUsecase = (repository: IRepository): IFindTaskByTaskIdUsecase => ({
  run: async (groupId: string, taskId: string) => {
    const task = await repository.findTaskByTaskId(groupId, taskId);
    return task ? mapTaskToResponse(task) : undefined;
  },
});

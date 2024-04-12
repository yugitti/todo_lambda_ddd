import { DeleteStatusEnum } from '../../domain/enum/DeleteStatusEnum';
import { IRepository } from '../../domain/repository/IRepository';
import { DeleteStatus } from '../../domain/valueEntity/DeleteStatus';
import { TaskRes } from '../dto/output/TaskRes';
import { mapTaskToResponse } from '../mapper/mapTaskToResponse';

export interface IDeleteTaskUsecase {
  run: (groupId: string, taskId: string) => Promise<TaskRes>;
}

export const DeleteTaskUsecase = (repository: IRepository): IDeleteTaskUsecase => ({
  run: async (groupId: string, taskId: string): Promise<TaskRes> => {
    // Find the task by groupId and taskId
    const task = await repository.findTaskByTaskId(groupId, taskId);

    // If the task is not found, throw an error
    if (!task) {
      throw new Error('Task not found');
    }

    // Change the delete status to TentativelyDeleted
    task.changeDeleteStatus(new DeleteStatus(DeleteStatusEnum.TentativelyDeleted));

    // Update the task
    await repository.updateTask(task);

    // reture the updated task
    return mapTaskToResponse(task);
  },
});

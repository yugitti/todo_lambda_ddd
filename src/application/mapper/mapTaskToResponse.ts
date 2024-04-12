import { Task } from '../../domain/Task';
import { TaskRes } from '../dto/output/TaskRes';

export const mapTaskToResponse = (task: Task): TaskRes => {
  return {
    id: task.id.taskId,
    projectId: task.projectId,
    groupId: task.groupId,
    title: task.title.value,
    description: task.description.value,
    isDone: task.isDone,
    deleteStatus: task.deleteStatus.value,
    startDate: task.startDate?.value,
    endDate: task.endDate?.value,
    category: task.category?.value,
    progress: task.progress?.value,
  };
};

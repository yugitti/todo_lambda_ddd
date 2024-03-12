export interface ITask {
  id: string;
  title: string;
  description: string;
  projectId: string;
  groupId: string;
  isDone: boolean;
  isDeleted: boolean;
  createAt: string;
  updateAt: string;
  startDate: string;
  endDate: string;
  category: string;
  progress: string;
}

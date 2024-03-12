export interface ITaskUpdateInput {
  id: string;
  groupId: string;
  task?: string;
  description?: string;
  projectId?: string;
  isDone?: boolean;
  isDeleted?: boolean;
  startDate?: string;
  endDate?: string;
  category?: string;
  progress?: string;
}

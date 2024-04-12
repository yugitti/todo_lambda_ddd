export type UpdateTaskParams = {
  required: {
    taskId: string;
    groupId: string;
  };
  optional: {
    title?: string;
    description?: string;
    isDone?: boolean;
    isDeleted?: boolean;
    startDate?: string;
    endDate?: string;
    category?: string;
    progress?: string;
  };
};

import Ajv, { JSONSchemaType } from 'ajv';
import { ITaskUpdateInput } from '../../interfaces/ITaskUpdate';

export const TaskValidateSchma: JSONSchemaType<ITaskUpdateInput> = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'groupId'],
  properties: {
    id: { type: 'string' },
    groupId: { type: 'string' },
    task: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    projectId: { type: 'string', nullable: true },
    isDone: { type: 'boolean', nullable: true },
    isDeleted: { type: 'boolean', nullable: true },
    startDate: { type: 'string', format: 'date-time', nullable: true },
    endDate: { type: 'string', format: 'date-time', nullable: true },
    category: { type: 'string', nullable: true },
    progress: { type: 'string', nullable: true },
  },
};

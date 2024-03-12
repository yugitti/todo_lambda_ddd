import Ajv, { JSONSchemaType } from 'ajv';
import { ITaskCreateInput } from '../../interfaces/ITaskCreate';

export const TaskValidateSchma: JSONSchemaType<ITaskCreateInput> = {
  type: 'object',
  additionalProperties: false,
  required: ['projectId', 'groupId'],
  properties: {
    projectId: { type: 'string' },
    groupId: { type: 'string' },
  },
};

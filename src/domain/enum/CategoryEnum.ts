import { fromValueToKey, fromKeyToValue } from '../../shared/utility/enumHelper';
const CategoryEnum = {
  Planning: 'Planning',
  Design: 'Design',
  Development: 'Development',
  Testing: 'Testing',
  Deployment: 'Deployment',
  Maintenance: 'Maintenance',
  Others: 'Others',
} as const;

export type CategoryKey = keyof typeof CategoryEnum;
export type CategoryValue = typeof CategoryEnum[keyof typeof CategoryEnum];

// helper functions
export const categoryKey = (value: CategoryValue): CategoryKey => fromValueToKey(CategoryEnum, value);
export const categoryValue = (key: CategoryKey): CategoryValue => fromKeyToValue(CategoryEnum, key);

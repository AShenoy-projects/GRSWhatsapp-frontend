import { IgrsFile } from './Igrsfile';

export type SortColumn = keyof IgrsFile | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

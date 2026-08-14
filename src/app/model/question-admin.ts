import { OptionAdmin } from './option-admin';

export interface QuestionAdmin {
  id?: number;
  questionText: string;
  marks: number;
  options: OptionAdmin[];
}
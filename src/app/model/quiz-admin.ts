import { QuestionAdmin } from './question-admin';

export interface QuizAdmin {
  id?: number;
  title: string;
  description: string;
  questions: QuestionAdmin[];
  duration:number;
}
import { CommentTypeList } from "./CommentTypeList";

export interface CommentMdl {
readonly  ID?: string,
  TaskID?: number,
  Comment?: string,
  CommentType?: CommentTypeList,
  ReminderDate?: Date
} 

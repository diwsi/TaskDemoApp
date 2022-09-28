import { CommentTypeList } from "./CommentTypeList";

export interface CommentMdl {
  ID?: string,
  TaskID?: number,
  Comment?: string,
  CommentType?: CommentTypeList,
  ReminderDate?: Date
} 

import { CommentTypeList } from "./CommentTypeList";

export interface CommentMdl {
readonly  ID?: string,
  TaskID?: string,
  Comment?: string,
  CommentType?: CommentTypeList,
  ReminderDate?: Date
  ReminderDateStr?: string
} 

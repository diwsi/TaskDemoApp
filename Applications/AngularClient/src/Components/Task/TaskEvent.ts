import { TaskMdl } from "../../Models/TaskMdl";
import { TaskEventList } from "./TaskEventList";

export interface TaskEvent {
  Type: TaskEventList,
  Task: TaskMdl,

}

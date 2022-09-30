import { TaskMdl } from "../../Models/TaskMdl";
import { TaskEventList } from "./TaskEventList";

/**  Task form event abstraction */
export interface TaskEvent {
  Type: TaskEventList,
  Task: TaskMdl,

}

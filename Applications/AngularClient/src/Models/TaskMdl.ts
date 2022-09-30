import { FormMode } from "./FormMode";
import { TaskStatusList } from "./TaskStatusList";
import { TaskTypeList } from "./TaskTypeList";
import { UserMdl } from "./UserMdl";

export interface TaskMdl {
  ID?: string,
  CreatedDate?: Date,
  RequiredByDate?: Date,
  Description?: string,
  TaskStatus?: TaskStatusList,
  TaskType?: TaskTypeList,
  AssignedTo?: number,
  AssignedToName?: number,
  User?: UserMdl,
  NextActionDate?: Date,
  Mode?: FormMode  
} 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../Components/TaskList/task.list.component').then(c => c.TaskListComponent)
  },
  {
    path: 'comment',
    loadComponent: () => import('../Components/Comments/comment.list.component').then(c => c.CommentListComponent)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

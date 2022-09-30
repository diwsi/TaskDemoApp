import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TaskService } from '../../Services/TaskService';
import { TaskComponent } from '../Task/task.component'; 
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'comments',
  standalone: true,
  imports: [CommonModule, TaskComponent, RouterModule],
  templateUrl: './comment.list.component.html',
  styleUrls: ['./comment.list.component.css']
})
export class CommentListComponent implements OnInit {
   
  constructor(private taskService: TaskService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
     
    this.registerCommands();
  }
   
  registerCommands(): void {

    this.route.queryParams.subscribe(params => {
       
 
    })
  }

}

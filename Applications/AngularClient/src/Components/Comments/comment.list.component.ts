import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { TaskComponent } from '../Task/task.component'; 
import { ActivatedRoute,   RouterModule } from '@angular/router'; 
import { CommandService } from '../../Services/CommandService';
import { CommentService } from '../../Services/CommentService';
import { CommentMdl } from '../../Models/CommentMdl';
import { CommentTypeList } from '../../Models/CommentTypeList';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'comments',
  standalone: true,
  imports: [CommonModule, TaskComponent, RouterModule, FormsModule],
  templateUrl: './comment.list.component.html',
  styleUrls: ['./comment.list.component.css']
})
export class CommentListComponent implements OnInit {
  TaskID: string | undefined = undefined;
  comments: CommentMdl[] = [];
  comment: CommentMdl = {}
  commentType = CommentTypeList;
  constructor(private commentService: CommentService, private commandService: CommandService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
     
    this.registerCommands();
  }

  loadComments(id: string, selected: string | undefined = undefined): void {
    if (id == this.TaskID) {
      return;
    }
    this.TaskID = id;
    this.commentService.List([{
      'TaskID': id
    }]).subscribe(result => {
      this.comments = result
      if (selected) {
        let cmm = this.comments.find(d => d.ID == selected);
        if (cmm) {
          this.comment = cmm;
        }
      }
    })
  }
   
  registerCommands(): void {
    this.route.queryParams.subscribe(params => {

      switch (params[this.commandService.PREF_COMMAND]) {
        case this.commandService.PREF_ID:
          this.loadComments(params[this.commandService.PREF_ID]);
          break;
        case this.commandService.PREF_EDIT:
          
          break;
        default:
      }

      
    })
  }


  Save(): void {
   
    this.comment.TaskID = this.TaskID;
    if (this.commentType) {
      this.comment.CommentType = Number(this.comment.CommentType);
    }
    this.commentService.Save(this.comment).subscribe(result => {
      this.comments.push(result)
      this.comment = {}
      
    });
  }

}

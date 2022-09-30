import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';  
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
  /**  Related task id of comments */
  TaskID: string | undefined = undefined;
  /** loaded coments */
  comments: CommentMdl[] = [];
  /** cuurnet comment to edit */
  comment: CommentMdl = {}

  commentType = CommentTypeList;
  constructor(private commentService: CommentService, private commandService: CommandService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
     
    this.registerCommands();
  }

  /**  List  Comments */
  loadComments(id: string, editID: string | undefined = undefined): void {
    if (id == this.TaskID) {
      this.edit(editID);
      return;
    }
     
    this.TaskID = id;
    this.commentService.List("?TaskID="+id).subscribe(result => {
      this.comments = result
      this.edit(editID);
    })
  }

  /**  Edist a Comment */
  edit(id: string | undefined): void {
    debugger
    if (!id) {
      return;
    }
    let toEdit = this.comments.find(d => d.ID == id);
    if (toEdit?.ReminderDate) {
      toEdit.ReminderDateStr = toEdit.ReminderDate.toString().split("T")[0];  
    }

    this.comment = { ...toEdit };
  }

  /**  Map events to routes */
  registerCommands(): void {
    this.route.queryParams.subscribe(params => {
      let id = params[this.commandService.PREF_ID];
      var edit = params[this.commandService.PREF_EDIT];
      if (id) {
        this.loadComments(id, edit);
      } 
    })
  }

  /**  Send model to service */
  Save(): void {
   
    this.comment.TaskID = this.TaskID;
    if (this.commentType) {
      this.comment.CommentType = Number(this.comment.CommentType);
    }
    if (this.comment.ReminderDateStr) {
      this.comment.ReminderDate = new Date(this.comment.ReminderDateStr); 
    }
    this.commentService.Save(this.comment).subscribe(result => { 
      var ref = this.comments.find(d => d.ID == result.ID);
      if (!ref) {
        this.comments.push(result);
      } else {
        var commentInd = this.comments.indexOf(ref);
        this.comments[commentInd] = result;
      }
      this.commandService.SetComand({ edit:'' })
      this.comment = {}
      
    });
  }

  /**  remove comment */
  Delete(id: string | undefined): void {
    if (!id) return;
    if (confirm("Do you want to delete this comment?")) {
      this.commentService.Delete(id).subscribe(result => {
        this.comments = this.comments.filter(d => d.ID != id);
      });

    }
  }

}

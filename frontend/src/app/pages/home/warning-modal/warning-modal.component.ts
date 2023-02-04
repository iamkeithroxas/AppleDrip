import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { AuthService } from '../../service/auth.service';
import { Post } from '../../model/post';
import { OnInit, Input } from '@angular/core';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css'],
})
export class WarningModalComponent {
  @Input() fromParent: any;
  constructor(
    private postService: PostService,
    private modalService: NgbModal
  ) {}

  decline() {
    const modalRef = this.modalService.dismissAll();
  }

  confirm() {
    this.postService.DeletePost(this.fromParent).subscribe(data=>{
      window.location.reload()
    });
  }
}

import { Component } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile } from '../model/user-profile';
import { FeedModel } from '../model/feed.model';
import { AuthService } from '../service/auth.service';
import { GroupService } from '../service/group.service';
import { GroupModel } from '../model/group'
import {joinedGroupModel} from '../model/user_groups'
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { EditPostModalComponent } from './edit-post-modal/edit-post-modal.component';
import { WarningModalComponent } from './warning-modal/warning-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss'],
})
export class HomeComponent {
  public textArea: string = '';
  public isEmojiPickerVisible: boolean = false;

  post: string = '';
  hasImage: boolean = false;
  ImageFile = [];
  ImageSrc: string | SafeUrl =
    'https://images.unsplash.com/photo-1521911528923-9c3838123490?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
  postButton: boolean = true;
  UserId: number = 1;
  firstname?: string;
  lastname?: string;
  email?: string;

  feeds: FeedModel[] = [];
  UserToken: UserProfile[] = [];
  u_groups: joinedGroupModel[] = [];

  jwtHelper = new JwtHelperService();

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private groupService: GroupService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.fetchPosts();
    this.fetchUserGroups();
  }

  public addEmoji(event: any) {
    this.post = `${this.post}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  getUserProfile() {
    var data = JSON.parse(localStorage.getItem('user')!);
    console.log(data);
    if (data != null) {
      this.UserId = data.id;
      this.firstname = data.first_name;
      this.lastname = data.last_name;
      this.email = data.email;
    }
  }

  fetchPosts() {
    this.postService.fetchFeeds().subscribe((data) => {
      this.feeds = data;
      this.feeds.sort((a, b) => {
        const dt1 = Date.parse(a.created_at);
        const dt2 = Date.parse(b.created_at);

        if (dt1 < dt2) return 1;
        if (dt1 > dt2) return -1;
        return 0;
      });
      console.log(this.feeds, 'feed');
    });
  }
  fetchUserGroups() {
    this.groupService.fetchUserGroups({"user_id":this.UserId}).subscribe((data) => {
      this.u_groups = data;
      this.u_groups.sort((a, b) => {
        const dt1 = Date.parse(a.joined_at);
        const dt2 = Date.parse(b.joined_at);

        if (dt1 < dt2) return 1;
        if (dt1 > dt2) return -1;
        return 0;
      });
      console.log(this.u_groups, 'group');
    });
  } 

  createPost() {
    let postData: Post = {
      user_id: this.UserId,
      content: this.post,
      image: this.ImageFile,
      created_at: '',
    };
    var formData: any = new FormData();
    formData.append('user_id', this.UserId);
    formData.append('content', this.post);
    formData.append('image', this.ImageFile);
    formData.append('created_at', '');

    this.postService.InsertPost(formData).subscribe((data) => {
      console.log(data);
      this.fetchPosts();
      this.post = '';
      this.postButton = true;
      this.hasImage = false;
      this.ImageFile = [];
    });
  }

  CheckPostContent(e: any) {
    if (this.post === '') {
      this.postButton = true;
      console.log('no value');
    } else {
      this.postButton = false;
      console.log('has value');
    }
  }

  getImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.ImageSrc = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
      console.log(file.length, 'length');
      this.ImageFile = file;
      this.hasImage = true;
    }
  }

  removePrevImage() {
    this.hasImage = false;
    console.log('test');
  }

  EditPost(post_id: number) {
    const modalRef = this.modalService.open(EditPostModalComponent, {
      windowClass: 'EditPostModal',
    });
    modalRef.componentInstance.fromParent = post_id;
    modalRef.result.then(
      (result) => {
        console.log(result, 'iw');
      },
      (reason) => {}
    );
  }

  WarningPost(post_id: number) {
    const modalRef = this.modalService.open(WarningModalComponent, {
      windowClass: 'WarningModal',
    });
    modalRef.componentInstance.fromParent = post_id;
    modalRef.result.then(
      (result) => {
        console.log(result, 'iw');
      },
      (reason) => {}
    );
  }
}

import { Component } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PostService } from '../../service/post.service';
import { AuthService } from '../../service/auth.service';
import { Post } from '../../model/post';
import { OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
})
export class EditPostModalComponent {
  @Input() fromParent: any;
  public textArea: string = '';
  public isEmojiPickerVisible: boolean = false;
  updateButton: boolean = true;
  post: string = '';
  hasImage: boolean = false;
  ImageFile = [];
  ImageSrc: string | SafeUrl =
    'https://images.unsplash.com/photo-1521911528923-9c3838123490?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

  UserId: number = 1;
  firstname?: string;
  lastname?: string;
  email?: string;

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.loadPostContent();
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

  updatePost() {
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

    this.postService.UpdatePost(this.fromParent, formData).subscribe((data) => {
      console.log(data, 'update');
      // window.location.reload();
    });
  }

  loadPostContent() {
    this.postService
      .fetchPost({ user_id: this.fromParent })
      .subscribe((data) => {
        console.log(data, 'post');
        this.updateButton = false;
        this.post = data[0].content;
        if (data[0].image != 'posts/image.jpg') {
          this.ImageSrc = 'http://127.0.0.1:8000/media/' + data[0].image;
          this.hasImage = true;
        }
      });
  }

  public addEmoji(event: any) {
    this.post = `${this.post}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  CheckPostContent(e: any) {
    if (this.post === '') {
      this.updateButton = true;
      console.log('no value');
    } else {
      this.updateButton = false;
      console.log('has value');
    }
  }

  ViewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.ImageSrc = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
      console.log(file, 'length');
      console.log('view image')
      this.ImageFile = file;
      this.hasImage = true;
    }
  }

  removePrevImage() {
    this.hasImage = false;
    console.log('test');
  }
}

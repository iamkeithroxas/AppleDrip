import { Component } from '@angular/core';
import { PostService } from '../service/post.service'
import { Post } from '../model/post';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile} from '../model/user-profile'
import { FeedModel } from '../model/feed.model'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
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

  jwtHelper = new JwtHelperService();

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.fetchPosts();
  }

  getUserProfile() {
    var data = JSON.parse(localStorage.getItem('user')!);
    console.log(data)
    if(data != null){
      this.UserId = data.id
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

  createPost() {
    let postData: Post = {
      user_id: this.UserId,
      content: this.post,
      image: this.ImageFile,
      created_at: '',
    };
    // console.log(postData)
    var formData: any = new FormData()
    formData.append('user_id', this.UserId)
    formData.append('content', this.post)
    formData.append('image', this.ImageFile)
    formData.append('created_at', '')

    this.postService.InsertPost(formData).subscribe((data) => {
      console.log(data);
      this.fetchPosts();
      this.post = '';
      this.postButton = true;
      this.hasImage = false;
      this.ImageFile = []
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
}

import { Component } from '@angular/core';
import { PostService } from '../service/post.service'
import { Post } from '../model/post';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  post: string = '';
  hasImage: boolean = false;
  ImageFile = []
  ImageSrc: string | SafeUrl =
    'https://images.unsplash.com/photo-1521911528923-9c3838123490?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
  postButton: boolean = true;
  sampleUserId: number = 1;

  feeds: Post[] = [];

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
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
      user_id: this.sampleUserId,
      content: this.post,
      image: '',
      created_at: '',
    };
    this.postService.InsertPost(postData).subscribe((data) => {
      console.log(data);
      this.fetchPosts();
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
      // console.log(file, 'imge');
      // let count = event.target.files.length;
      // for (let i = 0; i < count; i++) {
      //   this.ImagePrevs.push(
      //     this.sanitizer.bypassSecurityTrustUrl(
      //       window.URL.createObjectURL(event.target.files[i])
      //     )
      //   );
      // }
      // console.log(this.ImageFile)
    }
  }

  removePrevImage() {
    this.hasImage = false;
    console.log('test')
  }
}

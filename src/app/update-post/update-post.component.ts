import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostDetails, PostResponse } from '../post-details';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-post',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit {
  apiData:PostDetails[] = [];
   postId: any;
  postData = {
    title: '',
    content: ''
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.loadPost()
  }

  onSubmit() {
    this.postService.updatePost(this.postId, this.postData).subscribe({
      next: () => {
        alert('Post updated successfully!');
        
        this.router.navigate(['/home']);
        this.loadPosts
      },
      error: () => {
        alert('You are not allowed to update this post');
      }
    });
  }
    loadPosts() {
    this.postService.getAllPost().subscribe({
      next : (data:PostResponse) => {
        if(data && data.posts){
          this.apiData = data.posts
        }
        console.log(this.apiData)
      },
      error: (err) => {
        alert("Error Loading posts");
      }
    });
  }

  onCancel(){
    this.router.navigateByUrl('home')
    this.loadPosts()
  }

    loadPost() {
    this.postService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.postData.title = post.title;
        this.postData.content = post.content;
      },
      error: (err) => {
        alert("Failed to load post");
        console.error(err);
      }
    });
  }
}

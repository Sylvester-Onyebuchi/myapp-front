import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostDetails, PostResponse } from '../post-details';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

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
    this.postId = this.route.snapshot.params['id'];

    this.postService.getPostById(this.postId).subscribe({
      next: (data) => {
        this.postData = data;
      },
      error: (err) => {
        alert('Error loading post details');
        console.error(err);
      }
    });
  }

  onSubmit() {
    this.postService.updatePost(this.postId, this.postData).subscribe({
      next: () => {
        alert('Post updated successfully!');
        
        this.router.navigate(['/home']);
        this.loadPosts
      },
      error: () => {
        alert('Error updating post');
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
}

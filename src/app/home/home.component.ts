import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostDetails, PostResponse } from '../post-details';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  apiData:PostDetails[] = [];
   currentUserId: any;
  constructor(private postService: PostService,
     private router : Router, 
     private userService:UserService,
     private route: ActivatedRoute
    ){}

    user: any;
 


  ngOnInit(): void {
    this.user = this.userService.getUserInfo().subscribe(res => {
      this.user = res;
       this.loadPosts()
    })


  
  }

  onUpdate(id: any, userId: any){
    this.userService.getCurrentUserId().subscribe({
        next: (user) => {
          if(user._id === userId){
            this.router.navigate(['update', id])
          }else{
            alert("You are not permiited to update this post")
          }
        },
        error : () => {
          alert("Not Allowed")
        }

    })
    
  }
 


  onAddPost() {
    this.router.navigateByUrl('addpost');
    // Logic to add a new post
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

  

  onDelete(postId: any, userId: any) {
    this.userService.getCurrentUserId().subscribe({
      next: (user) => {
        if(user._id.toString() === userId.toString()){
          this.postService.deletePost(postId).subscribe(() => {
            alert("Post deleted")
            this.loadPosts()
          })
        }else{
          alert("You are not permitted to delete this post")
        }
      },
      error: () => {
         alert("Something went wrong. Please log in.");
      }
    })
  }

}

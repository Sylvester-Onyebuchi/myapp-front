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

  onUpdate(id: any){
    this.router.navigate(['/update', id])
    
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

  

  onDelete(postId: any) {
    this.postService.deletePost(postId).subscribe(() => {
      alert("Post deleted")
      this.loadPosts()
    });
  }

}

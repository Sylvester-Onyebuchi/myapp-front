import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostDetails } from '../post-details';
import { Router } from '@angular/router';
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
  constructor(private postService: PostService, private router : Router, private userService:UserService){}

    user: any;
 


  ngOnInit(): void {
    this.user = this.userService.getUserInfo().subscribe(res => {
      this.user = res;
      console.log(this.user);
    }
    );
  
    // this.postService.post$.subscribe(posts => this.apiData = posts);
    // this.postService.getAllPost();
  }


  onAddPost() {
    this.router.navigateByUrl('addpost');
    // Logic to add a new post
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
    // Logic to log out the user
  }

  onEdit(postId: number) {
    this.router.navigate(['edit-post', postId]);
    // Logic to edit the post with the given ID
  }
  // onDelete(postId: number) {
  //   this.postService.deletePost(postId).subscribe(() => {
  //     this.getAllData();
  //   });
  // }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
 posts = {
  title: '',
  content: ''
 }

  constructor(private post: PostService, private router: Router, private fb: FormBuilder){
   
  }
  onSubmit() {
    this.post.postData(this.posts).subscribe({
      next: (res) => {
        console.log(res);
        this.post.addPostTostate(res.post);
        this.posts = {
          title: '',
          content: ''
        }
        this.router.navigateByUrl('home');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

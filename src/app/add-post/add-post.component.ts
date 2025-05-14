import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostDetails } from '../post-details';

@Component({
  selector: 'app-add-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  title = ''
  content = ''
posts: PostDetails[] = [];  // Declare this in your component

  constructor(private postService: PostService, private router: Router, private fb: FormBuilder){
   
  }
  onSubmit() {
    let newPost: PostDetails ={
      title: this.title,
      content: this.content
    }
    this.postService.postData(newPost).subscribe({
      next:(res) => {
        alert("Post added")
       this.router.navigateByUrl('home')
      },
      error: (err) => {
        alert("Error adding post")
      }
    })
  }

 

  
}

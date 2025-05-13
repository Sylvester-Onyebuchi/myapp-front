import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
    verifyForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.verifyForm = this.fb.group({
      code: ['',[Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    this.userService.verifyEmail(this.verifyForm.value).subscribe( {
      next: (res) => this.router.navigateByUrl('home')
    })
  }
}

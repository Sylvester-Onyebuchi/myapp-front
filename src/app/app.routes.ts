import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
         {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'verify', component:VerifyComponent, canActivate: [authGuard]},
    {path: 'home', component:HomeComponent, canActivate: [authGuard]},
    {path: 'addpost', component:AddPostComponent, canActivate: [authGuard]},
];

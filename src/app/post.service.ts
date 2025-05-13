import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDetails } from './post-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postSubject = new BehaviorSubject<any>([])
  post$ = this.postSubject.asObservable();

  constructor(private http:HttpClient) { }

  postData(data: {title: string, content: string}){
    return this.http.post<any>('http://localhost:4000/api/addpost', data ,{withCredentials:true})
  }

  getAllPost(){
    return this.http.get<any>('http://localhost:4000/api/allPosts', {withCredentials:true}).subscribe((res) => {
      this.postSubject.next(res.posts);
    });
  }
  getPostById(id: number){
    return this.http.get<PostDetails>(`https://localhost:4000/api/post/${id}`);
  }
  updatePost(id: number, data: PostDetails){
    return this.http.put<PostDetails>(`https://localhost:4000/api/post/${id}`, data);
  }
  deletePost(id: number){
    return this.http.delete<PostDetails>(`https://localhost:4000/api/post/${id}`);
  }

  addPostTostate(post:any){
    const currentPosts = this.postSubject.value;
    this.postSubject.next([post,...currentPosts, ]);
  }
}

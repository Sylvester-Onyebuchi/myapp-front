import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDetails, PostResponse } from './post-details';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    private API_URL=   "https://node-app-tljn.onrender.com"

  

  constructor(private http:HttpClient) { }

  postData(data: PostDetails): Observable<PostDetails>{
    return this.http.post<PostDetails>(`${this.API_URL}/api/addPost`, data ,{withCredentials:true})
  }

  getAllPost(): Observable<PostResponse>{
    return this.http.get<PostResponse>(`${this.API_URL}/api/allPosts`,{withCredentials:true})
  }
  getPostById(id: any){
    return this.http.get<PostDetails>(`${this.API_URL}/api/post/${id}`, {withCredentials: true});
  }
  updatePost(id: any, data: PostDetails){
    return this.http.put<PostDetails>(`${this.API_URL}/api/update/${id}`, data, {withCredentials:true});
  }
  deletePost(id: any): Observable<any>{
    return this.http.delete(`${this.API_URL}/api/delete/${id}`, {withCredentials:true});
  }

  
}

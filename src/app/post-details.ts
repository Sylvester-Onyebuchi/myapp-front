import id from "@angular/common/locales/id";

export interface PostDetails {
    _id?:  any;
    title: string;
    content: string;
    postedBy?:{_id: any, firstName:string},
    createdAt?: string;
    
}
 export interface PostResponse {
  message: string;
  posts: PostDetails[];
}
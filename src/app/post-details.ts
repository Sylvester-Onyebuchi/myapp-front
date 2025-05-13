import id from "@angular/common/locales/id";

export interface PostDetails {
    id?: string | number;
    title?: string;
    content?: string;
    postedBy?: {
        name: string;
    };
}

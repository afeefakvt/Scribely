export interface IUser{
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface LoginData{
    email:string,
    password:string
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {name:string,email:string};
  createdAt: string;
}
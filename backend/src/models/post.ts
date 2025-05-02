import mongoose,{Document,Schema, trusted} from "mongoose"

export interface IPost extends Document{
    title:string;
    content:string;
    imageUrl:string;
    author:mongoose.Types.ObjectId;
}

const postSchema = new Schema<IPost>(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {timestamps:true}
)

export const Post = mongoose.model<IPost>('Post',postSchema)
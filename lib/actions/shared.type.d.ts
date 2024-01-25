export interface AddPostParams {
  caption: string;
  imageUrl: string;
  user: Schema.Types.ObjectId | IUser;
  path: string;
}

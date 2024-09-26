import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Comment {
  'id' : CommentId,
  'content' : string,
  'author' : string,
  'timestamp' : bigint,
  'postId' : PostId,
}
export type CommentId = bigint;
export interface Post {
  'id' : PostId,
  'title' : string,
  'content' : string,
  'author' : string,
  'timestamp' : bigint,
  'category' : string,
}
export type PostId = bigint;
export interface _SERVICE {
  'createComment' : ActorMethod<[PostId, string, string], CommentId>,
  'createPost' : ActorMethod<[string, string, string, string], PostId>,
  'getCategories' : ActorMethod<[], Array<string>>,
  'getComments' : ActorMethod<[PostId], Array<Comment>>,
  'getPosts' : ActorMethod<[string], Array<Post>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

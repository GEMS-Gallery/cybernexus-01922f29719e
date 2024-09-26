export const idlFactory = ({ IDL }) => {
  const PostId = IDL.Nat;
  const CommentId = IDL.Nat;
  const Comment = IDL.Record({
    'id' : CommentId,
    'content' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
    'postId' : PostId,
  });
  const Post = IDL.Record({
    'id' : PostId,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'createComment' : IDL.Func([PostId, IDL.Text, IDL.Text], [CommentId], []),
    'createPost' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [PostId],
        [],
      ),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getComments' : IDL.Func([PostId], [IDL.Vec(Comment)], ['query']),
    'getPosts' : IDL.Func([IDL.Text], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

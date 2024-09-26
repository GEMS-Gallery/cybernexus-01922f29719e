import Hash "mo:base/Hash";
import Int "mo:base/Int";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
    // Types
    type PostId = Nat;
    type CommentId = Nat;

    type Post = {
        id: PostId;
        category: Text;
        title: Text;
        content: Text;
        author: Text;
        timestamp: Int;
    };

    type Comment = {
        id: CommentId;
        postId: PostId;
        author: Text;
        content: Text;
        timestamp: Int;
    };

    // State
    stable var nextPostId : PostId = 0;
    stable var nextCommentId : CommentId = 0;

    let categories : [Text] = ["Pen Testing", "Red Team", "Blue Team", "Cryptography", "Malware Analysis"];

    let posts = HashMap.HashMap<PostId, Post>(0, Nat.equal, Nat.hash);
    let comments = HashMap.HashMap<CommentId, Comment>(0, Nat.equal, Nat.hash);

    // Helper functions
    func generatePostId() : PostId {
        nextPostId += 1;
        nextPostId
    };

    func generateCommentId() : CommentId {
        nextCommentId += 1;
        nextCommentId
    };

    // Public functions
    public query func getCategories() : async [Text] {
        categories
    };

    public query func getPosts(category: Text) : async [Post] {
        let filteredPosts = Array.filter<Post>(Iter.toArray(posts.vals()), func (post) {
            post.category == category
        });
        filteredPosts
    };

    public query func getComments(postId: PostId) : async [Comment] {
        let filteredComments = Array.filter<Comment>(Iter.toArray(comments.vals()), func (comment) {
            comment.postId == postId
        });
        filteredComments
    };

    public func createPost(category: Text, title: Text, content: Text, author: Text) : async PostId {
        let postId = generatePostId();
        let post : Post = {
            id = postId;
            category = category;
            title = title;
            content = content;
            author = author;
            timestamp = Time.now();
        };
        posts.put(postId, post);
        postId
    };

    public func createComment(postId: PostId, content: Text, author: Text) : async CommentId {
        let commentId = generateCommentId();
        let comment : Comment = {
            id = commentId;
            postId = postId;
            author = author;
            content = content;
            timestamp = Time.now();
        };
        comments.put(commentId, comment);
        commentId
    };
}

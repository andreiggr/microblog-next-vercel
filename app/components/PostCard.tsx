import { Button, Card, Title } from '@tremor/react';
import { useSession } from 'next-auth/react';

const PostCard = ({ post, visitUserPage }: any) => {
  const { data: session } = useSession();

  const isSessionUserPost =
    session?.user?.id && post.userId && session.user.id == post.userId;

  const deletePost = async (postId: any) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      });

      if (response.ok) {
        console.log('Post deleted successfully');
        window.location.reload();
      } else {
        console.error('Failed to delete post');
        alert('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting the post:', error);
      alert('An error occurred while deleting the post');
    }
  };

  return (
    <Card>
      <Title>{post.title}</Title>
      <p>{post.content}</p>
      <Button onClick={() => visitUserPage(post.userId)}>
        Visit {post.author.firstName}
      </Button>
      {isSessionUserPost && (
        <Button color="red" onClick={() => deletePost(post.id)}>
          Delete Post
        </Button>
      )}
    </Card>
  );
};

export default PostCard;

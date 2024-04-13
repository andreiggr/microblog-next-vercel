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
    <Card className="bg-white shadow-lg rounded-lg p-4 my-4">
      <Title className="text-xl font-bold text-gray-800">{post.title}</Title>
      <p className="text-gray-600 mt-2">{post.content}</p>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => visitUserPage(post.userId)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Visit {post.author.firstName}
        </Button>
        {isSessionUserPost && (
          <Button
            onClick={() => deletePost(post.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Post
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PostCard;

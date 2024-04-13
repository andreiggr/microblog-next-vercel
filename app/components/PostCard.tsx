import { Button, Card, Title } from '@tremor/react';

const PostCard = ({ post, visitUserPage }: any) => {
  return (
    <Card>
      <Title>{post.title}</Title>
      <p>{post.content}</p>
      <Button onClick={() => visitUserPage(post.userId as number)}>
        {post.author.firstName}
      </Button>
    </Card>
  );
};

export default PostCard;

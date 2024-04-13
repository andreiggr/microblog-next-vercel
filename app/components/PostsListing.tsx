import { Button, Title } from '@tremor/react';
import { useRouter } from 'next/navigation';
import PostCard from './PostCard';

interface PostsListingProps {
  data: {
    items: any[];
    totalCount: number;
  };
  changePage: (newPage: number) => void;
  page: number;
  pageSize: number;
}

const PostsListing = ({
  data,
  changePage,
  page,
  pageSize,
}: PostsListingProps) => {
  const router = useRouter();

  const handleUserPage = (user: number) => {
    router.push(`/user/${user}`);
  };

  const validTotalCount = Number.isInteger(data.totalCount)
    ? data.totalCount
    : 0;
  const validPageSize =
    Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 10;

  const totalPages = Math.ceil(validTotalCount / validPageSize);
  const isLastPage = page >= totalPages - 1;
  const isFirstPage = page === 0;

  return (
    <>
      <Title>{data?.totalCount} Total Posts</Title>

      {data?.items?.length > 0 &&
        data?.items.map((post, index) => (
          <PostCard key={index} post={post} visitUserPage={handleUserPage} />
        ))}
      <Button onClick={() => changePage(page - 1)} disabled={isFirstPage}>
        Previous
      </Button>
      <p>Page: {page + 1}</p>
      <Button onClick={() => changePage(page + 1)} disabled={isLastPage}>
        Next
      </Button>
    </>
  );
};

export default PostsListing;

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
  pageSize
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
      <Title className="text-xl font-semibold text-gray-800 mb-4">
        {data?.totalCount} Total Posts
      </Title>

      {data?.items?.length > 0 &&
        data?.items.map((post, index) => (
          <PostCard key={index} post={post} visitUserPage={handleUserPage} />
        ))}

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => changePage(page - 1)}
          disabled={isFirstPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          Previous
        </Button>

        <p className="text-sm font-medium">Page: {page + 1}</p>

        <Button
          onClick={() => changePage(page + 1)}
          disabled={isLastPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PostsListing;

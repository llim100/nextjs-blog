import { fetchSingleBlog } from '@/actions/actions';
import UpdateBlogForm from '@/components/forms/UpdateBlogForm';

const UpdateBlogPage = async ({ params }) => {
  const id = params?.id;
  const blog = await fetchSingleBlog(id);
  return (
    <div>
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        Update Blog Page
      </h2>

      <UpdateBlogForm blog={blog} />
    </div>
  );
};

export default UpdateBlogPage;

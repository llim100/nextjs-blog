import BlogItem from '@/components/BlogItem';
import Search from '@/components/Search';
//import { fetchBlogs } from '@/actions/actions';
import prisma from '@/libs/prismadb';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

const Blogs = async ({ searchParams }) => {
  //const blogs = await fetchBlogs();
  //const blogs = await prisma.blog.findMany({});
  const query = searchParams?.query;
  const blogs = await prisma.blog.findMany({
    where: query
      ? {
          OR: [
            { title: { contains: query } },
            { category: { contains: query } },
          ],
        }
      : {}, // fetch all the data blogs
  });
  //console.log(blogs);
  return (
    <div>
      <Search />
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        All Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {blogs?.length > 0 &&
          blogs?.map((blog) => {
            return <BlogItem key={blog?.id} blog={blog} />;
          })}
      </div>
    </div>
  );
};
export default Blogs;

// url params.  Ie, path?query='science'&limit=10   can use q or query or search
//multiple searching, ie, split().join('?')
//for docs, go to nextjs, dynamic rendering

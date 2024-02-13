'use server';

import prisma from '@/libs/prismadb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const fetchBlogs = async () => {
  const blogs = await prisma.blog.findMany({});
  return blogs;
};

export const fetchSingleBlog = async (id) => {
  const blog = await prisma.blog.findFirst({
    where: {
      id,
    },
  });
  return blog;
};

export const addBlog = async (formData) => {
  // collect info from form using formData
  const imageUrl = formData.get('imageUrl');
  const title = formData.get('title');
  const category = formData.get('category');
  const description = formData.get('description');

  // push the data into the DB
  const new_blog = await prisma.blog.create({
    data: {
      imageUrl: imageUrl ? imageUrl : null,
      title,
      category,
      description,
    },
  });

  revalidatePath('/blogs/add-blog');
  redirect('/blogs');
};

export const updateBlog = async (id, formData) => {
  const imageUrl = formData.get('imageUrl');
  const title = formData.get('title');
  const category = formData.get('category');
  const description = formData.get('description');

  const update_blog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      imageUrl: imageUrl ? imageUrl : null,
      title,
      category,
      description,
    },
  });
  revalidatePath(`/blogs/update-blog/${id}`);
  redirect('/blogs');
};

export const addCommentToBlog = async (blogId, formData) => {
  const text = formData.get('text');
  const added_comment = await prisma.comment.create({
    data: { blogId: blogId, text: text },
  });
  revalidatePath(`/blogs/${blogId}`);
  redirect(`/blogs/${blogId}`);
};

export const fetchComments = async (blogId) => {
  const comments = await prisma.comment.findMany({
    where: {
      blogId: blogId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5, //pagination; can also add skip; both can be set for pagination; Mongoose uses limit instead of take
  });
  return comments;
};

export const deleteComment = async (commentId, blogId) => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(`/blogs/${blogId}`);
};

// const added_comment = await prisma.comment.create({
//   where: { blogId: blogId },
//   data: { blogId: blogId, text: text },
// });

// export const fetchComments = async (blogId, page=1, pageSize=10) => {
//  skip = (page -1) * pageSize;
//   const comments = await prisma.comment.findMany({
//     where: {
//       blogId: blogId,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//     take: 5,
//     skip: skip
//   });
//   return comments;

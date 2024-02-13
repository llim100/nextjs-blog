'use client';
import { useRef } from 'react';
import Button from '../ui/Button';
import Image from 'next/image';
import { addCommentToBlog } from '@/actions/actions';

const CommentAddForm = ({ blogId }) => {
  const ref = useRef();
  const addCommentHandler = async (formData) => {
    await addCommentToBlog(blogId, formData);
    ref?.current?.reset();
  };
  return (
    <>
      <h2 className="text-center font-semibold mt-5 mb-2 px-2 py-3">
        Add Your Comment
      </h2>
      <div className="h-[2px] w-1/4 items-center mx-auto bg-gray-600"></div>

      <form
        ref={ref}
        action={addCommentHandler}
        className="max-w-md flex mx-auto mt-8"
      >
        <div className="mb-2 mr-5">
          <Image
            className="rounded-full mt-6"
            src="https://avatars.githubusercontent.com/u/41202696?v=4"
            height={70}
            width={70}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="block  text-gray-600 font-medium">
            Comment
          </label>
          <textarea
            id="text"
            name="text"
            placeholder="add text"
            rows="4"
            className="mt-1 p-2 w-600 text-gray-800 border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mt-5 py-1 px-2">
          <Button label={'Add Comment'} color={'green'} />
        </div>
      </form>
    </>
  );
};
export default CommentAddForm;

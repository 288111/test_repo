import {fetchData} from '../main'
import { useState } from 'react';


const CreatePost = ({onCreate}) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
  });
  const { title, body } = post;
  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });
  
  return (
    <>
      <div className="">
        <form>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              className="form-control"
              onChange={onChange}
            />
            <label className="form-label" htmlFor="title">
              Post Title
            </label>
          </div>

          <div className="form-outline mb-4">
            <textarea
              id="body"
              name="body"
              value={body}
              className="form-control"
              onChange={onChange}
            />
            <label className="form-label" htmlFor="body">
              Content
            </label>
          </div>

          <button
            type="button"
            onClick={() => onCreate(post)}
            className="btn btn-primary btn-block mb-4"
          >
            Create Post
          </button>
        </form>
      </div>
    </>
  );
};


export default CreatePost;
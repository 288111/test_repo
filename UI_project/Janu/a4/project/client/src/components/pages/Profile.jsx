import List from "../List";
import CreatePost from "../CreatePost";
import {useEffect, useState} from 'react';
import {fetchData} from '../../main';
function Profile() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const username = new URLSearchParams(window.location.search).get('user');

    
    const onCreate = (newPost) => {
        fetchData(`/users/${username}`, {}, 'GET')
          .then((user) => {
            console.log(user)
            fetchData('/posts', { title: newPost.title, body:newPost.body, authorId: user._id }, 'POST')
              .then((data) => {
                setPosts((prevPosts) => [
                    ...prevPosts,
                    data
                ])
                console.log(data);
    
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
    const fetchPosts = () => {
        fetchData(`/posts?user=${username}`,{},  'GET')
          .then((data) => {
            setLoading(false);
            setPosts(data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
   
    useEffect(() => {
        setLoading(true);  
        fetchPosts();
    }, [])
    let props = {
      list: posts,
      updateList: setPosts
    }
  return (
    <>
      <div className="mt-4">Welcome {username} !!</div>
      <h3>Create Posts</h3>
      <CreatePost onCreate={onCreate} />
      <h3>Posts</h3>
      <List {...props}></List>
    </>
  );
}

export default Profile;

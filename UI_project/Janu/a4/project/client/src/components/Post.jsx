import {deleteData} from "../main"
const Post = ({data, deleteItem}) => {
    const onDeleteClick = (postId) => {
        try {
          deleteData(`/posts/${postId}`).then(()=> {
            deleteItem(postId);
          }).catch((err) => {
            console.error(err)
            alert(`Failed to delete post with id ${postId}` )
          });
    
        } catch (error) {}
      };
    return(
        <>
        <h5>{data.title}</h5>
        <p>{data.body}</p>
        <a
            href="#"
            className="btn btn-info"
            role="button"
            onClick={() => onDeleteClick(data._id)}
          >
            Delete
          </a>
        </>
    );
}

export default Post;
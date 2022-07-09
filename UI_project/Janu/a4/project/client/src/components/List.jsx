import Post from './Post';
const List = ({ list, updateList }) => {
  const deleteItem = (id) => {
    updateList((items) => items.filter((item) => item._id !== id))
  }
  return (
    <ul className="list-group">
      {list.map((item) => (
        <li key={item._id} className="list-group-item">
          <Post data={item} deleteItem={deleteItem}></Post>
          
        </li>
      ))}
    </ul>
  );
};

export default List;

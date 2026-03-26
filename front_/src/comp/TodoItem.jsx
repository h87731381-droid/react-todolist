import todoStore from "../Store/TodoStore"

function TodoItem({item}) {
    const {del,completeTodo} = todoStore();
  return (
    <li className="note" style={ {color:item.isdone && 'red'} }>
        <div className="none_title">{item.content}</div>
        <div className="noteButton">
          <button>수정</button>
          <button onClick={()=>del(item._id)}>삭제</button>
          <button onClick={()=>completeTodo(item._id)}>완료</button>
        </div>
    </li>
  )
}

export default TodoItem
import todoStore from "../Store/TodoStore";
import TodoInsert from "./TodoInsert";



function TodoHead() {
  const {get, data} = todoStore();
  let done = data.filter((item)=>item.isdone===true)
  return (
    <div className="Header">
        <div className="Header_title">
          <h2 className="title">TodoList</h2>
          <TodoInsert />
        </div>
        <div className="section_1">
            <div className="misson">할일({data.length}) / 완료({done.length})</div>
            <div className="typeButton">
                <button onClick={(e)=>get()}>전체</button>
                <button onClick={(e)=>get(false)}>진행중</button>
                <button onClick={(e)=>get(true)}>완료</button>
            </div>
        </div>
    </div>
  )
}

export default TodoHead
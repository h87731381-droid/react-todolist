import todoStore from '../Store/TodoStore';
import TodoItem from './TodoItem'

function TodoList() {
    const {data} = todoStore();
    
    // 조건이 맞으면 첫번째 리턴 실행. 조건 아니면 두번째 리턴 실행.
    // if(data.length === 0) return <div>준비중...</div>;
    
  return (
    <ul>
      {
        data.map(function(item){
          return <TodoItem key={item._id} item={item} />
        })
      }
    </ul>
  )
}

export default TodoList
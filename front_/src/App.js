import { useEffect } from 'react';
import './todolist.scss';
import TodoHead from './comp/TodoHead';
import TodoList from './comp/TodoList';
import todoStore from './Store/TodoStore';

function App() {
    //처음 페이지에 접속할 떄 데이터(get)를 가져오기 (useEffect : 한번만!)
    //한번만 가져와서 계속 쓰려고.
    //get은 TodoStore.js에 있음
    const {get} = todoStore();
    useEffect
    (()=>{
      get();
    }, [])
    
  return (
    <div className="App">
      <TodoHead />
      
      <TodoList />
    </div>
  );
}

export default App;

import { useState } from 'react'
import todoStore from '../Store/TodoStore';

function TodoInsert() {
    const {save} = todoStore();

    const [ip,setIp] = useState('');
    function handleSubmit(e){
      e.preventDefault();
        if(!ip){ //if문의 특징은 true일 때만 실행하기 때문에...
            alert('글을 작성하세요...')
            return; //얘를 만나면 밑에 실행 안함! (if문을 실행하면 밑에를 실행하지 않기~)
        }
      
        const today = new Date();
        const date = new Intl.DateTimeFormat('ko-KR',{
            year:'numeric',
            month:'2-digit',
            day:'2-digit',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'    /* 정규표현식 */
        }).format(today).replace(/[가-힣]+/,'T').replaceAll(' ',''); //replace('이거를','이렇게') 바꾸는 것
        //console.log({content:ip, date}); 저장 시켜야할 형태 확인
        save({content:ip, date, isdone:false})
        .then(()=>{
            setIp('');
            alert('저장완료!');
        })

    }
    
  return (
    <div>
        <form className='insert' onSubmit={e=>handleSubmit(e)}>
            <input type="text" value={ip} onChange={e=>setIp(e.target.value)} />
            <button>추가</button>
        </form>
    </div>
  )
}

export default TodoInsert
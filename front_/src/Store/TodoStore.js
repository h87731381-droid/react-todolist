import { create } from 'zustand'
import axios from 'axios'

// 데이터 요청 (zustand)
const todoStore = create((set) => ({
    data:[], //res를 담아두고 쓰려고. 왜? 다른데서도 쓸거니까 (TodoList.jsx)
    save: async function(value){
        try{
            let res = await axios.post(process.env.REACT_APP_APIURL,value)
            
            //여기서 에러나면 바로 catch로 가버림
            if(!res.data.success){
                throw new Error(res.data.msg);
            }
            set(function(item) {
                    return {data:[...item.data, res.data.data]}
            });
        }
        catch(err){
            console.log(`save 에러 - ${err}`)
        }
    },
    get: async function (value) {
        try {
            const res = await axios.get(`${process.env.REACT_APP_APIURL}?sort=${value}`);
            if (!res.data.success) {
                throw new Error(res.data.msg);
            }
            set({data:res.data.data}); //data에  res의 data(내용)를 넣기. set은 매개변수
        }
        catch(err){
            console.log(`get 에러 - ${err}`)
        }
    },
    del: async function(id) {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_APIURL}?id=${id}`);
            if(!res.data.success){
                throw new Error('에러발생')
            }
            set(function(item){
                //obj는 데이터 {한 줄} [{},{}] 이며 => 이 조건이 맞는 것만 filter한다.
                return {data:item.data.filter(obj => obj._id !== id)}
            });
        }
        catch(err){
            console.log(`del 에러 - ${err}`)
        }
       
    },
    //수정하기 (완료버튼)
    completeTodo: async function(id) {
        try{
            //해야할 것 : isdone:false -> isdone:true 상태 변경하기
            const res = await axios.put(`${process.env.REACT_APP_APIURL}/state?id=${id}`,{isdone:true});
            if(!res.data.success){
                throw new Error('에러발생')
            }
            //새로고침 안 하고 바로 반영 되려면 function함수를 한번 더 해야함
            set(function(item){

                //테이터를 map으로 반복하기. 반복 왜하냐? obj의 isdone:true로 바꾸려고
                let updateData = item.data.map(function(obj){

                    //찐id가 매개변수 id랑 맞냐?
                    if(obj._id === id){
                        obj.isdone = true;
                    }
                    return obj;
                });
                return {data:updateData}
            });
        }
        catch(err){
            console.log(`completeTodo 에러 - ${err}`)
        }
    }
}))

export default todoStore;


   

const express = require('express')
const ObjectId = require('mongodb').ObjectId;
const {getDB} = require('../db/db_todolist.js');
const todolist = express.Router(); //페이지분리


//데이터 가져오기
todolist.get('/', async (req, res) => {
    
    //isdone의 value값을 기준으로 버튼 구분하기
    const type = req.query.sort;
    let filter;
    switch(type){
        case 'false' : filter={isdone:false}; break;
        case 'true' : filter={isdone:true}; break;
        default : filter={};
    }

    try{
        //실데이터가 들어 있는 콜렉션 조회 (몽고디비)
        const data = await getDB().collection('todos').find(filter).toArray();
        res.send({success:true,data:data})
    }
    catch(err){
        res.send({success:false,msg:err.message})
    }
    
}) 



//데이터 저장하기
todolist.post('/', async (req, res) => {
    try{
        //몽고디비에 데이터 저장하기
        const result = await getDB().collection('todos').insertOne(req.body);
        const data = {...req.body, _id:result.insertedId}
        res.send({success:true, data})
    }
    catch(err){
        res.send({success:false, msg:err.message})
    }
})

//데이터 삭제하기
todolist.delete('/', async (req, res) => {
    const {id} = req.query
    console.log(id)
    try{
        // {_id: ObjectId(id)}  이거는 몽고디비에서 데이터 확인하면 알 수 있음. 근데! Object는 무조건 new써야함
        const result = await getDB().collection('todos').deleteOne({_id:new ObjectId(id)});

        res.send({success:true});
    }
    catch(err){
        res.send({success:false});
    }
})

//데이터 수정하기
todolist.put('/state', async (req, res) => {
    const {id} = req.query
    const {isdone} = req.body;
    console.log(id,isdone)
    try{
        const result = await getDB().collection('todos').updateOne({_id: new ObjectId(id)},{$set: req.body});

        res.send({success:true});
    }
    catch(err){
        res.send({success:false});
    }
})


module.exports = todolist;

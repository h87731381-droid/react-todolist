const express = require('express')
const ObjectId = require('mongodb').ObjectId;
const {getProject} = require('../db/db_todolist.js');
const guest = express.Router(); //페이지분리


//데이터 가져오기
guest.get('/', async (req, res) => {
    
    try{
        const data = await getProject().collection('guestBook').find().sort({ _id: -1 }).toArray();
        res.send({success:true,data:data})
    }
    catch(err){
        res.send({success:false,msg:err.message})
    }
    
}) 



//데이터 저장하기
guest.post('/', async (req, res) => {
    try{
        //몽고디비에 데이터 저장하기
        const result = await getProject().collection('guestBook').insertOne(req.body);
        const data = {...req.body, _id:result.insertedId}
        res.send({success:true, data})
    }
    catch(err){
        res.send({success:false, msg:err.message})
    }
})



module.exports = guest;

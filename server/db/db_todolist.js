const { MongoClient } = require('mongodb');
//이름 옆에 몽고디비 암호입력
//const uri = "mongodb+srv://hyunju:samsung1234@cluster0.eig05to.mongodb.net/?appName=Cluster0";
const uri = "mongodb://hyunju:samsung1234@ac-3394ovq-shard-00-00.eig05to.mongodb.net:27017,ac-3394ovq-shard-00-01.eig05to.mongodb.net:27017,ac-3394ovq-shard-00-02.eig05to.mongodb.net:27017/?ssl=true&replicaSet=atlas-h8gq41-shard-0&authSource=admin&appName=Cluster0"
const client = new MongoClient(uri)

let db, db_project ; //다른데로 가져다 쓰려고 전역변수로 만듦.
async function connectDB(){
    // try{여기 실행하다가 에러나면 실행안하고} catch{여기 실행함. 에러났다고 알림}
    try {
        await client.connect(); //몽고접속
        db = client.db('todolist'); //프로젝트 db 활성화
        db_project = client.db('project'); //프로젝트 db 활성화
        console.log('접속완료');
    }
    catch(err) {
        console.error(err)
    }
}

function getDB(){ //리턴까지 해줘야 db의 값을 보낼 수 있음.
    return db;
}
function getProject(){ //리턴까지 해줘야 db의 값을 보낼 수 있음.
    return db_project;
}

module.exports = {connectDB, getDB, getProject}
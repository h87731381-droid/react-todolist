//모듈
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//파일 가져오기
const todolist = require('./api/todolist.js');
const guest = require('./api/guestBook.js');
const {connectDB} = require('./db/db_todolist.js');

//변수
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

async function serverStart(){
    await connectDB(); //비동기라서 await 해야함. await가 다 실행 될 때까지 밑에꺼 실행X
    app.use('/todo',todolist); //화면 출력
    app.use('/guest',guest); //화면 출력

    app.listen(4000, () => {
        console.log('Server is running on http://localhost:3000') //서버실행
    })
}
serverStart();


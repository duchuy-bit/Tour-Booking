const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();   //tạo đối tượng mới
app.use(bodyparser.json());
app.use(cors());    // su dung thu vien cors

//ket noi
const db = mysql.createConnection({
    host: '37.59.55.185',
	user: 'EskUSL83Cb',
	password: 'awaNOX5Q9v',
	port:'3306',
	database: 'EskUSL83Cb'
})

db.connect(function(error){
    if(!!error) console.log(error);
        else console.log('SQL Database Connected!');
});

setInterval(function () {
    db.query('SELECT 1');
}, 5000);

app.listen(process.env.PORT ||  3000);


app.get('/test',(req, res)=>{
    var sql = "select * from test";
    db.query(sql,(err,kq)=>{
        if(err) throw err;
        console.log(kq);
        res.send(kq);   //tra ket qua ve cho react alo
    });
});

app.get('/data',(req, res)=>{
    var sql = "select * from NHANVIEN";
    db.query(sql,(err,kq)=>{
        if(err) throw err;
        console.log(kq);
        res.send(kq);   //tra ket qua ve cho react 
    });
});


// const express = require('express');

// const app = express();   //tạo đối tượng mới

// app.listen(process.env.PORT ||  3000);


app.get("/",function(req,res){
    console.log('server port 3000')
    res.send('duc huy node js connect mysql server')
})

// app.get("/alo",function(req,res){
//     console.log('server port 3000')
//     res.send('alo')
// })
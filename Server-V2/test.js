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
	database: 'EskUSL83Cb',
    // multipleStatements: true
},
{typeCast: function (field, next) {
    if (field.type === "JSON") {
        return JSON.parse(field.string());
    } else {
        return next();
    }
}}
)

db.connect(function(error){
    if(!!error) console.log(error);
        else console.log('SQL Database Connected!');
});

setInterval(function () {
    db.query('SELECT 1');
}, 5000);

app.listen(process.env.PORT ||  3000);

let text = '{"database":' ;


// '{"firstName":"John","lastName":"Doe" },' +
// '{"firstName":"Anna","lastName":"Smith" },' +
// '{"firstName":"Peter","lastName":"Jones" }]}';


app.get('/data',(req, res)=>{
    var sql = "select * from LOAIDV";
    const result ='' ;

    db.query(sql,(err,kq)=>{
        if(err) throw err;
        // res.json({"news": kq});
        // const tam = kq.json();
        // let tam ="";

        // kq.map(row => {
        //     text= text + {...row}.toString() + ",";
        //     return console.log( {...row});
        // });

        // kq.forEach(item => {
        //     // const tamitem = JSON.parse(JSON.stringify(item))
        //     console.log(item[1]);
        //     text= text + item + ",";
        //     // console.log(item.title);
        // // });
        // text = text+ "]}";

        // // console.log(kq[0].MALOAIDV);

        // console.log(text);

        // const obj = JSON.parse(JSON.stringify(text))
        
        // console.log(obj);

        let ret = JSON.stringify(kq);
        // doStuffwithTheResult(ret);
        console.log(ret);

        text = text + ret + ",}";
        console.log(text);


        res.send(kq);   //tra ket qua ve cho react 
    });
});


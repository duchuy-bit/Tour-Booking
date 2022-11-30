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
    multipleStatements: true
},

// const db = mysql.createConnection({
//     host: 'sql6.freemysqlhosting.net',
// 	user: 'sql6528619',
// 	password: 'YArBxGdb4N',
// 	port:'3306',
// 	database: 'sql6528619',
//     multipleStatements: true
// },

// const db = mysql.createConnection({
//     host: 'localhost',
// 	user: 'root',
// 	password: '',
// 	port:'3306',
// 	database: 'tourbooking',
//     // multipleStatements: true
// },
{typeCast: function (field, next) {
    if (field.type === "JSON") {
        return JSON.parse(field.string());
    } else {
        return next();
    }
}}
)   
//---------------------------------------------------------------------
db.connect(function(error){
    if(!!error) console.log(error);
        else console.log('SQL Database Connected!');
});

setInterval(function () {
    db.query('SELECT 1');
}, 5000);

app.listen(process.env.PORT ||  3000);


//---------------------------------------------------------------------

app.get('/dichvu',(req,res)=>{
    var sql = "select * from dichvu ";
    let text = "{";
    db.query(sql, (err,kq)=>{
        if (err) throw err;
        result  = JSON.stringify(kq);
        text = text + '"dichvu":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
// Remove non-printable and other non-valid JSON characters
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());

        // console.log(json.dichvu[0].file.toString())
        // console.log(text);

        res.send(json);   //tra ket qua ve cho react 
    })
})

app.post('/dichvu',(req,res)=>{
    var sql = "select * from dichvu where id_loai= ? ";
    let text = "{";
    db.query(sql,req.body.id_loai, (err,kq)=>{
        if (err) throw err;
        result  = JSON.stringify(kq);
        text = text + '"dichvu":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'") .replace(/\\"/g, '\\"') .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r") .replace(/\\t/g, "\\t").replace(/\\b/g, "\\b") .replace(/\\f/g, "\\f");

        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());

        // console.log(json.dichvu[0].file.toString())
        // console.log(text);

        res.send(json);    
    })
})
app.post('/searchdichvu',(req,res)=>{
    var sql = "SELECT * from dichvu where ten like '%"+req.body.keySearch+"%' or mota like '%"+req.body.keySearch+"%' or xeploai like '%"+req.body.keySearch+"%' or diachi like '%"+req.body.keySearch+"%' ";
    let text = "{";
    db.query(sql,req.body.keySearch, (err,kq)=>{
        if (err) throw err;
        result  = JSON.stringify(kq);
        text = text + '"dichvu":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'") .replace(/\\"/g, '\\"') .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r") .replace(/\\t/g, "\\t").replace(/\\b/g, "\\b") .replace(/\\f/g, "\\f");

        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());

        // console.log(json.dichvu[0].file.toString())
        // console.log(text);

        res.send(json);    
    })
})
//---------------------------------------------KHACHHANG-------------------------------------

app.get('/khachhang',(req,res)=>{
    var sql = "select * from khachhang";
    let text = "{";
    db.query(sql, (err,kq)=>{
        if (err) throw err;
        result  = JSON.stringify(kq);
        text = text + '"khachhang":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
// Remove non-printable and other non-valid JSON characters
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());

        // console.log(json.dichvu[0].file.toString())
        // console.log(text);

        res.send(json);   //tra ket qua ve cho react 
    })
})

app.post('/getkhachhang',(req,res)=>{
    console.log(req.body);

    let text = "{";

    var sql = 'select * from khachhang where id = ?';
    db.query(sql, req.body.id_khachhang , (err,kq)=>{
        if (err) throw err;
        result  = JSON.stringify(kq);
        text = text + '"khachhang":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());
        //gui ket qua cho react 
        res.send(json);
    })
})

app.post('/khachhang',(req,res)=>{
    console.log(req.body);
    var data = {
        name : req.body.name, 
        sdt : req.body.sdt,
        diachi: req.body.diachi,
        ngaysinh: req.body.ngaysinh,
        gioitinh: req.body.gioitinh,
        email: req.body.email,
        matkhau: req.body.matkhau, 
    }
    var sql = 'insert into khachhang set ?';
    db.query(sql, data, (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        //gui ket qua cho react 
        res.send({
            status: 'them thanh cong',
            no: null,
            email: req.body.email,
            pass: req.body.matkhau
        });
    })
})

app.post('/updatekhachhang',(req,res)=>{
    console.log(req.body);
    var data = {
        name : req.body.name, 
        sdt : req.body.sdt,
        diachi: req.body.diachi,
        ngaysinh: req.body.ngaysinh,
        gioitinh: req.body.gioitinh,
        email: req.body.email,
        matkhau: req.body.matkhau, 
    }
    var sql = 'update khachhang set ? where khachhang.id = ?';
    db.query(sql, [data, req.body.id], (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        //gui ket qua cho react 
        res.send({
            status: 'them thanh cong',
            no: null,
            email: req.body.email,
            pass: req.body.matkhau
        });
    })
})

//================================================GIO HANG==============================
app.post('/giohang',(req,res)=>{
    console.log(req.body);
    var data = {
        name : req.body.name, 
        sdt : req.body.sdt,
        diachi: req.body.diachi,
        ngaysinh: req.body.ngaysinh,
        gioitinh: req.body.gioitinh,
        email: req.body.email,
        matkhau: req.body.matkhau, 
    }
    let text = "{";
    var sql = 'select * from giohang inner join gia on gia.id=giohang.id_gia inner join dichvu on dichvu.id = gia.id_dichvu where giohang.id_khachhang = ?';
    db.query(sql, [req.body.id], (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        result  = JSON.stringify(kq);
        text = text + '"giohang":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
// Remove non-printable and other non-valid JSON characters
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());
        //gui ket qua cho react 
        res.send(json);
    })
})

app.post('/insertgiohang',(req,res)=>{
    console.log(req.body);
    var data = {
        id_khachhang: req.body.id_khachhang,
        id_gia: req.body.id_gia,
        sl: req.body.sl,
        ngaythem: req.body.ngaythem, 
    }
    var sql = 'insert into giohang set ?';
    db.query(sql, data, (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        //gui ket qua cho react 
        res.send({
            status: 'them thanh cong',
            no: null,
            id_khachhang: req.body.id_khachhang,
            id_gia: req.body.id_gia
        });
    })
})
app.post('/updateslgiohang',(req,res)=>{
    console.log(req.body);
    var data = {
        id_khachhang: req.body.id_khachhang,
        id_gia: req.body.id_gia,
        sl: req.body.sl,
        ngaythem: req.body.ngaythem, 
    }
    var sql = 'update giohang set ? where giohang.id_khachhang = ? and giohang.id_gia = ?';
    db.query(sql, [data, req.body.id_khachhang, req.body.id_gia], (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        //gui ket qua cho react 
        res.send({
            status: 'them thanh cong',
            no: null,
            email: req.body.email,
            pass: req.body.matkhau
        });
    })
})

app.post('/deletegiohang',(req,res)=>{
    console.log(req.body);

    var sql = 'delete from giohang where giohang.id_gia= ?  ';
    db.query(sql, req.body.id_gia , (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        //gui ket qua cho react 
        res.send({
            status: 'Xoa gio hang thanh cong',
            no: null,
            id_khachhang: req.body.id_khachhang,
            id_gia: req.body.id_gia
        });
    })
})


//================================================GIA==============================
app.post('/gia',(req,res)=>{
    var sql = "select * from gia where id_dichvu = ? ";
    let text = "{";
    // console.log(req.body.id);
    // console.log('alo')
    db.query(sql, [req.body.id], (err,kq)=>{
        if (err) throw err;
        result  = JSON.stringify(kq);
        text = text + '"gia":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
// Remove non-printable and other non-valid JSON characters
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());

        // console.log(json.dichvu[0].file.toString())
        // console.log(json);

        res.send(json);   //tra ket qua ve cho react 
    })
})

//================================================HOA DON==============================
// app.post('/hoadon',(req,res)=>{
//     console.log(req.body);

//     let text = "{";
//     var sql = 'select * from ';
//     db.query(sql, data, (err,kq)=>{
//         if (err) throw err;
//         // console.log(kq);
//         result  = JSON.stringify(kq);
//         text = text + '"hoadon":' + result;
//         text = text + '}';

//         text = text.replace(/\\n/g, "\\n")
//                 .replace(/\\'/g, "\\'")
//                 .replace(/\\"/g, '\\"')
//                 .replace(/\\&/g, "\\&")
//                 .replace(/\\r/g, "\\r")
//                 .replace(/\\t/g, "\\t")
//                 .replace(/\\b/g, "\\b")
//                 .replace(/\\f/g, "\\f");
// // Remove non-printable and other non-valid JSON characters
//         text = text.replace(/[\u0000-\u0019]+/g,"");
        
//         const json = JSON.parse(text.toString());
//         console.log(json);
//         //gui ket qua cho react 
//         res.send(json);
//     })
// })

//---------------------------------------------------------------------
app.post('/inserthoadon',(req,res)=>{
    console.log(req.body);
    var data = {
        id_khachhang : req.body.id_khachhang, 
        id_nhanvien : req.body.id_nhanvien,
        ngaythanhtoan: req.body.ngaythanhtoan,
        ten_khachhang: req.body.ten_khachhang,
        sdt_khachhang: req.body.sdt_khachhang,
        email_khachhang: req.body.email_khachhang,
        tongtien: req.body.tongtien
    }
    var sql = 'insert into hoadon set ?';
    db.query(sql, data, (err,kq)=>{
        if (err) throw err;
        else console.log('Insert Hoa_don Success');
    })

    let text = "{";
    var sql = 'select * from hoadon where id_khachhang = ?';
    db.query(sql, req.body.id_khachhang, (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        result  = JSON.stringify(kq);
        text = text + '"hoadon":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
// Remove non-printable and other non-valid JSON characters
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());
        console.log(json);
        //gui ket qua cho react 
        res.send(json);
    })

})

app.post('/getcthd',(req,res)=>{
    console.log("Get CTHD")
    console.log(req.body);

    let text = "{";
    sql = 'select * from hoadon inner join cthd on hoadon.id = cthd.id_hd inner join gia on gia.id = cthd.id_gia inner join dichvu on dichvu.id= gia.id_dichvu  where id_khachhang = ? and id_hd=?';
    db.query(sql, [req.body.id_khachhang,req.body.id_hd], (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        result  = JSON.stringify(kq);
        text = text + '"cthd":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
// Remove non-printable and other non-valid JSON characters
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());
        console.log(json);
        //gui ket qua cho react 
        res.send(json);
    })
})


app.post('/getallbill',(req,res)=>{
    console.log("Get CTHD")
    console.log(req.body);

    let text = "{";
    sql = 'select * from hoadon  where id_khachhang = ?';
    db.query(sql, [req.body.id_khachhang], (err,kq)=>{
        if (err) throw err;
        // console.log(kq);
        result  = JSON.stringify(kq);
        text = text + '"cthd":' + result;
        text = text + '}';

        text = text.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
// Remove non-printable and other non-valid JSON characters
        text = text.replace(/[\u0000-\u0019]+/g,"");
        
        const json = JSON.parse(text.toString());
        console.log(json);
        //gui ket qua cho react 
        res.send(json);
    })
})

app.post('/insertcthd',(req,res)=>{
    console.log(req.body);
    let listTam = req.body.listCTHD;

    let sql="insert into cthd values";
    for (i=0;i<listTam.length;i++)
    {
        // console.log(listTam[i])
        sql = sql + " ("+ listTam[i].id_hd+","+listTam[i].id_gia+","+listTam[i].sl+","+listTam[i].giatien+")";
        if (i!== listTam.length-1) sql= sql+ ','
    }

    console.log(sql)

    // listTam.forEach(element => {
    //     console.log(element)
    //     // sql = sql + "values (null,"+ element.id_hd+","+element.id_gia+","+
    // });
    // var data = {
    //     id_hd : req.body.id_hoadon, 
    //     id_gia : req.body.id_gia,
    //     sl: req.body.sl,
    //     giatien: req.body.giatien,
    // }

    // let text = "{";
    // var sql = 'insert into cthd set ?';
    db.query(sql, (err,kq)=>{
        if (err) throw err;
        else console.log("Insert ctdh Success ")
    })
})


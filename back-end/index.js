var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const knex = require('knex')({
	client: 'mysql',
	connection:{
		host: '127.0.0.1',
		user: 'test',
		password: 'test',
		database: 'multimedia',
		charset: 'utf8'
	}
});

var PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.disable('etag');
app.listen(PORT);

var apiRoutes = express.Router();
apiRoutes.use((req,res,next)=>{
	res.set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers');
	res.set('Access-Control-Allow-Origin','*');
	res.set('Access-Control-Allow-Methods','*');
	next();
});

apiRoutes.get('/item', (req, res)=>{
	knex.select(
		'iditem','itemTitle','itemSubtitle','author','price','publisherName'
	).from('item').crossJoin(
		'publisher','item.publisher_idpublisher','publisher.idpublisher'
	).then((query)=>{
		res.status(200).json(query);
	}).catch((err)=>{
		console.log(err);
	});
});

apiRoutes.get('/item/:query', (req, res)=>{
	console.log('%' + req.params.query + '%');
	knex.select(
		'iditem','itemTitle','itemSubtitle','author','price','publisherName'
	).from('item')
	.where('itemTitle','like','%' + req.params.query + '%')
	.crossJoin(
		'publisher','item.publisher_idpublisher','publisher.idpublisher'
	).then((query)=>{
		res.status(200).json(query);
	}).catch((err)=>{
		console.log(err);
	});
});

apiRoutes.get('/item/:id', (req, res)=>{
	knex.select('*').from('item')
	.where({ iditem: req.params.id })
	.crossJoin(
		'publisher','item.publisher_idpublisher','publisher.idpublisher'
	)
	.crossJoin(
		'itemamount','item.iditem','itemamount.item_iditem'
	)
	.then((query)=>{
		let data = query[0];
		delete data.iditem;
		delete data.item_iditem;
		delete data.iditemAmount;
		delete data.publisherPhone;
		res.status(200).json(data);
	}).catch((err)=>{
		console.log(err);
	});
});

apiRoutes.post('/cart',(req, res)=>{
	knex.select('iditem','itemTitle','price').from('item').whereIn('iditem',req.body.cartList)
	.then((query)=>{
		res.status(200).json(query);
	}).catch((err)=>{
		res.status(500).json({error: true, msg: err.msg});
	});
});

apiRoutes.post('/login', (req, res)=>{
	const username = req.body.username;
	knex.select('iduser','admin','password').from('user')
	.where({username: username}).then((result)=>{
		if(result.length === 0 || result.length > 1)
			res.status(404).json({success: false, msg: "此帳號尚未申請"});
		else{
			if(req.body.password === result[0].password){
				res.status(200).json({success: true, 
					userId: result[0].iduser,
					admin: result[0].admin
				});
			}else{
				res.status(406).json({success: false, msg: "密碼錯誤"});
			}
		}
	}).catch((err)=>{
		res.status(200).json({error:true, msg: err.message});
	});
});

apiRoutes.post('/signup', (req, res)=>{
	const newMember = req.body;
	knex.select('iduser').from('user')
	.where({username: newMember.username}).then((result)=>{
		if(result.length > 0){
			res.status(406).json({error:true, msg: "此帳號已申請"});
		}else{
			knex('user').insert(newMember).then((result)=>{
				res.status(200).json({success: true, iduser: result[0]});
			}).catch((err)=>{
				res.status(500).json({error:true, msg: err.message});
			});
		}
	}).catch((err)=>{
		res.status(500).json({error:true, msg: err.message});
	});
});

apiRoutes.get('/profile', (req,res)=>{
	knex.select('iduser','name','stuId').from('user')
	.orderBy('iduser', 'desc').then((result)=>{
		res.status(200).json({success: true, itemlist: result});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: "讀取發生錯誤"});
	});
});

apiRoutes.get('/profile/:id', (req,res)=>{
	knex.select('name','stuId','phoneNum').from('user').where({
		iduser: req.params.id
	}).then((result)=>{
		res.status(200).json({success: true, detail: result[0]});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: "讀取發生錯誤"});
	});
});

apiRoutes.get('/profile/:id/order', (req,res)=>{
	knex.select('idorder', 'buyDate', 'orderStatus', knex.raw('SUM(buyPrice*buyNum) as price'))
	.from('order')
	.where({
		user_iduser: req.params.id
	}).crossJoin(
		'orderdetail','order.idorder','orderdetail.order_idorder'
	).groupByRaw('idorder').orderBy('idorder', 'desc').then((result)=>{
		result.forEach((el)=>{
			el.buyDate = dateProcess(el.buyDate,".");
		});
		res.status(200).json({success: true, orderlist: result});
	}).catch((err)=>{
		console.log(err);
		res.status(500).json({error:true, msg:err.msg});
	});
});

apiRoutes.get('/profile/:id/order/:orderId', (req,res)=>{
	let data;
	knex.select('idorder', 'buyDate', 'orderStatus', 'stuId', 'phoneNum', knex.raw('SUM(buyPrice*buyNum) as price'))
	.from('order')
	.where({
		user_iduser: req.params.id,
		idorder: req.params.orderId
	}).crossJoin(
		'orderdetail','order.idorder','orderdetail.order_idorder'
	).crossJoin(
		'user', 'user.iduser', 'order.user_iduser'
	).groupByRaw('idorder').then((result)=>{
		result.forEach((el)=>{
			el.buyDate = dateProcess(el.buyDate,".");
		});
		if(result.length > 0){
			data = result[0];
			knex.select('item_iditem','buyPrice','buyNum','itemTitle')
			.from('orderdetail').where({
				order_idorder: req.params.orderId
			}).crossJoin(
				'item','item.iditem','orderdetail.item_iditem'
			).then((query)=>{
				data.detail = query;
				res.status(200).json({success: true, order: data});
			}).catch((err)=>{
				res.status(500).json({error:true, msg:err.msg});
			});
		}else
			res.status(200).json({success: true, order: data});
	}).catch((err)=>{
		res.status(500).json({error:true, msg:err.msg});
	});
});

apiRoutes.get('/manage/publisher', (req,res)=>{
	knex.select('*').from('publisher').then((result)=>{
		res.status(200).json(result);
	}).catch((err)=>{
		res.status(500).json({error:true, msg: "讀取發生錯誤"});
	});
});

apiRoutes.post('/manage/publisher', (req,res)=>{
	knex('publisher').insert(req.body)
	.then((result)=>{
		res.status(200).json({success: true, msg:"新增成功"});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: "新增發生錯誤"});
	});
});

apiRoutes.get('/manage/publisher/:id', (req,res)=>{
	knex.select('*').from('publisher').where({
		idpublisher: req.params.id
	}).then((result)=>{
		res.status(200).json({success: true, detail: result[0]});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: "讀取發生錯誤"});
	});
});

apiRoutes.patch('/manage/publisher/:id', (req,res)=>{
	delete req.body.idpublisher;
	knex('publisher').where({
		idpublisher: req.params.id
	}).update(req.body).then((result)=>{
		res.status(200).json({success:true, msg: '修改成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '修改發生錯誤'});
	});
});

apiRoutes.get('/manage/member/:id', (req,res)=>{
	knex.select('*').from('user').where({
		iduser: req.params.id
	}).then((result)=>{
		delete result[0].iduser;
		res.status(200).json({success: true, detail: result[0]});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: "讀取發生錯誤"});
	});
});

apiRoutes.patch('/manage/member/:id', (req,res)=>{
	knex('user').where({
		iduser: req.params.id
	}).update(req.body).then((result)=>{
		// result 回傳更新列數
		res.status(200).json({success:true, msg: '修改成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '修改發生錯誤'});
	});
});

apiRoutes.get('/manage/item', (req, res)=>{
	knex.select(
		'iditem','itemTitle','author','price','publisherName'
	).from('item').crossJoin(
		'publisher','item.publisher_idpublisher','publisher.idpublisher'
	).then((query)=>{
		res.status(200).json(query);
	}).catch((err)=>{
		console.log(err);
	});
});

apiRoutes.post('/manage/item', (req,res)=>{
	const amount = req.body.amount;
	delete req.body.amount;
	knex('item').insert(req.body)
	.then((result)=>{
		const itemId = result[0];
		knex('itemamount').insert({
			item_iditem: itemId,
			amount: amount
		}).then((result)=>{
			res.status(200).json({success: true, msg:"新增成功"});
		}).catch((err)=>{
			res.status(500).json({error:true, msg: "新增庫存數量發生錯誤"});
		});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: "新增發生錯誤"});
	});
});

apiRoutes.patch('/manage/item/:id', (req,res)=>{
	knex('item').where({
		iditem: req.params.id
	})
	.crossJoin('itemamount','itemamount.item_iditem','item.iditem')
	.update(req.body).then((result)=>{
		res.status(200).json({success:true, msg: '修改成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '修改發生錯誤'});
	});
});

apiRoutes.get('/manage/order', (req,res)=>{
	knex.select('idorder','user_iduser','buyDate','stuId','orderStatus')
	.from('order').crossJoin('user','user.iduser','order.user_iduser')
	.orderBy('idorder', 'desc')
	.then((result)=>{
		result.forEach((el)=>{
			el.buyDate = dateProcess(el.buyDate,".");
		});
		res.status(200).json({success:true, orderList: result});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: err.msg});
	});
});

apiRoutes.patch('/manage/order/:id/status', (req,res)=>{
	knex('order').where({
		idorder: req.params.id
	}).update(req.body).then((result)=>{
		// result 回傳更新列數
		res.status(200).json({success:true, msg: '修改成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '修改發生錯誤'});
	});
});

apiRoutes.post('/order', (req,res)=>{
	let newDate = new Date();
	let nowDay = dateProcess(newDate,"-");
	knex('order').insert({
		user_iduser: req.body.user_iduser,
		buyDate: nowDay,
		orderStatus: '處理中'
	}).then((result)=>{
		const orderId = result[0];
		req.body.detail.forEach((el)=>{
			el.order_idorder = orderId;
		});
		// console.log("訂單號: " + orderId);
		knex('orderdetail').insert(req.body.detail).then((query)=>{
			/*console.log("細節起始號: ");
			console.log(query);*/
			req.body.detail.forEach((el)=>{
				knex('itemamount').where(
						'item_iditem', '=', el.item_iditem
				).decrement('amount', el.buyNum).catch((err)=>{console.log(err)});
			});
			res.status(200).json({success: true});
		}).catch((err)=>{
			console.log(err);
			res.status(500).json({error:true, msg: '新增購買內容時發生錯誤'});
		});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '新增時發生錯誤'});
	});
});

apiRoutes.delete('/manage/publisher',(req,res)=>{
	knex('publisher').where({
		idpublisher: req.body.idpublisher
	}).del().then((result)=>{
		res.status(200).json({success:true,msg:'刪除成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '刪除時發生錯誤'});
	});
});
apiRoutes.delete('/manage/item',(req,res)=>{
	knex('item').where({
		iditem: req.body.iditem
	}).del().then((result)=>{
		res.status(200).json({success:true,msg:'刪除成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '刪除時發生錯誤'});
	});
});
apiRoutes.delete('/manage/member',(req,res)=>{
	knex('user').where({
		iduser: req.body.iduser
	}).del().then((result)=>{
		res.status(200).json({success:true,msg:'刪除成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '刪除時發生錯誤'});
	});
});
apiRoutes.delete('/manage/order',(req,res)=>{
	knex('order').where({
		idorder: req.body.idorder
	}).del().then((result)=>{
		//delete會回傳刪除列數 e.g [1]
		res.status(200).json({success:true,msg:'刪除成功'});
	}).catch((err)=>{
		res.status(500).json({error:true, msg: '刪除時發生錯誤'});
	});
});

app.use('/api',apiRoutes);

function dateProcess(Newdate, ch){
	return Newdate.getFullYear() + ch 
	+ (Newdate.getMonth() + 1) + ch + Newdate.getDate();
}
var jwt =require('jsonwebtoken');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
module.exports.authMiddleware = async function(req,res,next){
	try{
		// const token =  req.header('auth-token');
		const token =  localStorage.getItem('auth-token');
		if (!token) return res.status(401).send('Access Denied');

		jwt.verify(token, process.env.SECRET_KEY,function(err,payload){
			if(payload){
				req.user = payload;
				next();
			}else{
				res.status(401).send('Invalid Token');
			}
			
		 })
	} catch{ res.status(401).send(' No token provided')}
	
		
};
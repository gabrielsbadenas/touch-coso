console.log('hola mundo')
const express = require('express'),
	app = express(),
	port = 3000
app.get('/',(q,s)=>{
s.send('helo world')
})
app.listen(port,()=>{
console.log('localhost:'+port)
}
)

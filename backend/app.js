require('./database/mongodb');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/indexRouter');
var clienteRouter = require('./routes/clienteRouter');
var categoriaRouter = require('./routes/categoriaRouter');
var produtoRouter = require('./routes/produtoRouter');
var pedidoRouter = require('./routes/pedidoRouter');
var loginRouter = require('./routes/loginRouter');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/api-docs',  swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger('dev'));
app.use(cors({
  origin: '*'
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/cliente', clienteRouter);
app.use('/categoria', categoriaRouter);
app.use('/produto', produtoRouter);
app.use('/pedido', pedidoRouter);
app.use('/login', loginRouter);
app.use(function (req, res) {
  res.status(404).json({ 'msg': 'O que você busca não existem em nossa API!' });
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
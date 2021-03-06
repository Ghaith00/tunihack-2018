const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// routes
const indexRouter = require('./routes/index');
const metadataRouter = require('./routes/metadata');
const governorateRouter = require('./routes/governorate');
const projectRouter = require('./routes/project');
const validationRouter = require('./routes/validation');
const feedbackRouter = require('./routes/feedback');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/metadata', metadataRouter);
app.use('/governorates', governorateRouter);
app.use('/projects', projectRouter);
app.use('/validation', validationRouter);
app.use('/feedback', feedbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error
  res.status(err.status || 500);
  console.log(err)
  res.json({error: err})
});

module.exports = app;
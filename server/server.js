require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const actualPassport = require('passport');
const { passport } = require('./passport');
require('./passport').gitHubStrategy(passport)
const tasks = require('./routes/tasks');
const blockers = require('./routes/blockers');
const users = require('./routes/users');
const login = require('./routes/login');
const sprints = require('./routes/sprints');
const graphQLHTTP = require('express-graphql');
const schema = require('./graphql/graphqlSchema');
const logout = require('./routes/logout');
const port =  1337;


// SETUP
const app = express();
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


// ENDPOINTS
app.use('/tasks', tasks);
app.use('/blockers', blockers);
app.use('/users', users);
app.use('/login', login);

app.use('/sprints', sprints);
app.use('/logout', logout);


app.get('/test', (req, res) => {
  console.log(req);
  res.send();
});

// sends a user object to the requester if one exists
app.get('/verify', (req, res) => {
  console.log('req user', req.user)
  if (req.user) {
    console.log('user is verified');
    res.send({ 
      id: req.user.id,
      username: req.user.username,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      preferred: req.user.preferred,
      email: req.user.email,
      phonenumber: req.user.phonenumber,
      photo: req.user.photo
    });
  } else {
    console.log('user is not verified');
    res.send(false);
  }
});


//graphql
app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true
}))

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.redirect('/');
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// IMPLEMENT WEBSOCKET
const io = require('socket.io')(server);

const messages = {}; // IMPLEMENT REDIS TO REPLACE

io.on('connection', (client) => {
  console.log('a user connected to chat');

  let chatroomName;

  client.on('sprint_id', (sprint_id) => {
    chatroomName = sprint_id;
    if (!messages[chatroomName]) { messages[chatroomName] = [] };
    client.join(chatroomName);
    io.in(chatroomName).emit('messages', messages[chatroomName]);
  })

  client.on('message', (message) => {
    console.log('message received handler fired');
    console.log('message: ', message);
    messages[chatroomName].push(message);
    io.in(chatroomName).emit('messages', messages[chatroomName]);
  });

  client.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

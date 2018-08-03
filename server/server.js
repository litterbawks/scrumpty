require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const actualPassport = require('passport');
const { passport } = require('./passport');
require('./passport').gitHubStrategy(actualPassport)
const tasks = require('./routes/tasks');
const blockers = require('./routes/blockers');
const users = require('./routes/users');
const login = require('./routes/login');
const sprints = require('./routes/sprints');
const graphQLHTTP = require('express-graphql');
const schema = require('./graphql/graphqlSchema');
const logout = require('./routes/logout');
const port = process.env.PORT || 1337;


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
  if (req.user) {
    console.log('user is verified');
    res.send({ id: req.user.id, username: req.user.username, preferred: req.user.preferred });
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

app.listen(port, () => console.log(`Listening on port ${port}`));

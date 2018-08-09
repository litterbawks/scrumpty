const db = require('../database/db');

const self = (module.exports = {
  addTask: ({ title, description, sprint_id }, user) => {
    if (!title || title === '') throw 'No Title';
    if (!description || description === '') throw 'No description';
    if (!sprint_id) throw 'No sprint id';
    if (!user || !user.id) throw 'user not logged in';

    return db
      .userCanAccessSprint(sprint_id, user.id)
      .then(() => db.addTask(title, description, sprint_id));
  },

  getTasks: (sprint_id, user) => {
    if (!user || !user.id) throw 'user not logged in';

    return db
      .userCanAccessSprint(sprint_id, user.id)
      .then(() => db.getTasks(sprint_id));
  },

  updateTask: (newVersion, user) => {
    if (!newVersion.id) throw 'No Task ID Given';
    if (!user || !user.id) throw 'user not logged in';
    // filter out stuff?
    return db
      .userCanAccessTask(newVersion.id, user.id)
      .then(() => db.updateTask(newVersion));
  },

  isOwner: ({ owner_id, sprint_id }) => {
    if (!owner_id) throw 'No owner ID Given';
    if (!sprint_id) throw 'No sprint ID Given';
    // filter out stuff?
    return db.isOwner(owner_id, sprint_id);
  },

  getUsersInSprint: (sprint_id, user) => {
    if (!sprint_id) throw 'no sprint id given';
    if (!user || !user.id) throw 'user not logged in';

    return db
      .userCanAccessSprint(sprint_id, user.id)
      .then(() => db.getUsersInSprint(sprint_id));
  },

  addBlocker: ({ task_id, title, description }, user) => {
    if (!task_id) throw 'No task_id';
    if (!title || title === '') throw 'No Title';
    if (!description || description === '') throw 'No description';
    if (!user || !user.id) throw 'user not logged in';

    return db
      .userCanAccessTask(task_id, user.id)
      .then(() => db.addBlocker(task_id, title, description, user.id));
  },

  getBlockers: (task_id) => {
    if (!task_id) throw 'No Test Id Given';
    return db.getBlockers(task_id);
  },

  updateBlocker: (newVersion, user) => {
    if (!user || !user.id) throw 'user not logged in';

    return db
      .userCanAccessTask(newVersion.task_id, user.id)
      .then(() => db.updateBlocker(newVersion));
  },

  addUser: ({ username, password, firstname, lastname, preferred, email, phonenumber }) => {
    // console.log('email', email);
    if (!username || username === '') throw 'No Username Given';
    if (!password || password === '') throw 'No Password Given';
    if (!firstname || firstname === '') throw 'No First Name Given';
    if (!lastname || lastname === '') throw 'No Last Name Given';
    if (!preferred || preferred === '') throw 'No Preferred Name Given';
    if (!email || email === '') throw 'No Email Given';
    if (!phonenumber || phonenumber === '') throw 'No Phone Number Given';
    return db.userExists(username).then((exists) => {
      // if (exists) {
      //   throw 'User already exists';
      // }
      return db.addUser(username, password, firstname, lastname, preferred, email, phonenumber);
    });
  },

  getUsers: () => db.getUsers(),
  // NOT NEEDED. USING PASSPORT NOW
  // loginCorrect: ({ username, password }) => {
  //   if (!username || !password) throw 'Invalid Credentials';
  //   if (username === '' || password === '') throw 'Invalid Credentials';
  //   return db.userHasPassword(username, password);
  // },


  updateUser: ({ username, password }) => db.updateUser(username, password),

  getUserById: id => db.getUserById(id).then(user => (user !== undefined ? user : null)),
  
  getUserByName: username => db.getUserByName(username).then(user => (user !== undefined ? user : null)),

  isLoggedIn: (req, res, next) => {
    if (req.session.passport) {
      next();
    } else {
      res.redirect('/login');
    }
  },

  addSprint: (title, owner_id, username, repo) => {
    if (!title || title === '') throw 'No Title';
    if (!owner_id) throw 'No owner_id';
    if (!repo) throw 'No repo';

    return db.addSprint(title, owner_id, repo).then((sprint) => {
      console.log(sprint);
      const user_id = owner_id;
      const sprint_id = sprint.id;
      return self.addUserToSprint({ owner_id, username, sprint_id });
    });
  },

  // add user to a sprint, if successful returns the sprint
  addUserToSprint: ({ owner_id, username, sprint_id }) => {
    if (!username || username === '') throw 'No User Given';
    if (!sprint_id) throw 'no sprint id given';
    if (!owner_id || owner_id === '') throw 'no owner id given';

    return db.addUserToSprint(owner_id, username, sprint_id);
  },

  removeUserFromSprint: ({ owner_id, user_id, sprint_id }) => {
    if (!user_id || user_id === '') throw 'No User Given';
    if (!sprint_id) throw 'no sprint id given';
    if (!owner_id || owner_id === '') throw 'no owner id given';
    if (user_id === owner_id) throw 'cannot remove self from sprint';

    return db.removeUserFromSprint(owner_id, user_id, sprint_id);
  },

  getSprints: ({ user_id }) => db.getSprints(user_id),
});

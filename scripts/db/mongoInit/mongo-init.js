db = db.getSiblingDB('admin');
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
db.createUser({
  user: 'root',
  pwd: 'testpass',
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

db.createCollection('alumnis');
db.createCollection('graduateinvitations');
db.createCollection('users');
db.createCollection('profiles');
db.createCollection('forums');
db.createCollection('threads');
db.createCollection('posts');

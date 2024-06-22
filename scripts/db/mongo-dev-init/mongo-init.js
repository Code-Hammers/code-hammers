console.log('🔐 DB Admin authenticating...');
db = db.getSiblingDB('admin');
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

console.log(`🥷 Creating user for ${process.env.MONGO_INITDB_DATABASE}`);
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_USER_PWD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

const collectionNames = [
  'alumnis',
  'graduateinvitations',
  'users',
  'profiles',
  'forums',
  'threads',
  'posts',
];

console.log(`📄 Creating Database Collections`);
collectionNames.forEach((collectionName) => {
  console.log(`💥 Creating ${collectionName} Collection...`);
  db.createCollection(collectionName);
  console.log(`🏁 ${collectionName} Collection Created Successfully!`);
});

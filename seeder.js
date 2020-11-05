const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB and init a session
const initSession = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    return await conn.startSession();
  } catch (e) {
    throw e;
  }
};

// Create data array with models and corresponding JSON files. Order matters!
const data = [
  {
    model: require('./models/Language'),
    file: JSON.parse(fs.readFileSync(`${__dirname}/_data/languages.json`, 'utf-8')),
  },
  {
    model: require('./models/Word'),
    file: JSON.parse(fs.readFileSync(`${__dirname}/_data/words.json`, 'utf-8')),
  },
];

// Imports into db
const importData = async () => {
  try {
    const session = await initSession();
    // use session transaction to rollback all data on any error
    await session.withTransaction(async () =>
      // use promises chain to create models one by one for correct aggregations
      await data.reduce( async (chain, { model, file }) => {
        model.session = session;
        return chain.then(async() => await model.create(file, { session }))
      }, Promise.resolve())
    );
    console.log('Data imported...'.green.inverse);
  } catch (err) {
    console.error('Data import failed\n'.red, err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    const session = await initSession();
    await session.withTransaction(() => Promise.all(
      data.map(async ({ model }) => await model.deleteMany()),
      ),
    );
    console.log('Data destroyed...'.red.inverse);
  } catch (err) {
    console.error(err);
  }
};

// run specific function depending on args
switch (process.argv[2]) {
  case '-i':
    console.log('Importing Data...');
    importData().then(() => process.exit());
    break;
  case '-d':
    console.log('Deleting All Data...');
    deleteData().then(() => process.exit());
    break;
  default:
    console.log(`Provide an argument:
     -i for import,
     -d for deletion`.yellow);
    process.exit();
}
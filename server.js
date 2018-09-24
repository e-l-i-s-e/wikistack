const http = require('http');
const { db, Page, User } = require('./models')
const app = require('./app');
const server = http.createServer(app);

const PORT = 3000;

const init = async () => {
  await Page.sync();
  await User.sync();
  // await db.sync( {force: true })

  server.listen(PORT, () => {
    console.log(`Server is listening on port 3000!`);
  })
};

init();

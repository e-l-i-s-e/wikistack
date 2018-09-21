const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});


const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: Sequelize.ENUM('open', 'closed'),
})

Page.beforeValidate((pageInstance) => {
  pageInstance.slug = pageInstance.title.replace(/\s+/g, '_').replace(/\W/g, '')
})
// Page.addHook('beforeValidate', (pages,options) =>{
//   pages.slug = pages.title.replace(/\s+/g, '_').replace(/\W/g, ''),
//   pages.content=content,
// })

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = {
  Page, User, db
}

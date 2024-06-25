/**
 * @type { Metadata }
 */
const metadata = {
  userAgent: process.env.USER_AGENT,
  organizationName: process.env.ORGANIZATION_NAME,
  sessionName: process.env.SESSION_NAME,
  chatbotName: process.env.CHATBOT_NAME,
  superAdmin: {
    userName: process.env.SUPER_ADMIN_NAME,
    phoneNumber: process.env.SUPER_ADMIN_PHONE,
    phoneId: process.env.SUPER_ADMIN_PHONEID,
  },
};

/**
 * @type { MongoConfig }
 */
const mongoConfig = {
  uri: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DATABASE_NAME,
  collection: {
    user: process.env.COLL_USER,
  },
};

module.exports = { metadata, mongoConfig };

type Metadata = {
  userAgent: string;
  organizationName: string;
  sessionName: string;
  chatbotName: string;
  superAdmin: {
    userName: string;
    phoneNumber: string;
    phoneId: string;
  };
};

type MongoConfig = {
  uri: string;
  databaseName: string;
  collection: {
    user: string;
  };
};

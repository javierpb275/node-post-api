export default {
  DB: {
    HOST: process.env.DB_HOST || "mysql_db",
    USER: process.env.MYSQL_USER || "mysql",
    PASSWORD: process.env.MYSQL_PASSWORD || "mysql",
    NAME: process.env.MYSQL_DATABASE || "post_db",
    MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD || "mysql",
  },
  AUTH: {
    ACCESS_TOKEN_SECRET:
      process.env.ACCESS_TOKEN_SECRET || "someaccesstokensecret",
    REFRESH_TOKEN_SECRET:
      process.env.REFRESH_TOKEN_SECRET || "somerefreshtokensecret",
    ACCESS_TOKEN_EXPIRATION: "1h",
    REFRESH_TOKEN_EXPIRATION: "30d",
  },
};

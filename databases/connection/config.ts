import { catchError } from "../../src/modules/common/utils";

const { DB_URL, DB_NAME } = process.env;

if (typeof DB_URL !== "string" || typeof DB_NAME !== "string") {
  throw catchError("Add MONGO URI", 404);
}

export default {
  development: {
    MONGO_URI: `${DB_URL}/${DB_NAME}`,
  },
  staging: {
    MONGO_URI: `${DB_URL}/${DB_NAME}`,
  },
  production: {
    MONGO_URI: `${DB_URL}/${DB_NAME}`,
  },
};

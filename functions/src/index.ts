import * as httpApi from "./api/http/api";
import * as authOnCreate from "./api/auth/on-create";
import { initializeFirebaseApp } from "./config";

initializeFirebaseApp();

exports.http_api = httpApi.default;
exports.onCreateUser = authOnCreate.default;

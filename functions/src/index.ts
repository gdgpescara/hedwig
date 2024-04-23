import * as httpApi from "./api/http/api";
import * as authOnCreate from "./api/auth/on-create";
import { initialize } from "./config";

initialize();

exports.http_api = httpApi.default;
exports.onCreateUser = authOnCreate.default;

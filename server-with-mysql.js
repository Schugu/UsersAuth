import { createApp } from "./src/app.js";
import { UserModel } from './src/models/mysql/users.js';

createApp({ userModel: UserModel });
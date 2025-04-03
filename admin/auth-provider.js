import { DefaultAuthProvider } from "adminjs";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import componentLoader from "./component-loader.js";
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    const user = await User.findOne({ email: email, role: "admin" });
    if (!user) return null;
    const userPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, userPassword);
    if (isValidPassword) return { email };
    return null;
  },
});
export default provider;

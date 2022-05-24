import { UserDocument } from "src/user/schemas/user.schema";

export const sanitizeUser = (user: UserDocument) => {
  return {
    id: user._id,
    username: user.username,
    role: user.role,
  };
};

export const sanitizeUsers = (users: UserDocument[]) => {
  return users.map(sanitizeUser);
};

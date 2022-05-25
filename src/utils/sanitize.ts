import { SanitizedUserDto } from "src/user/dto/sanitized-user.dto";
import { UserDocument } from "src/user/schemas/user.schema";

export const sanitizeUser = (user: UserDocument): SanitizedUserDto => {
  return {
    id: user._id,
    username: user.username,
    role: user.role,
  };
};

export const sanitizeUsers = (users: UserDocument[]) => {
  return users.map(sanitizeUser);
};

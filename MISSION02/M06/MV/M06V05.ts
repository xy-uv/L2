// * ENUM

enum UserRoles {
  Admin = "Admin",
  Editor = "Editor",
  Moderator = "Moderator",
  User = "User",
  Viewer = "Viewer",
}

const canEdit = (role: UserRoles) => {
  if (UserRoles.User === role || UserRoles.Viewer === role) {
    return `${role} access are limited. can't edit.`;
  } else {
    return `${role} has access to edit!`;
  }
};

console.log(canEdit(UserRoles.Moderator));

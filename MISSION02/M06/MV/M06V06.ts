// * As CONST

const userRoles = {
  admin: "ADMIN",
  editor: "EDITOR",
  moderator: "MODERATOR",
  user: "USER",
  viewer: "VIEWER",
} as const;

type UserRoles = (typeof userRoles)[keyof typeof userRoles];

const canEdit = (role: UserRoles) => {
  if (userRoles.user === role || userRoles.viewer === role) {
    return `${role} access are limited. can't edit.`;
  } else {
    return `${role} has access to edit!`;
  }
};

console.log(canEdit(userRoles.moderator));

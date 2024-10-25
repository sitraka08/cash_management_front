export const mergeUser = (user) => {
  if (user.role) {
    user = {
      ...user,
      role: { label: user?.role, value: user?.role },
    };
  }

  return user;
};

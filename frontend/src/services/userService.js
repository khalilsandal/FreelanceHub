import users from "../data/users.json";

export const getUserByEmail = async (email) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  return user || null;
};

export const userExists = async (email) => {
  const user = await getUserByEmail(email);

  return user !== null;
};


export const getUserById = async (id) => {
    await new Promise((resolve) =>
        setTimeout(resolve, 400)
    );

  return users.find(
    (user) => user.id === Number(id)
  );
};
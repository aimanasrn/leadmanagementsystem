export async function loginUser(email: string, password: string) {
  if (email !== "admin@example.com" || password !== "password123") {
    return null;
  }

  return {
    token: "dev-token",
    user: {
      id: "seed-admin",
      role: "ADMIN",
      email
    }
  };
}

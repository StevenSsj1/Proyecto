import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      user_role: number;
      token: string;
    };
  }
}

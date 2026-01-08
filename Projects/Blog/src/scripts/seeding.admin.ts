import { prisma } from "../lib/prisma";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

async function seedingAdmin() {
  try {
    console.log("***** Admin Seeding Started....");
    const adminData = {
      name: "Admin",
      email: "admin@admin.com",
      role: UserRole.ADMIN,
      password: "adminSecret",
    };
    console.log("***** Checking Admin Exist or not");
    // check user exist on db or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!!");
    }

    const signUpAdmin = await fetch(
      "http://localhost:7000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    );

    if (signUpAdmin.ok) {
      console.log("**** Admin created");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });

      console.log("**** Email verification status updated!");
    }
    console.log("******* SUCCESS ******");
  } catch (error) {
    console.error(error);
  }
}

seedingAdmin();

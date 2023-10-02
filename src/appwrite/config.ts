import config from "@/config/config";
import { Account, Client, ID } from "appwrite";

type CreateUserAccountType = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccountType = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

const account = new Account(appwriteClient);

class AppwriteService {
  async createUserAccount({ email, password, name }: CreateUserAccountType) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccountType) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {}
    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log(`Error while fetching current user:\n${error}`);
    }

    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log(`Error while logging out:\n${error}`);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;

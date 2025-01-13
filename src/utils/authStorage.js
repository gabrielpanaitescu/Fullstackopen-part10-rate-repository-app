import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:token`);

      return token;
    } catch (error) {
      console.log("error", error);
    }
  }

  async setAccessToken(token) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:token`, token);
    } catch (error) {
      console.log("error", error);
    }
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}`);
  }
}

export default AuthStorage;

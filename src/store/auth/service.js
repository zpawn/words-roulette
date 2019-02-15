import { Auth } from "../../core/Firebase";

////

class AuthService {
  static signIn(email, password) {
    return Auth.signInWithEmailAndPassword(email, password);
  }

  static signOut() {
    return Auth.signOut();
  }

  static check() {
    return new Promise((resolve, reject) => {
      Auth.onAuthStateChanged(user => (user ? resolve(user) : reject(user)));
    });
  }
}

////

export { AuthService };

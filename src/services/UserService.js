import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const auth = getAuth();

export const createUser = async (email, password, userName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, { displayName: userName });
  } catch (e) {
    return e.message;
  }
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential?.user;
};

export const logoutUser = async () => {
  const response = await signOut(auth);
  return response;
};

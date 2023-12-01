import { useContext } from "react";
import { AuthContext } from "../Wrappers/AuthContext";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export const useUser = () => useContext(AuthContext);

export const useChangePassword = () => {
  const changePassword = async (user, currentPassword, newPassword) => {
    try {
      const credentials = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credentials);

      await updatePassword(user, newPassword);

      return { success: true, message: "Contraseña actualizada con éxito" };
    } catch (error) {
      throw new Error(error);
    }
  };

  return { changePassword };
};

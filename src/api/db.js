import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuQUib4kVbC3kbOgJ1w9HGBRmdUzWuMQY",
  authDomain: "flash-card-native-8ad8e.firebaseapp.com",
  projectId: "flash-card-native-8ad8e",
  storageBucket: "flash-card-native-8ad8e.appspot.com",
  messagingSenderId: "774590002270",
  appId: "1:774590002270:web:f5820bb06e0882a5b3f0cf",
};

//********************************************************** */
export const actionCodeSettings = {
  // URL a la que quieres redirigir después de que el usuario complete la acción.
  // Asegúrate de que el dominio esté autorizado en la consola de Firebase.
  url: "https://your-app-name.page.link",
  // Esto debe ser true para manejar el código en la aplicación.
  handleCodeInApp: true,
  // Configuración específica de React Native.
  android: {
    packageName: "com.flashcards.app",
    installApp: true,
    minimumVersion: "12",
  },
  // Dominio de enlace dinámico para Android e iOS.
  dynamicLinkDomain: "https://your-app-name.page.link",
  // Configuración adicional para el envío de correos electrónicos.
  // Puedes personalizar el asunto y el cuerpo del correo electrónico.
  emailSettings: {
    // Asunto del correo electrónico.
    subject: "Confirma tu registro en FlashCards",
    // Cuerpo del correo electrónico. Puedes usar {{url}} como marcador de posición
    // para incluir el enlace de verificación generado automáticamente.
    body: "Gracias por registrarte en FlashCards. Haz clic en el siguiente enlace para confirmar tu cuenta: {{url}}",
  },
};
//********************************************************** */

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
export const auth = getAuth(app);

export const categories = db.collection("categories");
export const cards = db.collection("cards");

// get only the error code from the error object
// example: from Firebase: Error (auth/wrong-password) -> auth/wrong-password
export const getFirebaseErrorCode = (error: Error) => {
  const errorCode = error.message.split('(')[1].split(')')[0];
  return errorCode;
};

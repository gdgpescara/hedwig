export const httpApiBaseUrl = `http://localhost:5001/${process.env.FIREBASE_PROJECT_ID}/${process.env.FIREBASE_FUNCTIONS_REGION}/http_api`;

export const login = async (
  email: string,
  password: string,
): Promise<{
  uid: string;
  idToken: string;
}> => {
  const response = await fetch(
    "http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=12345",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    },
  );

  const data = await response.json();
  return {
    uid: data.localId,
    idToken: data.idToken,
  };
};

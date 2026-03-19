import { SignJWT, jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret || secret.length === 0) {
    // Apenas num caso extremo do Dev esquecer de setar. Causa um erro fatal pois não é seguro.
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return secret;
};

export const signToken = async (payload: { role: string }) => {
  try {
    const secret = new TextEncoder().encode(getJwtSecretKey());
    const alg = "HS256";

    return await new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(getJwtSecretKey());
    const { payload } = await jwtVerify(token, secret);
    return payload; // { role: "admin" }
  } catch (error) {
    return null;
  }
};

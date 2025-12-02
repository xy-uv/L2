import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expIn: any
) =>
  jwt.sign(payload, secret, {
    expiresIn: expIn,
  });

const verifyToken = (token: string, secret: Secret): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;

export const jwts = {
  createToken,
  verifyToken,
};

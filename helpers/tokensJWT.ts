import jsonwebtoken, { JwtPayload, SignOptions } from "jsonwebtoken";

export function generateAccessToken(
  payload: JwtPayload,
  options: SignOptions,
): string | undefined {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET) return;

  return jsonwebtoken.sign(payload, ACCESS_TOKEN_SECRET, options);
}

export const generateRefreshToken = (
  payload: JwtPayload,
  options: SignOptions,
): string | undefined => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  if (!REFRESH_TOKEN_SECRET) return;

  return jsonwebtoken.sign(payload, REFRESH_TOKEN_SECRET, options);
};

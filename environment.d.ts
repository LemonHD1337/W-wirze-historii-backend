import { Secret } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      PATHFOLDER: string;
      ACCESS_TOKEN_SECRET: Secret;
      REFRESH_TOKEN_SECRET: Secret;
    }
  }
}

export {};

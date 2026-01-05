import * as Joi from 'joi';

// export default () => ({
//   host: process.env.HOST || '0.0.0.0',
//   port: parseInt(process.env.PORT || '3000', 10),
//
//   mongodbUri: process.env.MONGODB_URI,
//
//   jwt: {
//     publicKey: process.env.JWT_PUBLIC_KEY,
//     privateKey: process.env.JWT_PRIVATE_KEY,
//     expiresIn: process.env.JWT_EXPIRES_IN || '1h',
//     refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
//   },
// });
export interface JwtConfig {
  publicKey: string;
  privateKey: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export interface AuthGGConfig {
  googleClientId: string;
  googleSecret: string;
  googleCallbackUrl: string;
}

export interface ConfigEnv {
  host: string;
  port: number;
  mongodbUri: string;
  jwt: JwtConfig;
  ggAuth: AuthGGConfig;
}

export default (): ConfigEnv => ({
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000', 10),
  mongodbUri: process.env.MONGODB_URI as string,
  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY as string,
    privateKey: process.env.JWT_PRIVATE_KEY as string,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  ggAuth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleSecret: process.env.GOOGLE_SECRET as string,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
  },
});

// Schema validation để kiểm tra biến môi trường khi khởi động
export const envValidationSchema = Joi.object({
  HOST: Joi.string().default('0.0.0.0'),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().uri().required().messages({
    'any.required': 'MONGODB_URI is required in your .env file',
  }),
  JWT_PUBLIC_KEY: Joi.string().required().messages({
    'any.required': 'JWT_PUBLIC_KEY is required',
  }),
  JWT_PRIVATE_KEY: Joi.string().required().messages({
    'any.required': 'JWT_PRIVATE_KEY is required',
  }),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  GOOGLE_CLIENT_ID: Joi.string().required().messages({
    'any.required': 'GOOGLE_CLIENT_ID is required',
  }),
  GOOGLE_SECRET: Joi.string().required().messages({
    'any.required': 'GOOGLE_SECRET is required',
  }),
  GOOGLE_CALLBACK_URL: Joi.string().required().messages({
    'any.required': 'GOOGLE_CALLBACK_URL is required',
  }),
});

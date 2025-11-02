import * as Joi from 'joi';

export default () => ({
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000', 10),

  mongodbUri: process.env.MONGODB_URI,

  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY,
    privateKey: process.env.JWT_PRIVATE_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
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
});

import 'dotenv/config';

export const config = {
  port: process.env.PORT || 5000,
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export function assertConfig() {
  if (!config.geminiApiKey) {
    console.warn('[config] GEMINI_API_KEY is not set. The /api/analyze endpoint will return an error until it is configured.');
  }
}

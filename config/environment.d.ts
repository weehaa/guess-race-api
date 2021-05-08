declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION';
      PORT?: string;
      WORD_DEFAULT_LEVEL?: string;
      WORD_MIN_LENGTH?: string;
      WORD_MAX_LENGTH?: string;
    }
  }
}

export {};

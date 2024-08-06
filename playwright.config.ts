import * as dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from '@playwright/test';



export default defineConfig({
  use: {
    baseURL: 'https://dev.omni-dispatch.com',
    headless: true,
  },
  testDir: './e2e',
});

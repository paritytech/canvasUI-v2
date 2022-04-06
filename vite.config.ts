// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), eslintPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/[\\/]node_modules[\\/](react|react-dom)[\\/]/.test(id)) {
            return 'react';
          }

          if (/[\\/]node_modules[\\/](@polkadot)[\\/]/.test(id)) {
            return 'polkadot';
          }

          if (/[\\/]node_modules[\\/](@textile)[\\/]/.test(id)) {
            return 'textile';
          }
        }
      }
    }
  }
})

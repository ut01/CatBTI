import { defineConfig } from 'vite'

/**
 * - 默认 `base: './'`：构建出的 `dist/` 可用相对路径部署在任意子目录（如 GitHub Pages `…/github.io/<repo>/`）。
 * - 若必须固定绝对前缀，可构建时传入：VITE_BASE=/你的仓库名/ npm run build
 */
const base = process.env.VITE_BASE ?? './'

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
  },
})

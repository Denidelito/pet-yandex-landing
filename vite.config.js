import { resolve } from 'path';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default {
    root: resolve(__dirname, 'public'),
    base: './',
    build: {
        outDir: resolve(__dirname, 'docs'),
    },
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'public/assets/icons/')],
            symbolId: 'icon-[name]',
        }),
    ],
};

import { resolve } from 'path';
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

export default ({
    root: resolve(__dirname, 'public'),
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'public/assets/icons/')],
            symbolId: 'icon-[name]',
        }),
    ],
});

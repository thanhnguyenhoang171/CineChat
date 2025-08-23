import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@': '/src',
                '@styles': '/src/styles',
                '@assets': '/src/assets',
                '@components': '/src/components',
                '@utils': '/src/utils',
                '@pages' :'/src/pages',
            },
        },
        server: {
            port: parseInt(env.PORT),
            proxy: {
                '/api': {
                    target: env.BACKEND_URL,
                    changeOrigin: true,
                },
            },
        },
    };
});

import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'slash-util-files.s3.amazonaws.com',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'slash-video-files.s3.amazonaws.com',
      port: '',
      pathname: '/**'
    }],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sass': path.resolve(__dirname, 'src/scss'),      
    };

    return config;
  }
};
 
export default withNextIntl(nextConfig);

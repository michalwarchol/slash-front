import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
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
    unoptimized: true, // this change is necessary because we don't want to store all images from S3 in our Next server.
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

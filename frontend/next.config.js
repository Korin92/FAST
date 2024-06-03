/** @type {import('next').NextConfig} */
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const withNextIntl = require('next-intl/plugin');

const nextIntlConfig = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextIntlConfig(nextConfig);




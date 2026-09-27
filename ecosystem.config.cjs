module.exports = {
  apps: [
    {
      name: 'litekart-store-front',
      cwd: '/var/www/b2c/litekart-store-front',
      script: 'npm',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 7003,
        PUBLIC_LITEKART_API_URL: 'https://api.juragan.web.id',
        PUBLIC_LITEKART_DOMAIN: 'juragan.web.id',
        PUBLIC_SITEMAP_URL: 'https://pub-3.r2.dev',
        PUBLIC_STOREFRONT_THEME: 'default',
        ORIGIN: 'https://juragan.web.id',
        BODY_SIZE_LIMIT: 52428800

      }
    }
  ]
};

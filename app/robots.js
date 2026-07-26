export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/espace-pro', '/api/'],
    },
    sitemap: 'https://www.okazi.fr/sitemap.xml',
  }
}
module.exports = {
  pwa: {
      name: "PGS Comandero",
      themeColor:"#4DBA87",
      manifestOptions: {
        start_url: "index.html",
      },
      workboxOptions: {
          skipWaiting: true,
          cleanupOutdatedCaches: true
      }
  }
}
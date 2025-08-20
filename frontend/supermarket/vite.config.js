export default defineConfig({
  plugins: [react()],
  base: "/TM_super_market_webapp/",  
  server: {
    proxy: {
      '/api': {
        target: 'https://appsail-50030373162.development.catalystappsail.in',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

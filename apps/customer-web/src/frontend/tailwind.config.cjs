module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        theme: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          dark: 'var(--color-dark)',
          neutral: 'var(--color-neutral)',
          surface: 'var(--color-surface)',
          background: 'var(--color-background)',
          announcementBg: 'var(--color-announcementBg)',
          logoStart: 'var(--color-logoStart)',
          logoEnd: 'var(--color-logoEnd)',
        },
      },
    },
  },
  plugins: [],
}

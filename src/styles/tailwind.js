const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      // Your custom theme extensions, if any
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.sticky': {
          position: '-webkit-sticky',
          position: 'sticky',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
    // Any other plugins you're using
  ],
}
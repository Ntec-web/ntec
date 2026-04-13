// kilo/postcss.config.js
import purgecss from '@fullhuman/postcss-purgecss';

module.exports = {
  plugins: [
    purgecss({
      // Como tus HTML están en la raíz de ntec (fuera de kilo),
      // usás ../ para subir un nivel y apuntar a ellos
      content: ['../*.html', '../**/*.html']
    })
  ]
};

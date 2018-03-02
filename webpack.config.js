const { resolve } = require('path');
/*
Antes de que webpack realice sus transformaciones, su archivo de entrada ( src / index.js ) y su archivo HTML(index.html ) están ubicados en el mismo directorio. El archivo HTML contiene un enlace al archivo de entrada, buscando algo como esto: <script src="./index.js"></script>.
Después de que el paquete web realice sus transformaciones, su nuevo archivo de entrada se ubicará en dist / main.js , ¡y ese enlace ya no funcionará!
Cuando webpack crea un nuevo archivo JavaScript, también necesita crear un nuevo archivo HTML. Hay una herramienta para esto: html-webpack-plugin.
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Abre una nueva pestaña del navegador cuando se carga Webpack
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

module.exports = {
  // El directorio base (ruta absoluta!)
  entry: [
    './src/index.js'
  ],
  // Las opciones le dicen a Webpack cómo escribir los archivos compilados en el disco. Tenga en cuenta que, si bien puede haber múltiples entrypoints, solo output especifica una configuración
  output: {
    // Ubicación del nuevo archivo creado
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  // Se puede usar para configurar el comportamiento de webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
  },
  // Una serie de cargadores aplicados automáticamente.
  module: {
    rules: [
      {
        // Una condición que debe cumplirse: se usa para coincidir con la prueba de extensión de archivo
        test: /\.js$/,
        // Una condición que no se debe cumplir
        exclude: /node_modules/,
        use: {
          // Carga el código ES2015 + y transpila a ES5 usando Babel  
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              // Babel preestablecido para todos los complementos de React.
              'react',
              'react-boilerplate'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          //  Agregar exportaciones de un módulo como estilo a DOM
          { loader: 'style-loader' },
          // Carga el archivo CSS con importaciones resueltas y devuelve el código CSS
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // define la plantilla que el complemento usará para generar el HTML
      template: resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html'
      // 'inject: body' indica que el JavaScript se ubicara en la parte inferior de la página, justo antes del </body>, en lugar de en el <head>.

    }),
    new OpenBrowserWebpackPlugin({
      url: 'http://localhost:8080'
    })
  ]
}
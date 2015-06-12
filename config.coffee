exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.

  # Application build path.  Default is public/
  # buildPath: ''

  files:
    javascripts:
      joinTo:
        'scripts/app.js': /^app/
        'scripts/vendor.js': /^(vendor)/
        'test/scripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/scripts/vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: []
    stylesheets:
      joinTo:
        'styles/app.css': /^(app|vendor)/,
        'test/styles/test.css': /^test/
      order:
        before: [
          'vendor/styles/grid.styl'
          'app/views/styles/index.styl'
        ]
        # after: ['vendor/styles/helpers.css']
    templates:
      joinTo: 'scripts/app.js'

  plugins:
    blanket:
      engineOnly: true
    stylus: # https://github.com/brunch/stylus-brunch#spriting
      spriting: no,
      iconPath: 'app/assets/images'
    react:
      transformOptions:
# options passed through to `react-tools.main.transformWithDetails()`
        harmony: yes    # include some es6 transforms
        sourceMap: yes   # generate inline source maps
        stripTypes: no  # strip type annotations
# if you use babel to transform jsx, transformOptions would be passed though to `babel.transform()`
# See: http://babeljs.io/docs/usage/options/
    babel: false
  minify: no
  modules:
    wrapper: 'commonjs'
    definition: false
    addSourceURLs: true

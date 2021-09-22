const configs = require('./configs')
const plugin = require('tailwindcss/plugin')

const boxModel = (theme, { negative }) => ({
  auto: 'auto',
  ...configs.spacing,
  ...configs.widths,
  ...negative(configs.spacing),
})

const colors = theme => theme('colors');

const widthHeight = {
  half: '50%', full: '100%', auto: 'auto', 'fit-content': 'fit-content'
}

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
const cols = range(1, 23)

module.exports = {
  mode: 'jit',

  purge: configs.purge,

  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },

  theme: {
    fontSize: configs.spacing,
    fontFamily: configs.fontFamily,
    zIndex: configs.zIndex,
    colors: configs.colors,
    screens: configs.screens,
    borderRadius: configs.borderRadius,
    opacity: configs.opacity,
    stroke: colors,
    fill: colors,
    margin: boxModel,
    padding: boxModel,
    spacing: { ...configs.spacing },
    gridTemplateColumns: configs.gridTemplateColumns(cols),
    gridColumn: configs.gridColumn(cols),
    gridColumnStart: configs.gridColumnPosition(cols),
    gridColumnEnd: configs.gridColumnPosition(cols),

    height: {
      ...configs.spacing,
      ...widthHeight,
      ...{ 'screen': '100vh' }
    },
    width: {
      ...configs.widths,
      ...configs.spacing,
      ...widthHeight,
      ...{ 'screen': '100vw' }
    },
    boxShadow: {
      0: '4px 4px 0 #080D16',
      1: '12px 12px 0px rgba(8, 13, 22, 0.4)',
      2: '6px 6px 0px #080D16'
    }
  },

  extend: {
    borderWidth: {
      1: 1
    },
    extend: {
      borderWidth: {
        1: 1
      },
      verticalAlign: {
        super: 'super'
      }
    },
  },

  corePlugins: {
   container: false,
  },

  plugins: [
    plugin(function({ addUtilities }) {
      const variants = {
        l: {},
        r: {},
        t: {},
        b: {},
        x: {
          paddingLeft: {},
          paddingRight: {}
        },
        y: {
          paddingTop: {},
          paddingBottom: {}
        }
      }
      let variations = {}
      let firstProp, secondProp;
      const count = {
        0: '0',
        1: 'var(--contain)',
        2: 'calc(var(--contain) * 2)'
      }

      for (const prop in variants) {
        if (Object.hasOwnProperty.call(variants, prop)) {

          for (const key in count) {
            if (Object.hasOwnProperty.call(count, key)) {
              let className = `.contain-${prop.charAt(0)}-${key}`;
              variations[className] = {}

              const value = count[key];
              switch (prop) {
                case 'l':
                  firstProp = 'paddingLeft'
                  break;
                case 'r':
                  firstProp = 'paddingRight'
                  break;
                case 'x':
                  firstProp = 'paddingLeft'
                  secondProp = 'paddingRight'
                  break;
                case 'b':
                  firstProp = 'paddingBottom'
                  break;
                case 't':
                  firstProp = 'paddingTop'
                  break;
                case 'y':
                  firstProp = 'paddingBottom'
                  secondProp = 'paddingTop'
                  break;
              }

              variations[className][firstProp] = value
              if (secondProp) {
                variations[className][secondProp] = value
              }
            }
          }
        }
      }

      addUtilities(variations, ['responsive'])
    })
  ],
}

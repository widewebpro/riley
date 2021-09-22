/*
  To assign a module to a specific UI element:
  - Add: class="js-module"
  - Add: data-js-module="ModuleName"

  This will dynamically load any module that is needed for a spcific element/component

  The element is passed to the custructor() as a param so you can use it.

  constructor(el) {
    this.DOM = {}
    this.DOM.el = el

    console.log(el) // will produce "<componentElement />"
  }
*/

import {getModule} from '../_actions'

export default class ModuleRenderer {
  constructor() {
    this.renderedModules = []
    this.renderedCustomElements = []

  }

  init() {
    this.modules = document.getElementsByClassName('js-module')
    this.customElements = document.getElementsByClassName('js-custom-el')
    this.importedModules = []

    // Custom Elements
    for (let i = 0; i < this.customElements.length; i++) {
      const module = this.customElements[i];
      let moduleName = module.getAttribute('data-js-module');
      this.renderedCustomElements[i] = this.importCustomElement(moduleName)
    }

    // Regular Modules
    for (let i = 0; i < this.modules.length; i++) {
      const module = this.modules[i];
      let moduleName = module.getAttribute('data-js-module');

      if(moduleName) {
        if(moduleName.includes(',')) {
          moduleName = moduleName.split(',')
          let multipeModulesArray = []

          for (let x = 0; x < moduleName.length; x++) {
            let name = moduleName[x];
            multipeModulesArray[x] = this.importModule(name, module)

            this.renderedModules[i] = multipeModulesArray
            this.renderedModules[i][x].module.then((x) => x.init())

            this.importedModules[i] = {
              'name': moduleName,
              'el': module
            }
          }
        } else {
          this.renderedModules[i] = this.importModule(moduleName, module)
          this.renderedModules[i].module.then((x) => {
            if(!x) return
            return x.init()
          })

          this.importedModules[i] = {
            'name': moduleName,
            'el': module
          }
        }
      }
    }

    console.log('Modules:', this.importedModules);
    console.log('Custom Elements:', this.renderedCustomElements);
  }

  isModule(renderedModule) {
    let obj = {}

    if('module' in renderedModule) {
      renderedModule.module.then((x) => x.init())

      obj = {
        'name': moduleName,
        'el': module
      }
    }

    return obj
  }

  importCustomElement(name) {
    return {
      name: name,
      module: getModule(name)
    }
  }

  importModule(name, module) {
    return {
      name: name,
      module: getModule(name).then((x) => {
        if (!x) return
        return new x.default(module)
      }).catch((e) => {
        console.log(module, e);
      })
    }
  }

  destroy() {
    this.destroyedModules = []
    // Destroy all components!
    for (let i = 0; i < this.renderedModules.length; i++) {
      let moduleObj = this.renderedModules[i];

      if(Array.isArray(moduleObj)) {
        this.destroyedModules[i] = [];

        for (let x = 0; x < moduleObj.length; x++) {
          this.destroyedModules[i][x] = moduleObj[x].name
          this.destroyModule(moduleObj[x].name, moduleObj[x].module)
        }
      } else {
        this.destroyedModules[i] = moduleObj.name
        this.destroyModule(moduleObj.name, moduleObj.module)
      }
    }

    console.log('Destroyed Modules:', this.destroyedModules);
  }

  destroyModule(module) {
    if (typeof module != 'object') return

    module.then((x) => {
      if (typeof x.destroy != 'function') return
      x.destroy()
    })
  }
}

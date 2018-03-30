import Basic from './basic.js'

class Editor {
    constructor(components) {
        this.modules = {}
        var modules = Object.values(components.modules)

        var parser = new DOMParser()
        modules.forEach(m=>{
            var module = {
                name: m.name,
                title: m.title,
                components: {}
            }
            var tpl = parser.parseFromString(m.templates, 'text/xml')
            tpl.querySelectorAll('.ui-component').forEach(c=> {
                try {
                    module.components[c.id] = Object.assign(
                    (m.components[c.id] || {}),
                    {
                        'list-item': c.querySelector('.ui-list-item').innerHTML,
                        'template': c.querySelector('.ui-template').innerHTML,
                        'name': `${m.name}::${m.components[c.id].name}`,
                        'module': m.name,
                        'baseName': m.components[c.id].name
                    })
                } catch(e) {
                    // console.log(e)
                }
            })

            this.modules[m.name] = module
        })
    }

    getComponentByName(name) {
        var module = 'basic'
        var component = name
        var c = name.split('::')
        if (c.length > 1) {
            module = c[0]
            component = c[1]
        }
        try {
            return this.modules[module].components[component]
        } catch(e) {
        }
        return null
    }

    canDropItemTo (item, to) {
        item = this.getComponentByName(item)
        to = this.getComponentByName(to)
        if (to.container) {
            if (to.container.accepts) {
                return to.container.accepts.indexOf(item.baseName)!=-1
            }
            return true
        }
        return false
    }
}

export var Components = new Editor({
  modules: {
    [Basic.name]: Basic
  }
})

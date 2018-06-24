import Basic from './basic.js'
import Html from './html.js'
import Buefy from './buefy.js'
// import Ionic from './ionic.js'

class Editor {
    constructor(components) {
        this.modules = {}
        this._excludedAttributes = ['class','style','content','css','label']
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
                    var listItem = c.querySelector('.ui-list-item');
                    if (listItem) {
                        listItem = listItem.innerHTML
                    }
                    var preview = null
                    var description = null
                    
                    if (c.querySelector('.ui-preview')) {
                      preview = c.querySelector('.ui-preview').innerHTML
                    }
                    if (c.querySelector('.ui-description')) {
                      description = c.querySelector('.ui-description').innerHTML
                    }

                    module.components[c.id] = Object.assign(
                    (m.components[c.id] || {}),
                    {
                        'list-item': listItem,
                        'template': c.querySelector('.ui-template').innerHTML,
                        'preview': preview,
                        'description': description,
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

    containerClass (node) {
      if (!node)
        return []
      if (node.id == 'basic::page') {
        return []
      }
      var comp = this.getComponentByName(node.name)
      if (comp.container) {
        var nodeOptionClass = ''
        if (node.options) {
          nodeOptionClass = node.options.class
        }
        return [comp.container.class, nodeOptionClass]
      }
      return []
    }

    containerStyle (node) {
      if (!node)
        return ''
      if (node.id == 'basic::page') {
        return ''
      }
      var comp = this.getComponentByName(node.name)
      if (comp.container && node.options.style) {
        return node.options.style
      }
      return ''
    }

    preview (node) {
      return this.html(node, true)
    }

    html (node, preview) {
      var comp = this.getComponentByName(node.name)
      if (comp.container) {
        return ''
      }

      if (comp && comp.template) {
        try {
          var options = Object.assign({}, node.options || {})
          if (comp.options) {
            comp.options.map(o=>o.name).forEach(k => {
              if (!options[k]) {
                options[k] = ''
              }
            })
          }
          
          var inject = []
          Object.keys(options).forEach(k => {
            var value = options[k]
            
            if (this._excludedAttributes.indexOf(k) != -1) { // } || k[0] == ':') {
              return
            }

            inject.push(`${k}="${value}"`)
          })

          options.compile = function(t) {
            var res = eval(t)
            res = res.replace('data-ui-inject="true"', inject.join(' '))
            return res
          }

          var template = preview && comp.preview ? comp.preview : comp.template
          return options.compile('`'+template+'`')
        } catch(e) {
          console.log(e)
        }
        return comp.template
      }
      return ''
    }

    _renderComponent (n) {
        return this.html(n)
    }

    _renderContainer (n) {
        var comp = this.getComponentByName(n.name)
        var res = ''

        var tag = 'div'
        var begin = ''
        var end = ''

        var containerClass = this.containerClass(n).filter(c=>c && c!='').join(' ')
        if (containerClass != '') {
            containerClass = ' class="' + containerClass + '"'
        }
        var containerStyle = this.containerStyle(n)
        if (containerStyle != '') {
            containerStyle = ' style="' + containerStyle + '"'
        }

        var options = Object.assign({}, n.options || {})
        if (comp.options) {
            comp.options.map(o=>o.name).forEach(k => {
              if (!options[k]) {
                options[k] = ''
              }
            })
        }

        var attributes = []
        Object.keys(options).forEach(k => {
            
            if (k == ':tag') {
              tag = options[k]
            }
            if (k == ':begin') {
              begin = options[k]
            }
            if (k == ':end') {
              end = options[k]
            }

            var value = options[k]
            if (this._excludedAttributes.indexOf(k) != -1 || k[0] == ':') {
              return
            }
            attributes.push(`${k}="${value}"`)
        })
        if (attributes.length) {
            attributes = ' ' + attributes.join(' ')
        } else {
            attributes=''
        }

        res += begin
        res += `<${tag}${containerClass}${containerStyle}${attributes}>`

        var children = n.children || []
        children.forEach(c=>{
          try {
            var comp = this.getComponentByName(c.name)
            if (comp.container) {
                res += this._renderContainer(c)
            } else {
                res += this._renderComponent(c)
            }
          } catch(e) {
            console.log(e)
          }
        })
        res += `</${tag}>`
        res += end
        return res
    }

    render (root) {
      if (!root) {
        return ''
      }
      var res = this._renderContainer(root)
      return res
    }
}

export var Components = new Editor({
  modules: {
    [Basic.name]: Basic,
    [Html.name]: Html,
    [Buefy.name]: Buefy,
    // [Ionic.name]: Ionic
  }
})

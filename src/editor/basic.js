import * as tpl from './basic.vue.html'

export default {
  name: 'basic',
  title: 'Basic',
  templates: tpl,
  components: {
    'row': {
        name: 'row',
        title: 'Row',
        container: {
            class: 'columns'
        }
    },
    'column': {
        name: 'column',
        title: 'Column',
        container: {
            class: 'column'
        }
    },
    'input': {
        name: 'input',
        title: 'Input',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'style', title: 'Style' },
            { name: 'label', title: 'Label' },
            { name: 'placeholder', title: 'Placeholder' }
        ]
    },
    'checkbox': {
        name: 'checkbox',
        title: 'Checkbox'
    },
    'button': {
        name: 'button',
        title: 'Button',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'style', title: 'Style' }
        ]
    }
  }
}

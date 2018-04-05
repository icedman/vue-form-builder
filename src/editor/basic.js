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
        },
        options: [
            { name: 'class', title: 'Class' }
        ]
    },
    'column': {
        name: 'column',
        title: 'Column',
        container: {
            class: 'column'
        },
        options: [
            { name: 'class', title: 'Class' }
        ]
    },
    'container': {
        name: 'container',
        title: 'Container',
        container: {
            class: ''
        },
        options: [
            { name: 'class', title: 'Class' }
        ]
    },
    'button': {
        name: 'button',
        title: 'Button',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'style', title: 'Style' },
            { name: 'label', title: 'Label', default: 'Button' },
        ]
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
    'radio': {
        name: 'radio',
        title: 'Radio'
    },
    'textarea': {
        name: 'textarea',
        title: 'Textarea'
    },
    'select': {
        name: 'select',
        title: 'Select'
    }
  }
}

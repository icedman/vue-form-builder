import * as tpl from './basic.vue.html'

export default {
  name: 'basic',
  title: 'Basic',
  templates: tpl,
  components: {
    'page': {
        name: 'page',
        title: 'Page',
        container: {
            class: 'column'
        },
        options: [
            { name: 'name', 'title': 'Name' },
            { name: 'title', 'title': 'Title' },
            { name: 'class', title: 'Class' },
            { name: 'style', title: 'Style' }
        ]
    },
    'row': {
        name: 'row',
        title: 'Row',
        container: {
            class: 'columns'
        },
        options: [
            { name: 'class', title: 'Class' },
            { name: 'style', title: 'Style' }
        ]
    },
    'column': {
        name: 'column',
        title: 'Column',
        container: {
            class: 'column'
        },
        options: [
            { name: 'class', title: 'Class' },
            { name: 'style', title: 'Style' }
        ]
    },
    'container': {
        name: 'container',
        title: 'Container',
        container: {
            class: ''
        },
        options: [
            { name: 'class', title: 'Class' },
            { name: 'style', title: 'Style' }
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
        title: 'Checkbox',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'label', title: 'Label', default: 'Checkbox' }
        ]
    },
    'radio': {
        name: 'radio',
        title: 'Radio',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'label', title: 'Label', default: 'Radio' },
            { name: 'name', title: 'Name' },
        ]
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

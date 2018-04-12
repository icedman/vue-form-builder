import * as tpl from './ionic.vue.html'

export default {
  name: 'ionic',
  title: 'Ionic',
  templates: tpl,
  components: {
    // 'button': {
    //     name: 'button',
    //     title: 'Button',
    //     options: [
    //         { name: 'class', title: 'Class' },
    //         { name: 'style', title: 'Style' },
    //         { name: 'label', title: 'Label', default: 'Button' },
    //     ]
    // },
    // 'input': {
    //     name: 'input',
    //     title: 'Input',
    //     options: [
    //         { name: 'class', title: 'Class' },
    //         { name: 'style', title: 'Style' },
    //         { name: 'label', title: 'Label' },
    //         { name: 'placeholder', title: 'Placeholder' }
    //     ]
    // },
    // 'checkbox': {
    //     name: 'checkbox',
    //     title: 'Checkbox',
    //     options: [
    //         { name: 'class', title: 'Class' },
    //         { name: 'label', title: 'Label', default: 'Checkbox' }
    //     ]
    // },
    // 'radio': {
    //     name: 'radio',
    //     title: 'Radio',
    //     options: [
    //         { name: 'class', title: 'Class' },
    //         { name: 'label', title: 'Label', default: 'Radio' },
    //         { name: 'name', title: 'Name' },
    //     ]
    // },
    'toggle': {
        name: 'toggle',
        title: 'Toggle',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'label', title: 'Label', default: 'Toggle' }
        ]
    },
    'textarea': {
        name: 'textarea',
        title: 'Textarea'
    },
    // 'select': {
    //     name: 'select',
    //     title: 'Select'
    // },
    // 'date': {
    //     name: 'date',
    //     title: 'date',
    //     options: [
    //         { name: 'class', title: 'Class' },
    //         { name: 'label', title: 'Label', default: 'Select a date...' },
    //         { name: 'placeholder', title: 'Placeholder' }
    //     ]
    // },
  }
}

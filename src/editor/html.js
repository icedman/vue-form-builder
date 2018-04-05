import * as tpl from './html.vue.html'

export default {
  name: 'html',
  title: 'Html',
  templates: tpl,
  components: {
    'link': {
        name: 'link',
        title: 'Link',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'href', title: 'URL' },
            { name: 'label', title: 'Label', default: 'Link' },
        ]
    },
    'img': {
        name: 'img',
        title: 'Image',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'src', title: 'Source' }
        ]
    },
    'heading': {
        name: 'heading',
        title: 'Heading',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'label', title: 'Label', default: 'Heading' },
        ]
    },
    'paragraph': {
        name: 'paragraph',
        title: 'Paragraph',
        options: [
            { name: 'class', title: 'Class' },
            { name: 'content', title: 'Content', default: 'Paragraph', content:true }
        ]
    },

  }
}

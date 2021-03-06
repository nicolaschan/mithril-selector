# mithril-selector
Select component for [Mithril.js](https://mithril.js.org/) with auto-completion. Inspired by [selectize.js](https://selectize.github.io/selectize.js/), which has more features but requires JQuery.

- Suggest options as you type
- Override CSS as you like
- TypeScript support

<p align="center">
  <img src="https://i.imgur.com/8qiEwIE.gif" width="290px" height="208px">
</p>

## Usage
```javascript
const { Select } = require('mithril-selector')

const Content = {
  view: function (vnode) {
    return [
      m('div', `Current value: ${vnode.state.value}`),
      m('br'),
      m(Select, {
        value: vnode.state.value,
        placeholder: 'Select',
        options: [
          'Option One', 'Option Two', 'Option Three'
        ],
        onselect: (value) => vnode.state.value = value
      })
    ]
  }
}
```
```html
<!-- CSS files are located in node_modules/mithril-selector/style/dist -->
<link rel="stylesheet" href="default.css">
```
See [the example usage](https://github.com/nicolaschan/mithril-selector/tree/master/example) for a full working example.

## Developing
```bash
git clone https://github.com/nicolaschan/mithril-selector.git
cd mithril-selector
yarn install --production=false
yarn build-example --watch
# Then open example/index.html in your browser
```


# mithril-selector
Auto-completing, typing based select component for [Mithril.js](https://mithril.js.org/). Inspired by [selectize.js](https://selectize.github.io/selectize.js/), which has more features but uses JQuery.

## Usage
```javascript
const Select = require('mithril-selector')

const Component = {
  view: function (vnode) {
    return m(Select, {
      placeholder: 'City',
      options: ['Option One', 'Option Two', 'Option Three'],
      onselect: value => {
        // Handle value selection change
      }
    })
  }
}
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


# mithril-selector
Mithril select element with auto-complete

## Usage
```javascript
const Select = require('mithril-selector')

const Component = {
  view: function (vnode) {
    return m(Select, {
      placeholder: 'City',
      options: ['Mountain View', 'Los Altos', 'Palo Alto'],
      onselect: value => {
        // handle value selection change
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


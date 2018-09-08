import * as m from 'mithril'
import Dropdown from './Dropdown'

interface Attrs {
  placeholder?: string,
  options: Array<string>
}

export default {
  view (vnode: m.Vnode<Attrs>) {
    return [m('input[type=text]', {
      placeholder: vnode.attrs.placeholder
    }), m(Dropdown, {
      options: vnode.attrs.options
    })]
  }
} as m.Component<Attrs, {}>
import * as m from 'mithril'

interface Attrs {
  options: Array<string>
}

export default {
  view (vnode: m.Vnode<Attrs>) {
    return vnode.attrs.options.map(option => m('div', option))
  }
}
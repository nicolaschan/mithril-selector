import * as m from 'mithril'
import Dropdown from './Dropdown'

interface Attrs {
  placeholder?: string,
  options: Array<string>,
  onselect: (value: string) => void
}

interface State {
  filter: string,
  selected?: string,
  focused: boolean
}

interface Keypress {
  key: string,
  charCode: number,
  keyCode: number
}

function onKey(key: string, f: (keypress: Keypress) => void): (keypress: Keypress) => void {
  return function (keypress) {
    if (keypress.key === key) { f(keypress) }
  }
}

export default {
  filter: '',
  selected: undefined,
  focused: false,
  view (vnode: m.Vnode<Attrs, State>) {
    return [m('input[type=text]', {
      placeholder: vnode.attrs.placeholder,
      oninput: m.withAttr('value', value => vnode.state.filter = value),
      onfocus: () => vnode.state.focused = true,
      onblur: () => vnode.state.focused = false,
      onkeypress: onKey('Enter', console.log)
    }), m(Dropdown, {
      visible: vnode.state.focused,
      options: vnode.attrs.options,
      filter: vnode.state.filter
    })]
  }
} as m.Component<Attrs, State>
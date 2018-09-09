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
  focused: boolean,
  options: Array<string>,
  value: string,
  typing: boolean
}

interface Keypress {
  key: string,
  charCode: number,
  keyCode: number
}

function includesNoCase(filter: string = ''): (str: string) => boolean {
  return function (str) {
    return str.toLowerCase().includes(filter.trim().toLowerCase())
  }
}

function onKey(key: string, f: (keypress: Keypress) => void): (keypress: Keypress) => void {
  return function (keypress) {
    if (keypress.key === key) { f(keypress) }
  }
}

function keys() {

}

export default {
  filter: '',
  selected: undefined,
  focused: false,
  value: '',
  typing: true,
  view (vnode: m.Vnode<Attrs, State>) {
    const options = vnode.attrs.options
      .filter(includesNoCase(vnode.state.filter))
    return [m('input[type=text]', {
      style: {
        'font-weight': (vnode.state.typing) ? 400 : 600
      },
      placeholder: vnode.attrs.placeholder,
      oninput: m.withAttr('value', value => {
        if (!vnode.state.typing) {
          vnode.state.filter = ''
          vnode.state.typing = true
        } else {
          vnode.state.filter = value
        }
      }),
      value: vnode.state.filter,
      onfocus: () => vnode.state.focused = true,
      onblur: () => vnode.state.focused = false,
      onkeypress: onKey('Enter', () => {
        const value = options[0]
        if (!value) { return }
        vnode.state.value = value
        vnode.attrs.onselect(value)
        vnode.state.filter = value
        vnode.state.typing = false
      })
    }), m(Dropdown, {
      visible: vnode.state.focused && vnode.state.typing,
      options: options,
      filter: vnode.state.filter,
      onselect: console.log
    })]
  }
} as m.Component<Attrs, State>
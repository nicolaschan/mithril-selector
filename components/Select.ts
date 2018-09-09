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
  typing: boolean,
  hover: string
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

function keys(...each: Array<(keypress: Keypress) => void>): (keypress: Keypress) => void {
  return function (keypress) {
    each.map(f => f(keypress))
  }
}

function setSelection (vnode: m.Vnode<Attrs, State>, value: string) {
  if (!value) { return }
  vnode.state.value = value
  vnode.attrs.onselect(value)
  vnode.state.filter = value
  vnode.state.typing = false
}

function setHover (vnode: m.Vnode<Attrs, State>, value: string) {
  if (!value) { return }
  vnode.state.hover = value
}

export default {
  filter: '',
  selected: undefined,
  focused: false,
  value: '',
  typing: true,
  view (vnode: m.Vnode<Attrs, State>) {
    const options = (vnode.state.typing) ?
      vnode.attrs.options.filter(includesNoCase(vnode.state.filter)) :
      vnode.attrs.options
    return m('.selector', [m('input[type=text]', {
      style: {
        'font-weight': (vnode.state.typing) ? 400 : 600
      },
      placeholder: vnode.attrs.placeholder,
      oninput: m.withAttr('value', value => {
        if (vnode.state.typing) {
          vnode.state.filter = value
          vnode.state.hover = options[0]
        }
      }),
      value: vnode.state.filter,
      onfocus: (e: any) => {
        vnode.state.focused = true
      },
      onblur: (e: any) => {
        vnode.state.focused = false
        vnode.state.filter = vnode.state.value
        vnode.state.typing = !vnode.state.filter
      },
      onkeypress: keys(onKey('Enter', (e: any) => {
        e.target.blur()
        setSelection(vnode, vnode.state.hover) 
      }), onKey('Backspace', () => {
        if (!vnode.state.typing) {
          vnode.state.filter = ''
          vnode.state.typing = true
        }
      }), onKey('ArrowUp', () => {
        vnode.state.hover = options[Math.max(options.indexOf(vnode.state.hover) - 1, 0)]
      }), onKey('ArrowDown', () => {
        vnode.state.hover = options[Math.min(options.indexOf(vnode.state.hover) + 1, options.length - 1)]
      }))
    }), m(Dropdown, {
      visible: vnode.state.focused,
      options: options,
      filter: (vnode.state.typing) ? vnode.state.filter : '',
      hover: vnode.state.hover,
      onselect: (value: string) => {
        setSelection(vnode, value)
      },
      onhover: (value: string) => {
        setHover(vnode, value)
      }
    })])
  }
} as m.Component<Attrs, State>
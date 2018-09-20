import * as m from 'mithril'
import Dropdown from './Dropdown'

export interface Option {
  display: string,
  value: string
}

interface Attrs {
  placeholder?: string,
  options: Array<Option | string>, 
  value?: string,
  onselect: (value: string) => void
}

interface State {
  filter: string,
  focused: boolean,
  options: Array<Option>,
  typing: boolean,
  hover: Option 
}

interface Keypress {
  key: string,
  charCode: number,
  keyCode: number
}

function includesNoCase(filter: string = ''): (option: Option) => boolean {
  return function (option) {
    return option.display.toLowerCase().includes(filter.trim().toLowerCase())
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
  vnode.attrs.onselect(value)
}

function setHover (vnode: m.Vnode<Attrs, State>, option: Option) {
  if (!option) { return }
  vnode.state.hover = option 
}

function findByValue(options: Array<Option>, value: string) {
  return options.filter(option => option.value === value)[0]
}

function toOption (option: Option | string): Option {
  if (typeof option === 'string') {
    return {
      display: option,
      value: option
    }
  }
  return option
}

export default {
  filter: '',
  focused: false,
  value: '',
  typing: false,
  options: [],
  oninit (vnode: m.Vnode<Attrs, State>) {
    vnode.state.options = vnode.attrs.options.map(toOption)
  },
  onbeforeupdate (vnode: m.Vnode<Attrs, State>) {
    if (vnode.attrs.value && !vnode.state.typing) {
      vnode.state.filter = findByValue(vnode.state.options, vnode.attrs.value).display
      vnode.state.typing = false
    }
  },
  view (vnode: m.Vnode<Attrs, State>) {
    const options = (vnode.state.typing) ?
      vnode.state.options.filter(includesNoCase(vnode.state.filter)) :
     vnode.state.options 
    if (options.indexOf(vnode.state.hover) < 0) {
      vnode.state.hover = options[0]
    }
    return m('.selector', [m('input[type=text]', {
      autocomplete: false,
      spellcheck: false,
      class: [{
        condition: options.length === 0,
        class: 'selector-textbox-invalid'
      }, {
        condition: vnode.state.filter && !vnode.state.typing,
        class: 'selector-textbox-selected'
      }].filter(c => c.condition).map(c => c.class).join(' '),
      style: {
        'font-weight': (!vnode.state.filter || vnode.state.typing) ? 400 : 600,
        cursor: 'pointer'
      },
      placeholder: vnode.attrs.placeholder,
      oninput: m.withAttr('value', value => {
        if (vnode.state.typing) {
          vnode.state.filter = value
          vnode.state.hover = options[0]
        }
      }),
      value: vnode.state.filter,
      onmousedown: (e: any) => {
        if (vnode.state.focused) {
          e.target.blur()
          e.preventDefault()
        }
      },
      onfocus: (e: any) => {
        vnode.state.focused = true
        if (!vnode.state.filter) {
          vnode.state.typing = true
        }
      },
      onblur: (e: any) => {
        vnode.state.focused = false
        vnode.state.typing = false
      },
      onkeypress: keys(onKey('Enter', (e: any) => {
        e.target.blur()
        if (options.length > 0) {
          setSelection(vnode, vnode.state.hover.value) 
        }
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
      onselect: (option: Option) => {
        setSelection(vnode, option.value)
      },
      onhover: (option: Option) => {
        setHover(vnode, option)
      }
    }), m('.selector-caret',  m('svg[viewBox=0,0,20,10]', (vnode.state.focused) ? m('polygon[points=0,10 10,0 20,10, 18,10, 10,2 2,10]') :
      m('svg', m('polygon[points=0,0 10,10 20,0 18,0 10,8 2,0]')))])
  }
} as m.Component<Attrs, State>

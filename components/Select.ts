import * as m from 'mithril'
import Dropdown from './Dropdown'

export interface ISelectOption {
  display: string,
  value: string
}

interface Attrs {
  placeholder?: string,
  options: Array<ISelectOption | string>, 
  value?: string,
  onselect: (value: string) => void
}

interface State {
  filter: string,
  focused: boolean,
  options: Array<ISelectOption>,
  typing: boolean,
  hover: string,
  justOpened: boolean
}

interface Keypress {
  key: string,
  charCode: number,
  keyCode: number
}

function includesNoCase(filter: string = ''): (option: ISelectOption) => boolean {
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

function setHover (vnode: m.Vnode<Attrs, State>, option: ISelectOption) {
  if (!option) { return }
  vnode.state.hover = option.value
}

function findByValue(options: Array<ISelectOption>, value: string) {
  return options.filter(option => option.value === value)[0]
}

function indexByValue(options: Array<ISelectOption>, value: string) {
  return options.map(option => option.value).indexOf(value)
}

function toISelectOption (option: ISelectOption | string): ISelectOption {
  if (typeof option === 'string') {
    return {
      display: option,
      value: option
    }
  }
  return option
}

const Select = {
  filter: '',
  focused: false,
  value: '',
  typing: false,
  options: [],
  justOpened: true,
  view (vnode: m.Vnode<Attrs, State>) {
    const options = (vnode.state.typing) ?
      vnode.attrs.options
        .map(toISelectOption)
        .filter(includesNoCase(vnode.state.filter)) :
      vnode.attrs.options
        .map(toISelectOption)
    const option = findByValue(options, vnode.attrs.value || '')
    if (vnode.attrs.value && !vnode.state.typing) {
      vnode.state.filter = option ? option.display : ''
      if (option && vnode.state.justOpened) {
        vnode.state.hover = option.value
      }
    }
    if (options.map(option => option.value).indexOf(vnode.state.hover) < 0) {
      vnode.state.hover = options[0] ? options[0].value : ''
    }

    return m('span.selector', [m('input[type=text]', {
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
        vnode.state.typing = true
        vnode.state.filter = value
        vnode.state.hover = options[0] ? options[0].value : '' 
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
        vnode.state.justOpened = true
        if (!vnode.state.filter) {
          vnode.state.typing = true
        }
        e.target.select()
      },
      onblur: (e: any) => {
        vnode.state.focused = false
        vnode.state.typing = false
      },
      onkeydown: keys(onKey('Enter', (e: any) => {
        e.target.blur()
        if (options.length > 0) {
          setSelection(vnode, vnode.state.hover) 
        } else {
          vnode.state.filter = option ? option.display : '' 
        }
      }), onKey('ArrowUp', () => {
        vnode.state.hover = options[Math.max(indexByValue(options, vnode.state.hover) - 1, 0)].value
      }), onKey('ArrowDown', () => {
        vnode.state.hover = options[Math.min(indexByValue(options, vnode.state.hover) + 1, options.length - 1)].value
      }))
    }), m(Dropdown, {
      visible: vnode.state.focused,
      options: options,
      filter: (vnode.state.typing) ? vnode.state.filter : '',
      hover: vnode.state.hover,
      onselect: (option: ISelectOption) => {
        setSelection(vnode, option.value)
      },
      onhover: (option: ISelectOption) => {
        setHover(vnode, option)
      },
      justOpened: vnode.state.justOpened
    }), m('.selector-caret',  
      m('svg[viewBox=0,0,20,10]', (vnode.state.focused) ? 
        m('polygon[points=0,10 10,0 20,10, 18,10, 10,2 2,10]') :
        m('polygon[points=0,0 10,10 20,0 18,0 10,8 2,0]')))])
  },
  onupdate (vnode: m.Vnode<Attrs, State>) {
    vnode.state.justOpened = false
  }
} as m.Component<Attrs, State>
export { Select }
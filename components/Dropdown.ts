import * as m from 'mithril'
import { Option } from './Select' 

interface Attrs {
  visible: boolean,
  options: Array<Option>,
  filter: string,
  onselect: (option: Option) => void,
  onhover: (option: Option) => void,
  hover: Option 
}

function matchIndex(filter: string, str: string): [number, number] {
  const startIndex = str.toLowerCase().indexOf(filter.trim().toLowerCase())
  const endIndex = startIndex + ((startIndex < 0) ? 0 : filter.trim().length)
  return [startIndex, endIndex]
}

function displayOption(filter: string, onselect: (option: Option) => void, onhover: (option: Option) => void, hover: Option): (option: Option) => m.Lifecycle<{}, {}> {
  return function (option: Option) {
    const str = option.display
    const [startIndex, endIndex] = matchIndex(filter, str)
    return m({
      oncreate (vnode: m.VnodeDOM<{}, {}>) {
        if (hover === option) {
          vnode.dom.scrollIntoView({block: 'nearest'})
        }
      },
      view (vnode: m.Vnode<{}, {}>) {
        return m('div', {
          class: 'selector-dropdown-element' + ((hover === option) ? ' selector-dropdown-element-hover' : ''),
          onmousedown: (e: any) => {
            // Only respond to left click
            if (e.buttons === 1) {
              onselect(option)
            }
          },
          onmousemove: () => onhover(option)
        }, [
          str.substring(0, startIndex),
          m('span', {
            class: 'selector-dropdown-highlight'
          }, str.substring(startIndex, endIndex)),
          str.substring(endIndex)
        ])
      }
    })
  }
}

export default {
  view (vnode: m.Vnode<Attrs>) {
    if (!vnode.attrs.visible) { return }
    if (vnode.attrs.options.length < 1) { return }
    return m('.selector-dropdown', vnode.attrs.options
      .map(displayOption(vnode.attrs.filter, vnode.attrs.onselect, vnode.attrs.onhover, vnode.attrs.hover)))
  }
} as m.Component<Attrs>
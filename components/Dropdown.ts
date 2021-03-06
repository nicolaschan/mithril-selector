import * as m from 'mithril'
import { ISelectOption } from './Select' 

interface Attrs {
  visible: boolean,
  options: Array<ISelectOption>,
  filter: string,
  onselect: (option: ISelectOption) => void,
  onhover: (option: ISelectOption) => void,
  hover: string,
  justOpened: boolean 
}

function matchIndex(filter: string, str: string): [number, number] {
  const startIndex = str.toLowerCase().indexOf(filter.trim().toLowerCase())
  const endIndex = startIndex + ((startIndex < 0) ? 0 : filter.trim().length)
  return [startIndex, endIndex]
}

function displayISelectOption(
  filter: string, 
  onselect: (option: ISelectOption) => void, 
  onhover: (option: ISelectOption) => void, 
  hover: string,
  justOpened: boolean
  ): (option: ISelectOption) => m.Lifecycle<{}, {}> {
  return function (option: ISelectOption) {
    const str = option.display
    const [startIndex, endIndex] = matchIndex(filter, str)
    return m({
      oncreate (vnode: m.VnodeDOM<{}, {}>) {
        if (justOpened && (hover === option.value)) {
          vnode.dom.scrollIntoView({block: 'start'})
        }
      },
      view (vnode: m.Vnode<{}, {}>) {
        return m('div', {
          class: 'selector-dropdown-element' + ((hover === option.value) ? ' selector-dropdown-element-hover' : ''),
          onmousedown: (e: any) => {
            // Only respond to left click
            if (e.buttons === 1) {
              onselect(option)
            }
          },
          onmouseenter: () => onhover(option)
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
      .map(displayISelectOption(
        vnode.attrs.filter,
        vnode.attrs.onselect,
        vnode.attrs.onhover,
        vnode.attrs.hover,
        vnode.attrs.justOpened
      )))
  }
} as m.Component<Attrs>
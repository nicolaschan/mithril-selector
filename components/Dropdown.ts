import * as m from 'mithril'

interface Attrs {
  visible: boolean,
  options: Array<string>,
  filter: string,
  onselect: (value: string) => void,
  onhover: (value: string) => void,
  hover: string
}

function matchIndex(filter: string, str: string): [number, number] {
  const startIndex = str.toLowerCase().indexOf(filter.trim().toLowerCase())
  const endIndex = startIndex + ((startIndex < 0) ? 0 : filter.trim().length)
  return [startIndex, endIndex]
}

function displayOption(filter: string, onselect: (value: string) => void, onhover: (value: string) => void, hover: string): (str: string) => m.Lifecycle<{}, {}> {
  return function (str) {
    const [startIndex, endIndex] = matchIndex(filter, str)
    return m({
      oncreate (vnode: m.VnodeDOM<{}, {}>) {
        if (hover === str) {
          vnode.dom.scrollIntoView({block: 'nearest'})
        }
      },
      view (vnode: m.Vnode<{}, {}>) {
        return m('div', {
          class: 'selector-dropdown-element' + ((hover === str) ? ' selector-dropdown-element-hover' : ''),
          onmousedown: (e: any) => {
            // Only respond to left click
            if (e.buttons === 1) {
              onselect(str)
            }
          },
          onmousemove: () => onhover(str)
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
    return m('.selector-dropdown', vnode.attrs.options
      .map(displayOption(vnode.attrs.filter, vnode.attrs.onselect, vnode.attrs.onhover, vnode.attrs.hover)))
  }
} as m.Component<Attrs>
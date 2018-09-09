import * as m from 'mithril'

interface Attrs {
  visible: boolean,
  options: Array<string>,
  filter: string,
  onselect: (value: string) => void
}

function matchIndex(filter: string, str: string): [number, number] {
  const startIndex = str.toLowerCase().indexOf(filter.trim().toLowerCase())
  const endIndex = startIndex + ((startIndex < 0) ? 0 : filter.trim().length)
  return [startIndex, endIndex]
}

function displayOption(filter: string, onselect: (value: string) => void): (str: string) => m.Lifecycle<{}, {}> {
  return function (str) {
    const [startIndex, endIndex] = matchIndex(filter, str)
    return m('div', {
      style: {
        cursor: 'pointer'
      },
      onclick: () => onselect(str)
    }, [
      str.substring(0, startIndex),
      m('span', {
        style: {
          'font-weight': 600,
          'background-color': 'yellow'
        }
      }, str.substring(startIndex, endIndex)),
      str.substring(endIndex)
    ])
  }
}

export default {
  view (vnode: m.Vnode<Attrs>) {
    if (!vnode.attrs.visible) { return }
    return vnode.attrs.options
      .map(displayOption(vnode.attrs.filter, vnode.attrs.onselect))
  }
} as m.Component<Attrs>
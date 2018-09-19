import * as m from 'mithril'
import Selector from '../components/Select'

interface State {
  value: string
}

interface SelectOption {
  name: string,
  value: number
}

const Content = {
  view (vnode: m.Vnode<{}, State>) {
    return [
      m('div', `Current value: ${vnode.state.value}`),
      m('br'),
      m(Selector, {
        value: vnode.state.value,
        placeholder: 'Select',
        options: [
          { display: 'Option One', value: '1' },
          { display: 'Option Two', value: '2' },
          { display: 'Option Three', value: '3' },
          'Option Four'
        ],
        onselect: (value: string) => vnode.state.value = value
      })
    ]
  }
} as m.Component<{}, State>

m.mount(document.body, Content)
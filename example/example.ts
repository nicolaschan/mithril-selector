import * as m from 'mithril'
import Select from '../components/Select'

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
      m(Select, {
        value: vnode.state.value,
        placeholder: 'Select',
        options: [
          'Option One', 'Option Two', 'Option Three', 'Option Four', 'Option Five'
        ],
        onselect: (value: string) => vnode.state.value = value
      })
    ]
  }
} as m.Component<{}, State>

m.mount(document.body, Content)
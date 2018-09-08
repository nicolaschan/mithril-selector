import * as m from 'mithril'
import Select from '../components/Select'

interface State {
  value: string
}

const Content = {
  view (vnode: m.Vnode<{}, State>) {
    return [
      m('div', `Current value: ${vnode.state.value}`),
      m('br'),
      m(Select, {
        placeholder: 'City',
        options: ['Mountain View', 'Los Altos', 'Palo Alto'],
        onselect: (value: string) => vnode.state.value = value
      })
    ]
  }
} as m.Component<{}, State>

m.mount(document.body, Content)
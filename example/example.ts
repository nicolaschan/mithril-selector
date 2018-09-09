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
        options: ['Mountain View', 'Los Altos', 'Palo Alto', 'Sunnyvale', 'San Jose', 'San Francisco', 'Berkeley'],
        onselect: (value: string) => vnode.state.value = value
      }),
      m('br'),
      'Some text that should be covered by dropdown'
    ]
  }
} as m.Component<{}, State>

m.mount(document.body, Content)
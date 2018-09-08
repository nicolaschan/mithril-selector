import * as m from 'mithril'
import Select from '../components/Select'

const Content = {
  view (vnode: m.Vnode<{}>) {
    return m(Select, {
      placeholder: 'City',
      options: ['Mountain View', 'Los Altos', 'Palo Alto']
    })
  }
} as m.Component<{}, {}>

m.mount(document.body, Content)
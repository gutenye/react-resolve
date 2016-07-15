import {forEach, remove} from "lodash"

const ACTION_ALIAS = {
  destroy: "remove",
  create: "add",
}

export default function resolve(key, promise, actions) {
  return function(WrappedComponent) {
    return class extends Component {
      state = {
        loaded: false,
        data: {}  // {users: {id: 1}}
      }

      constructor(props) {
        super(props)
        this.actions = this.processActions(actions)
        this.resolve = this.resolve.bind(this)
      }

      render() {
        if (!this.state.loaded)
          return null
        var {state: {data}, resolve, actions} = this
        return <WrappedComponent {...data} {...actions} {...{resolve}}  />
      }

      componentDidMount() {
        this.resolve()
      }

      componentDidUpdate() {
        this.resolve()
      }

      resolve(arg) {
        var {props} = this
        arg = Object.assign({}, props, arg)
        promise(arg).then(result => {
          this.setState({data: {[key]: result}, loaded: true})
        })
      }

      remove(result) {
        var {state: {data}} = this
        remove(data[key], v => v.id === result.id)
        this.setState({data})
      }

      add(result) {
        var {state: {data}} = this
        data[key].push(result)
        this.setState({data})
      }

      update(result) {
        var {state: {data}} = this
        var index = data[key].findIndex(v => v.id === result.id)
        if (index !== -1)
          data[key].splice(index, 1, result)
        this.setState({data})
      }

      processActions(actions) {
        forEach(actions, (action, name) => {
          var type = ACTION_ALIAS[name] || name
          actions[name] = (...args) => {
            action(...args).then(result => {
              this[type](result)
            })
          }
        })
        return actions
      }
    }
  }
}

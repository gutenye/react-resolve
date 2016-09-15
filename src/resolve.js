import React from "react"
import { forEach, remove, isArray, castArray } from "lodash"

const ACTION_ALIAS = {
  destroy: "remove",
  create: "add",
}

export default function resolve(query, init, actions) {
  return function(WrappedComponent) {
    return class extends React.Component {
      state = {
        loaded: false,
        data: {},  // {users: [...]}
      }

      constructor(props) {
        super(props)
        this.actions = this.processActions(actions)
        this.resolve = this.resolve.bind(this)
      }

      render() {
        if (!this.state.loaded)
          return null
        var {props, state: {data}, resolve, actions} = this
        return <WrappedComponent {...props} {...data} {...actions} resolve={resolve}  />
      }

      componentDidMount() {
        this.resolve()
      }

      componentDidUpdate(prev) {
        if (prev.location && prev.location.pathname+prev.location.search !== this.props.location.pathname+this.props.location.search) {
          this.resolve()
        }
      }

      resolve(options) {
        options = Object.assign({}, init, this.props, options)
        var promises = Object.keys(query).map(field => query[field](options))
        var fields = Object.keys(query)
        Promise.all(promises).then(results => {
          var data = results.reduce((data, value, i) => {
            data[fields[i]] = value
            return data
          }, {})
          this.setState({data, loaded: true})
        })
      }

      remove(field, result) {
        var {state: {data}} = this
        remove(data[field], v => v.id === result.id)
        this.setState({data})
      }

      add(field, result) {
        var {state: {data}} = this
        data[field].push(result)
        this.setState({data})
      }

      update(field, result) {
        var {state: {data}} = this
        var index = data[field].findIndex(v => v.id === result.id)
        if (index !== -1)
          data[field].splice(index, 1, result)
        this.setState({data})
      }

      processActions(actions) {
        forEach(actions, (args, name) => {
          args = castArray(args)
          var action = args[0],
              type = (args[1] || ACTION_ALIAS[name] || name).toLowerCase(),
              field = args[2] || Object.keys(query)[0]
          actions[name] = (...args) => {
            action(...args).then(result => {
              this[type](field, result)
            })
          }
        })
        return actions
      }
    }
  }
}

react-resolve
======================

Inspired by [relate](https://github.com/relax/relate) and [react-resolver](https://github.com/ericclemmons/react-resolver)

Features
- Support variables
- Automatically manage the data list when do update action, e.g. add

## Usage

```
import {resolve} from "react-resolve"

@resolve("users", props => Promise.resolve([{id: 1, name: "a"}]), {
  add: (data) => Promise.resolve(data)
})
class App extends Component {
  render() {
    this.props.users
    this.props.add({id: 2, name: "b"})
    this.props.resolve({page: 2})
  }
}

this.resolve({page: 2})
```

```
// ACTIONS
//
//   add create          {data}
//   remove destroy      {id}
//   update              {data}
//
```

## Install

```
$ npm install react-resolve
```

## Ideas

```
App = resolve({
  users: (props) => Promise.resolve([
    {id: 1, name: "user 1"}
    {id: 2, name: "user 2"},
  ])
}, {
  destroy: ["REMOVE", "users", (id) => Promise.resolve({id})]  // ADD REMOVE UPDATE
})(App)

```

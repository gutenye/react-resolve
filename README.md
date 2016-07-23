react-resolve
=============

Inspired by [relate](https://github.com/relax/relate) and [react-resolver](https://github.com/ericclemmons/react-resolver)

Features
- Support variables
- Automatically manage the data list when do update action, e.g. add

## Usage

```
import {resolve} from "react-resolve"

@resolve({
  users: props => Promise.resolve([{id: 1, name: "a"}]),
}, {
  add: (data) => Promise.resolve(data),
  add: [ (data) => promise, "ADD" ],
  add: [ (data) => promise, "ADD" "users" ],
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

Advanced Example

```
@resolve({
  users: (props) => promise,
  posts: () => promise,
}, {
  deleteUser: [ (data) => promise, "REMOVE", "users" ]  // ADD REMOVE UPDATE
  deletPost: [ (data) => promise, "REMOVE", "posts" ]
})
class App extends Component { }
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
```

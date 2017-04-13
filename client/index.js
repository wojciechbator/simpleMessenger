import React, { Component } from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom'

import createStore from './redux/store';
import Home from './components/layout/Home'

class App extends Component {
    render() {
        return (
            <Home />
        )
    }
}

if (typeof window !== 'undefined') {
  const store = createStore(window.__INITIAL_STATE__);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
	)
}
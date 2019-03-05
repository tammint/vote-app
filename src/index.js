import React from 'react'
import ReactDOM from 'react-dom'
import voteReducer from './reducer'
import { createStore } from 'redux';

const store = createStore(voteReducer)

const Statistics = () => {
  const votes = store.getState()

  if (votes.total === 0) {
    return (
      <div>
        <h2>Stats</h2>
        <div>no votes</div>
      </div>
    )
  }

  const positiveVotes = (votes.good + votes.ok) / votes.total * 100

  return (
    <div>
      <h2>Stats</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{votes.good}</td>
          </tr>
          <tr>
            <td>okay</td>
            <td>{votes.ok}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{votes.bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td></td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positiveVotes}%</td>
          </tr>
        </tbody>
      </table>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>zero counter</button>
    </div >
  )
}

class App extends React.Component {
  klik = (button) => () => {
    store.dispatch({ type: button })
  }

  render() {
    return (
      <div>
        <h2>Cast your vote</h2>
        <button onClick={this.klik('GOOD')}>good</button>
        <button onClick={this.klik('OK')}>okay</button>
        <button onClick={this.klik('BAD')}>bad</button>
        <Statistics />
        
      </div>
    )
  }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)
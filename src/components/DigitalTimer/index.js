// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerSec: 0,
    timerMin: 25,
    timerLimit: 25,
    status: false,
    disableLimits: false,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(
      () => {
        const {timerMin, timerSec} = this.state
        this.setState({disableLimits: true})
        const totalSeconds = timerMin * 60
        if (timerMin === 0 && timerSec === 0) {
          this.setState({status: false})
          clearInterval(this.timerId)
        } else if (totalSeconds % 60 === 0 && timerSec === 0 && timerMin > 0) {
          this.setState(prevState => ({
            timerMin: prevState.timerMin - 1,
            timerSec: 59,
            status: true,
          }))
        } else {
          this.setState(prevState => ({
            timerSec: prevState.timerSec - 1,
            status: true,
          }))
        }
      },

      1000,
    )
  }

  stopTimer = () => {
    clearInterval(this.timerId)
    this.setState({status: false})
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      timerLimit: 25,
      timerMin: 25,
      timerSec: 0,
      disableLimits: false,
    })
  }

  increaseLimit = () => {
    const {disableLimits} = this.state
    if (disableLimits !== true) {
      this.setState(prevState => ({
        timerMin: prevState.timerLimit + 1,
        timerLimit: prevState.timerLimit + 1,
      }))
    }
  }

  decreaseLimit = () => {
    const {disableLimits} = this.state
    if (disableLimits !== true) {
      this.setState(prevState => ({
        timerMin: prevState.timerLimit - 1,
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  render() {
    const {timerSec, status, timerLimit, timerMin} = this.state
    return (
      <div className="bg">
        <h1 className="btn">Digital Timer</h1>
        <div className="timer-bg">
          <div>
            <h1 testId="timer">{`${timerMin}:${
              timerSec < 9 ? `0${timerSec}` : timerSec
            }`}</h1>
            <p className="btn">{status ? 'Running' : 'Paused'}</p>
          </div>
          <div>
            <div className="row">
              {status ? (
                <div>
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                    alt="pause icon"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={this.stopTimer}
                  >
                    Pause
                  </button>
                </div>
              ) : (
                <div>
                  <img
                    className="logo"
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png "
                    alt="play icon"
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={this.startTimer}
                  >
                    Start
                  </button>
                </div>
              )}
            </div>
            <div className="row">
              <div>
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                />
                <button type="button" className="btn" onClick={this.resetTimer}>
                  Reset
                </button>
              </div>
            </div>
            <div>
              <p>Set Timer Limit</p>
              <div>
                <button onClick={this.increaseLimit} type="button">
                  +
                </button>
                <p>{timerLimit}</p>
                <button onClick={this.decreaseLimit} type="button">
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

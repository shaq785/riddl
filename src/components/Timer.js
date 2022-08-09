import React, { Component } from "react";
import dateFormat from 'dateformat';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  

  
  
  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }
  getTimeUntil() {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var nextDay = year + "-" + month + "-" + day
    var nextDayFormat = dateFormat(nextDay, "mmmm, dd, yyyy");

    const time = Date.parse(nextDayFormat) - Date.parse(new Date());
    

    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }
  
  render() {
    return (
      <div >
          {this.leading0(this.state.hours)} : {this.leading0(this.state.minutes)} : {this.leading0(this.state.seconds)} 
      </div>
    );
  }
}
export default Timer;

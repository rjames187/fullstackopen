import { useState } from 'react'

const Button = ({name, handler}) => {
  return (
    <button onClick={handler}>{name}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${(good / all) * 100} %`

  if (good === 0 && neutral === 0 && bad === 0){
    return (
    <>
      <h1>Statistics</h1>
      <div>No Feedback Given</div>
    </>
    )
  } else {
    return (
        <table>
          <caption><h1>Statistics</h1></caption>
          <StatisticLine text={"Good"} value={good}></StatisticLine>
          <StatisticLine text={"Neutral"} value={neutral}></StatisticLine>
          <StatisticLine text={"Bad"} value={bad}></StatisticLine>
          <StatisticLine text={"All"} value={all}></StatisticLine>
          <StatisticLine text={"Average"} value={average}></StatisticLine>
          <StatisticLine text={"Positive"} value={positive}></StatisticLine>
        </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonHandler = (buttonName) => () => {
  
      switch (buttonName) {
        case "good":
          setGood(good + 1)
          break;
        case "neutral":
          setNeutral(neutral + 1)
          break;
        case "bad":
          setBad(bad + 1)
          break;
        default:
          console.log("unknown button name")
      }
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button name={"good"} handler={buttonHandler("good")}></Button>
      <Button name={"neutral"} handler={buttonHandler("neutral")}></Button>
      <Button name={"bad"} handler={buttonHandler("bad")}></Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
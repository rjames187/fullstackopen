import { useState } from 'react'

const Button = ({name, handler}) => {
  return (
    <button onClick={handler}>{name}</button>
  )
}

const Display = ({good, neutral, bad}) => {

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${(good / all) * 100} %`

  return (
    <>
      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>All: {all}</div>
      <div>Average: {average}</div>
      <div>Positive: {positive}</div>
    </>
  )
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
      <h1>Statistics</h1>
      <Display good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
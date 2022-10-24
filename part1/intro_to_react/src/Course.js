const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map( (part, i) => 
          <Part key={i} part={part}/>
        )}
      </>
    )
  };
  
  const Total = (props) => {
    return (
      <p>Number of exercises {props.total}</p>
    )
  };
  
  const Course =({course}) => {
  
    const total = course.parts.reduce((prev, cur) => prev + cur.exercises, 0);
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total total={total} />
      </div>
    )
  }

  export default Course;
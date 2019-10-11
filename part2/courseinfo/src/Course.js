import React from "react"

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => course.parts.map(part => <Part key={part.id} part={part} />)

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ course }) => {
	const total = course.parts.reduce((count, part) => count + part.exercises, 0)

	return (
		<p>
			<strong>total of {total} exercises</strong>
		</p>
	)
}

const Course = ({ course }) => (
	<>
		<Header course={course} />
		<Content course={course} />
		<Total course={course} />
	</>
)

export default Course

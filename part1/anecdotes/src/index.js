import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
    const [top, setTop] = useState(selected)
    
    const handleSelected = () => setSelected(Math.floor(Math.random()*anecdotes.length))
    
    const handleVotes = () => {
        const temporary_copy = [...votes]
        temporary_copy[selected]++
        setVotes(temporary_copy)
        handleTop(temporary_copy)
    }

    const handleTop = (votes) => setTop(votes.indexOf(Math.max.apply(Math, votes)))

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}<br />
            has {votes[selected]} votes<br />
            <Button onClick={handleVotes} text="vote" />
            <Button onClick={handleSelected} text="next anecdote" />

            <h1>Anecdote with most votes</h1>
            {anecdotes[top]}<br />
            has {votes[top]} votes<br />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))

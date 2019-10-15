import React, { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ capital }) => {
    const [temperature, setTemperature] = useState(0)
    const [wind, setWind] = useState(0)
    const [icon, setIcon] = useState("")
    const [direction, setDirection] = useState("")

    useEffect(() => {
        axios
            .get("http://api.weatherstack.com/current?access_key=***API_KEY***&query=" + capital)
            .then(response => {
                setTemperature(response.data.current.temperature)
                setWind(response.data.current.wind_speed)
                setIcon(response.data.current.weather_icons[0])
                setDirection(response.data.current.wind_dir)
            })
    }, [capital])

    if (temperature) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <div><b>temperature:</b> {temperature} Celsius</div>
                <img src={icon} alt={capital} height="50"/>
                <div><b>wind:</b> {wind} kph direction {direction}</div>
            </div>
        )
    } else {
        return null
    }
}

export default Weather
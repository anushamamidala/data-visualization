import axios from 'axios';
import get from 'lodash/get'

const END_POINT = "https://salty-beach-78334.herokuapp.com/"

let config = {
    headers: { "Access-Control-Allow-Origin": "*" }
}

export const getHourlyData = async () => {
    const result = await axios.get(`${END_POINT}events/hourly`, config);
    return get(result, "data", [])
}

export const getDailyData = async () => {
    const result = await axios.get(`${END_POINT}events/daily`, config);
    return get(result, "data", [])
}

export const getPoints = async () => {
    const result = await axios.get(`${END_POINT}poi`, config);
    return get(result, "data", [])
}
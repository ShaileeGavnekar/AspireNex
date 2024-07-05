// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import axios from 'axios'

// export function attempts_Number(result){
//     return result.filter(r => r !== undefined).length;
// }

// export function earnPoints_Number(result, answers, point){
//     return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
// }

// export function flagResult(totalPoints, earnPoints){
//     return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
// }

// /** check user auth  */
// export function CheckUserExist({ children }){
//     const auth = useSelector(state => state.result.userId)
//     return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
// }

// /** get server data */
// export async function getServerData(url, callback){
//     const data = await (await axios.get(url))?.data;
//     return callback ? callback(data) : data;
// }


// /** post server data */
// export async function postServerData(url, result, callback){
//     const data = await (await axios.post(url, result))?.data;
//     return callback ? callback(data) : data;
// }

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * Calculate the number of attempts made by the user.
 * @param {Array} result - Array of user answers.
 * @returns {number} - Number of attempts.
 */
export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length;
}

/**
 * Calculate the total earned points.
 * @param {Array} result - Array of user answers.
 * @param {Array} answers - Array of correct answers.
 * @param {number} point - Points per correct answer.
 * @returns {number} - Total earned points.
 */
export function earnPoints_Number(result, answers, point) {
    return result
        .map((element, i) => answers[i] === element)
        .filter(i => i)
        .map(i => point)
        .reduce((prev, curr) => prev + curr, 0);
}

/**
 * Determine if the user has passed based on earned points.
 * @param {number} totalPoints - Total points possible.
 * @param {number} earnPoints - Points earned by the user.
 * @returns {boolean} - True if the user passed, otherwise false.
 */
export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 50 / 100) < earnPoints; // Earn 50% marks to pass
}

/**
 * Higher-order component to check if the user is authenticated.
 * @param {object} children - React children components.
 * @returns {JSX.Element} - Children components or redirect to home.
 */
export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userId);
    return auth ? children : <Navigate to={'/'} replace={true} />;
}

/**
 * Fetch data from the server.
 * @param {string} endpoint - The server endpoint.
 * @param {function} [callback] - Optional callback function to handle the data.
 * @returns {Promise<*>} - Data from the server.
 */
export async function getServerData(endpoint, callback) {
    const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    try {
        const response = await axios.get(url);
        return callback ? callback(response.data) : response.data;
    } catch (error) {
        console.error("Error fetching data from server:", error);
        throw error;
    }
}

/**
 * Post data to the server.
 * @param {string} endpoint - The server endpoint.
 * @param {object} result - Data to post.
 * @param {function} [callback] - Optional callback function to handle the response.
 * @returns {Promise<*>} - Response data from the server.
 */
export async function postServerData(endpoint, result, callback) {
    const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    try {
        const response = await axios.post(url, result);
        return callback ? callback(response.data) : response.data;
    } catch (error) {
        console.error("Error posting data to server:", error);
        throw error;
    }
}

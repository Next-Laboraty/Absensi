import {START_TIMER, RESTART_TIMER, ADD_SECOND } from './types'

function start_timer(){
    return{
        type: START_TIMER
    }
}
function restart_timer(){
    return{
        type: RESTART_TIMER
    }
}
function add_second(){
    return{
        type: ADD_SECOND
    }
}

const actionCreator ={
    start_timer,
    restart_timer,
    add_second
}
export {actionCreator}
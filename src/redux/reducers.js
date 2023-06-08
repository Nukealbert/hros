import {createReducer} from "@reduxjs/toolkit";

export const rootReducer=createReducer({
    repo:[]
},{
    repoDetail:(state,action)=>{
        state.repo=action.payload;
        console.log(state.repo)
    }
})
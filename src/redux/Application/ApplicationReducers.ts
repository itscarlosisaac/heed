import { PayloadAction } from '@reduxjs/toolkit'
// import { IApplicationState } from './ApplicationInitialState'
import {IUnit} from "../../shared/types";


// TODO: Fix the typings of the state for IApplication reducers
function SetActiveUnit(state: any, action: PayloadAction<IUnit>) {
  state.activeUnit = action.payload
  return state;
}

function OpenUnit(state: any, action: PayloadAction<IUnit>) {
  state.openUnits = [...state.openUnits, action.payload]
  state.activeUnit = action.payload
}

function CloseUnit(state: any, action: PayloadAction<string>) {
  state.openUnits = state.openUnits.filter((unit:IUnit) => unit.id !== action.payload);
  return state;
}

export { OpenUnit, SetActiveUnit, CloseUnit }

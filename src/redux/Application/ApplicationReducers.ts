import { PayloadAction } from '@reduxjs/toolkit'
// import { IApplicationState } from './ApplicationInitialState'
import {IUnit} from "../../shared/types";


// TODO: Fix the typings of the state for IApplication reducers
function SetActiveUnit(state: any, action: PayloadAction<IUnit>) {
  state.editor.activeUnit = action.payload
  return state;
}

function OpenUnit(state: any, action: PayloadAction<IUnit>) {
  state.editor.openUnits = [...state.editor.openUnits, action.payload]
  state.editor.activeUnit = action.payload
}

function CloseUnit(state: any, action: PayloadAction<string>) {
  state.editor.openUnits = state.editor.openUnits.filter((unit:IUnit) => unit.id !== action.payload);
  return state;
}

export { OpenUnit, SetActiveUnit, CloseUnit }

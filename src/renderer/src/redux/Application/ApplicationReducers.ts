import { PayloadAction } from '@reduxjs/toolkit'
import { IUnit } from '../../../../shared/types'
import { IApplicationState } from './ApplicationInitialState'

function SetActiveUnit(state: IApplicationState, action: PayloadAction<IUnit>): IUnit {
  return (state.editor.activeUnit = action.payload)
}

function OpenUnit(state: IApplicationState, action: PayloadAction<IUnit>): number {
  return state.editor.openUnits.push(action.payload)
}

function CloseUnit(state: IApplicationState, action: PayloadAction<string>): IUnit[] {
  return state.editor.openUnits.filter((unit) => unit.id !== action.payload)
}

export default {
  OpenUnit,
  CloseUnit,
  SetActiveUnit
}

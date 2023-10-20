import { IUnit } from '../../../../shared/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { IApplicationState } from './ApplicationInitialState'

function SetActiveUnit(state: IApplicationState, action: PayloadAction<IUnit>): void {
  state.editor.activeUnit = action.payload
}

function OpenUnit(state: IApplicationState, action: PayloadAction<IUnit>): void {
  state.editor.openUnits.push(action.payload)
}

function CloseUnit(state: IApplicationState, action: PayloadAction<string>): void {
  state.editor.openUnits.filter((unit) => unit.id !== action.payload)
}

export { OpenUnit, CloseUnit, SetActiveUnit }

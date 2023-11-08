import { IUnit } from '../../../../shared/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { IApplicationState } from './ApplicationInitialState'

function SetActiveUnit(state: IApplicationState, action: PayloadAction<IUnit>): void {
  state.editor.activeUnit = action.payload
}

function OpenUnit(state: IApplicationState, action: PayloadAction<IUnit>): void {
  state.editor.openUnits.push(action.payload)
  state.editor.activeUnit = action.payload
}

function CloseUnit(state: IApplicationState, action: PayloadAction<string>): void {
  state.editor.openUnits.filter((unit) => unit.id !== action.payload)
}

function UpdateBody(state: IApplicationState, action: PayloadAction<string>): void {
  const parser = new DOMParser()
  const content = state.editor.activeUnit.content
  const container = document.createElement('div');
  container.innerHTML = action.payload
  console.log("PAYLOAD: ", action.payload)
  const parsedDoc = parser.parseFromString(content, 'text/html')
  parsedDoc.querySelector('body heed-unit').appendChild(container.firstChild)
  console.log('Parsed Doc', parsedDoc, container.firstChild)
  state.editor.activeUnit.content = parsedDoc
}

export { OpenUnit, CloseUnit, SetActiveUnit, UpdateBody }

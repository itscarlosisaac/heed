import {IUnit} from "../../shared/types";

export interface IApplicationState {
  openUnits: IUnit[]
  activeUnit: IUnit | null
}

export const ApplicationInitialState: IApplicationState = {
  openUnits: [],
  activeUnit: null
}

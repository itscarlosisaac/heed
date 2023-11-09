import {IUnit} from "../../shared/types";

export interface IApplicationState {
  editor: {
    openUnits: IUnit[]
    activeUnit: IUnit | null
  }
}

export const ApplicationInitialState: IApplicationState = {
  editor: {
    openUnits: [],
    activeUnit: null
  }
}

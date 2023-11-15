import PanelContainer from '../PanelContainer/PanelContainer'
import LayersContainer from './LayersContainer'
import LayerItem from './LayerItem'
import { observer } from "mobx-react"
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";

const Layers = observer((): JSX.Element => {
  return (
    <>
      <PanelContainer title={'Layers'}>
        <LayersContainer>
          {
              heedElementManager.elements.map((element: any) => <LayerItem key={element.id}>
                  {element.id}
              </LayerItem> )
          }
        </LayersContainer>
      </PanelContainer>
    </>
  )
});

export default Layers

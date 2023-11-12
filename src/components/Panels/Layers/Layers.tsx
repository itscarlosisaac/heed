import PanelContainer from '../PanelContainer/PanelContainer'
import LayersContainer from './LayersContainer'
import LayerItem from './LayerItem'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";

function Layers(): JSX.Element {
  const heedElements = useSelector<ApplicationRootState>(s => s.editor.elements) as HTMLElement[];
  return (
    <>
      <PanelContainer title={'Layers'}>
        <LayersContainer>
          {
            heedElements.map((element: HTMLElement) => {
              return <LayerItem key={element.id}>{element.id}</LayerItem>
            })
          }
        </LayersContainer>
      </PanelContainer>
    </>
  )
}

export default Layers

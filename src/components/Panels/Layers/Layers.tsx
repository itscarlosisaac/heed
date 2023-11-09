import PanelContainer from '../PanelContainer/PanelContainer'
import LayersContainer from './LayersContainer'
import LayerItem from './LayerItem'

function Layers(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Layers'}>
        <LayersContainer>
          <LayerItem />
          <LayerItem />
          <LayerItem />
          <LayerItem />
        </LayersContainer>
      </PanelContainer>
    </>
  )
}

export default Layers

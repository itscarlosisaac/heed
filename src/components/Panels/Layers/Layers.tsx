import PanelContainer from '../PanelContainer/PanelContainer'
import LayersContainer from './LayersContainer'
import LayerItem from './LayerItem'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";
import {useEffect, useState} from "react";
import {layer_behavioral_subject} from "../../../system/Core/HeedIo/LayerObservable.ts";

function Layers(): JSX.Element {
  const heedElements = useSelector<ApplicationRootState>(s => s.editor.elements) as HTMLElement[];

  const [ elements, setElements] = useState([])

  useEffect(() => {
      layer_behavioral_subject.subscribe({
          next: (v) => {
              if( v ){
                  console.log(`Layer observable: ${v}`)
                  setElements(Array.from(v))
              }
              return v
          }
      });
  }, [])

  return (
    <>
      <PanelContainer title={'Layers'}>
        <LayersContainer>
          {
              elements.map((element: HTMLElement) => {
              return <LayerItem key={element.id}>{element.id}</LayerItem>
            })
          }
        </LayersContainer>
      </PanelContainer>
    </>
  )
}

export default Layers

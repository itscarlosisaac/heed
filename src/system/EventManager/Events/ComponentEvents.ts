import ComponentInstantiator from '../../ComponentInstantiator/ComponentInstantiator'
import Transformable from '../../Transformables/Transformable'
import ComponentEventManager from './ComponentEventManager'

/**
 * Creates a new component in the unit with its default properties.
 * @tagName {string} The tag of the element to be created
 */
ComponentEventManager.on('create', (tagName) => {
  const unit = document.querySelector('#unit') as HTMLElement
  if (!unit) return
  ComponentInstantiator.setContainer(unit)
  const element = ComponentInstantiator.createAndAppendElement(tagName, {
    style: `width:50px; height:50px;`
  })
  new Transformable(element)
})

/**
 * Deletes a component from the unit
 * @id {string} The id of the component to be deleted
 */
ComponentEventManager.on('delete', (id) => {
  const unit = document.querySelector('#unit') as HTMLElement
  if (!unit) return
  const componentToRemove = unit.querySelector(`#${id}`)
  if (componentToRemove) {
    componentToRemove.remove()
  }
})
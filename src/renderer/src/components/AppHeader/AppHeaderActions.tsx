import { JSX, useEffect } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import FileService from '../../services/FileService'
import { DesignConverter } from '../../../../system/DesignConverter/DesignConverter'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationRootState } from '../../redux/store/store'
import { IpcChannel, IUnit } from '../../../../shared/types'
import Unit from '../../../../system/Unit'
import Transformable from '../../../../system/Transformables/Transformable'
import TemplateParser from '../../../../system/TemplateParser'
import { ApplicationActions } from '../../redux/Application/ApplicationSlice'

export function AppHeaderActions(): JSX.Element {
  const dispatch = useDispatch()
  const activeUnit = useSelector<ApplicationRootState>(
    (s) => s.application.editor.activeUnit
  ) as IUnit

  function SaveFile(): void {
    console.log('will save file.', activeUnit.filename)
    const parsedInitialContent = new DOMParser().parseFromString(activeUnit.content, 'text/html')
    const adContent = document.querySelector('#unit').innerHTML
    parsedInitialContent.querySelector('heed-unit').innerHTML = adContent
    const data = parsedInitialContent.querySelector('body').innerHTML

    const result = DesignConverter.convertToHeedFormat(data)
    const HTML = DesignConverter.convertToHTMLFormat(result)
    console.log('Heed Format:', result)
    console.log('HTML:', HTML)
    FileService.SaveFile({ activeUnit, data: HTML })
  }

  function OpenFile(): void {
    FileService.OpenFile()
  }

  function onOpenFile(_e: unknown, data: unknown): void {
    const unit = new Unit(data.filename, data.id, data.content, data.extension, data.filepath)
    const Domparser = new DOMParser()
    const parsedDoc = Domparser.parseFromString(data.content, 'text/html')

    console.log('DA', parsedDoc)
    const heedUnit = parsedDoc.querySelector('heed-unit')
    console.log('heedUnit', heedUnit)

    const unitElement = document.querySelector('#unit')
    // const heedUnitContent = heedUnit.innerHTML
    console.log('HTML = ', heedUnit.children)

    // Loop through the children of the original div and append copies to the new div
    Array.from(heedUnit.children).forEach((child) => {
      const copy = child.cloneNode(false)
      console.log("Element: ", copy)
      unitElement.appendChild(copy)
      new Transformable(copy)
    })

    const parser = new TemplateParser()
    parser.parse(unit.content).then((parsedData) => {
      unit.setScripts(parsedData.scripts)
      unit.setStyles(parsedData.styles)
      unit.setMetatags(parsedData.meta)
      dispatch(ApplicationActions.OpenUnit(unit.get()))
    })
  }

  useEffect(() => {
    const listener = window.electron.ipcRenderer.on(IpcChannel.openFile, onOpenFile)
    return () => listener()
  }, [])

  return (
    <>
      <Flex gap={3} alignItems={'center'}>
        <Button size={'xs'} onClick={OpenFile}>
          Open File
        </Button>
        <Button size={'xs'}>Publish</Button>
        <Button size={'xs'}>Preview</Button>
        <Button size={'xs'} onClick={SaveFile}>
          Save
        </Button>
      </Flex>
    </>
  )
}

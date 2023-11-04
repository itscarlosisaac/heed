import { JSX } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import FileService from '../../services/FileService'
import { DesignConverter } from '../../../../system/DesignConverter/DesignConverter'
import { useSelector } from 'react-redux'
import { ApplicationRootState } from '../../redux/store/store'

export function AppHeaderActions(): JSX.Element {
  const openUnit = useSelector<ApplicationRootState>((s) => s.application.editor.openUnits[0])

  function SaveFile(): void {
    console.log('will save file.', openUnit)
    const parsedInitialContent = new DOMParser().parseFromString(openUnit.content, "text/html")
    console.log(parsedInitialContent)
    const adContent = document.querySelector('#unit').parentElement.innerHTML
    parsedInitialContent.querySelector('heed-unit').innerHTML = adContent
    const data = parsedInitialContent.querySelector('body').outerHTML;
    console.log('DATA::', data)

    const result = DesignConverter.convertToHeedFormat(data)
    console.log('result:', result)
    console.log("----------------------")
    const HTML = DesignConverter.convertToHTMLFormat(result)
    console.log('HTML:', HTML)
    FileService.SaveFile()
  }

  return (
    <>
      <Flex gap={3} alignItems={'center'}>
        <Button size={'xs'}>Publish</Button>
        <Button size={'xs'}>Preview</Button>
        <Button size={'xs'} onClick={SaveFile}>
          Save
        </Button>
      </Flex>
    </>
  )
}

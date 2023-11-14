import {Button} from "@chakra-ui/react";
import HeedIo from "../../../system/Core/HeedIo/HeedIo.ts";
import HeedParser from "../../../system/Core/HeedParser/HeedParser.ts";
import {useDispatch} from "react-redux";
import {ApplicationActions} from "../../../redux/Application/ApplicationSlice.ts";

function OpenFileModal() {
    const dispatch = useDispatch();

    async function handle_open_file() {
        let unit = await HeedIo.open_file()
        if (!unit) return;

        unit = await HeedParser.ParseUnitData(unit);
        dispatch(ApplicationActions.OpenUnit(unit.get()))

        // const elements = HeedParser.GetElements()
        // dispatch(EditorActions.AddElement(elements))
        //
        // // TODO, Refactor this following part adding the event listener to the element on select.
        // elements.map(element => {
        //     const htmlElement = document.getElementById(element.id)
        //     if( !htmlElement ) throw new AppError(AppErrorCode.ElementNotFound);
        //
        //     htmlElement.addEventListener('click', (_e: MouseEvent) => {
        //         dispatch(EditorActions.SelectElement(HeedParser.ExtractStyles(htmlElement)))
        //     });
        // })
    }

    return (
        <Button size={'xs'} onClick={handle_open_file}>
            Open File
        </Button>
    );
}

export default OpenFileModal
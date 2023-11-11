import {Button} from "@chakra-ui/react";
import HeedIo from "../../../system/Core/HeedIo/HeedIo.ts";
import HeedParser from "../../../system/Core/HeedParser/HeedParser.ts";
import {useDispatch} from "react-redux";
import {ApplicationActions} from "../../../redux/Application/ApplicationSlice.ts";

function OpenFileModal() {
    const dispatch = useDispatch();
    async function open_file(){
        let unit = await HeedIo.open_file()

        if( !unit ) return;
        unit = await HeedParser.ParseUnitData(unit);
        dispatch(ApplicationActions.OpenUnit(unit.get()))
    }

    return (
        <Button size={'xs'} onClick={open_file}>
            Open File
        </Button>
    );
}

export default OpenFileModal
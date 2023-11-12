import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";
import {IUnit} from "../../../shared/types";
import {Button} from "@chakra-ui/react";
import heedIo from "../../../system/Core/HeedIo/HeedIo.ts";

function SaveFileButton() {
    const activeUnit = useSelector<ApplicationRootState>(
        (s) => s.application.activeUnit
    ) as IUnit

    async function save_file(){
        try {
            await heedIo.save_file(activeUnit);
        }catch (e) {
            console.log("Unable to save file", e)
        }
    }
    return (
        <>
            <Button size={'xs'} onClick={save_file}>
                Save File
            </Button>
        </>
    );
}

export default SaveFileButton
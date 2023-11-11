import {Button} from "@chakra-ui/react";
import heedIo from "../../../system/Core/HeedIo/HeedIo.ts";

function CreateFileButton() {

    async function handle_create_file(){
        try {
            await heedIo.create_file();
        }catch (e) {
            console.log("Unable to create new file", e);
        }
    }

    return (
        <>
            <Button onClick={handle_create_file}>
                Create New Ad
            </Button>
        </>
    );
}

export default CreateFileButton;
import { createUI, useInputs } from "@granity/engine";
import {
    Button,
    ButtonProps,
    Dialog,
    DialogContent,
    DialogContentProps,
    DialogTitle,
    TextField,
} from "@granity/ui";
import { FC, useState } from "react";

import useGameManager from "../GameManager/_actions/hooks/useGameManager";
import videosLinksUIReducer from "./_actions/_data/state/videosLinksUIReducer";

type Inputs = {
    id: number;
    label: string;
    value: string;
};

type VideosLinksUIStyles = {
    dialogContent?: DialogContentProps;
    addRowButton?: ButtonProps;
};

const styles: VideosLinksUIStyles = {
    dialogContent: {
        sx: {
            display: "flex",
            flexDirection: "column",
        },
    },
    addRowButton: {
        fullWidth: false,
    },
};

const VideosLinksUI: FC = () => {
    const { updatePointerLockEnable } = useGameManager();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fields, setFields] = useState<Inputs[]>([
        {
            id: 0,
            label: "Add your video here",
            value: "",
        },
    ]);

    useInputs((inputs) => {
        console.log(inputs.openVideoLinksDialog, "inputs.openVideoLinksDialog");

        if (inputs.openVideoLinksDialog) {
            setIsDialogOpen(!isDialogOpen);
            updatePointerLockEnable(isDialogOpen);
        }
    }, []);

    const addRow = () => {
        setFields((prev) => {
            return [
                ...prev,
                {
                    id: prev.length - 1,

                    label: "Add your video here",
                    value: "",
                },
            ];
        });
    };

    return (
        <Dialog open={isDialogOpen}>
            <DialogTitle>Title</DialogTitle>
            <DialogContent {...styles.dialogContent}>
                {fields.map((x) => (
                    <TextField
                        key={x.id}
                        label="Add your video link here"
                        value="test"
                        // onChange={onChange}
                    />
                ))}
                <Button onClick={addRow} {...styles.addRowButton}>
                    Add a row
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export const widget = createUI({
    component: VideosLinksUI,
    reducer: videosLinksUIReducer,
    name: "VideosLinksUI",
});

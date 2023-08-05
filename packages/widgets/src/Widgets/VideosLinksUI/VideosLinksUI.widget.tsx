import { createUI, useInputs } from "@granity/engine";
import DeleteIcon from "@granity/icons/Delete";
import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogTitle,
    DialogTitleProps,
    IconButton,
    IconButtonProps,
    TextField,
    TextFieldProps,
} from "@granity/ui";
import { ChangeEvent, FC, useEffect, useState } from "react";

import useGameManager from "../GameManager/_actions/hooks/useGameManager";
import videosLinksUIReducer from "./_actions/_data/state/videosLinksUIReducer";

type Inputs = {
    id: number;
    value: string;
};

type VideosLinksUIStyles = {
    dialogContent?: DialogContentProps;
    dialogTitle?: DialogTitleProps;
    dialogActions?: DialogActionsProps;
    rowWrapper?: BoxProps;
    textField?: TextFieldProps;
    addRowButton?: ButtonProps;
    deleteButton?: IconButtonProps;
};

const styles: VideosLinksUIStyles = {
    dialogTitle: {
        sx: {
            padding: "16px",
            backgroundColor: "#fff",
            color: "#0f0f0f",
            fontSize: "22px",
        },
    },
    dialogContent: {
        sx: {
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            color: "#0f0f0f",
        },
    },
    dialogActions: {
        sx: {
            backgroundColor: "#fff",
            color: "#0f0f0f",
        },
    },
    rowWrapper: {
        sx: {
            display: "flex",
            alignItems: "flex-end",
        },
    },
    textField: {
        sx: {
            marginBottom: "10px",
            ".MuiFormLabel-root": {
                color: "#0f0f0f",
            },
            ".MuiInputBase-input": {
                color: "#0f0f0f",
                backgroundColor: "#dfdfdf",
                borderColor: "transparent",
            },
            "&:hover": {
                ".MuiInputBase-input": {
                    backgroundColor: "#c0c0c0 !important",
                },
            },
        },
    },
    addRowButton: {
        fullWidth: false,
        variant: "outlined",
        sx: {
            marginTop: "24px",
            backgroundColor: "#ff0000",
            "&:hover": {
                backgroundColor: "#ff0000",
            },
        },
    },
    deleteButton: {
        sx: {
            marginBottom: "10px",
        },
    },
};

const VideosLinksUI: FC = () => {
    const { updatePointerLockEnable } = useGameManager();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fields, setFields] = useState<Inputs[]>([
        {
            id: 0,
            value: "",
        },
    ]);

    useInputs((inputs) => {
        if (inputs.openVideoLinksDialog) {
            setIsDialogOpen(!isDialogOpen);
        }
    }, []);

    useEffect(() => {
        updatePointerLockEnable(!isDialogOpen);
    }, [isDialogOpen, updatePointerLockEnable]);

    const updateRow = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const value = event.target.value;

        setFields((prev) => {
            prev[index] = {
                ...prev[index],
                value,
            };

            return prev;
        });
    };

    const addRow = () => {
        setFields((prev) => {
            return [
                ...prev,
                {
                    id: prev.length,

                    label: "Add your video here",
                    value: "",
                },
            ];
        });
    };

    const deleteRow = (id: number) => {
        setFields((prev) => {
            const newFields = prev.filter((x) => x.id !== id);
            return newFields;
        });
    };

    const confirm = () => {
        // updateVideosLinks(fields.map((x) => x.value));
        setIsDialogOpen(false);
    };

    const cancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen}>
            <DialogTitle {...styles.dialogTitle}>Add your videos</DialogTitle>
            <DialogContent {...styles.dialogContent}>
                {fields.map((x, index) => (
                    <Box key={x.id} {...styles.rowWrapper}>
                        <TextField
                            label="Add your video link here"
                            value={x.value}
                            onChange={(event) => updateRow(event, index)}
                            {...styles.textField}
                        />
                        <IconButton onClick={() => deleteRow(x.id)} {...styles.deleteButton}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Box>
                ))}
                <Button onClick={addRow} {...styles.addRowButton}>
                    Add a row
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirm}>Confirm</Button>
                <Button onClick={cancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export const widget = createUI({
    component: VideosLinksUI,
    reducer: videosLinksUIReducer,
    name: "VideosLinksUI",
});

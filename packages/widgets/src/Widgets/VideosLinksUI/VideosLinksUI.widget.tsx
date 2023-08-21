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
    filledButton?: ButtonProps;
    outlinedButton?: ButtonProps;
    textButton?: ButtonProps;
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
            paddingTop: "16px !important",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#fff",
            color: "#0f0f0f",
        },
    },
    dialogActions: {
        sx: {
            backgroundColor: "#fff",
            color: "#0f0f0f",
            paddingTop: "16px !important",
            padding: "16px",
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
    filledButton: {
        fullWidth: false,
        sx: {
            color: "#fff",
            backgroundColor: "#ff0000",
            "&:hover": {
                backgroundColor: "#ff3c3c",
                color: "#fff",
            },
        },
    },
    outlinedButton: {
        fullWidth: false,
        variant: "outlined",
        sx: {
            color: "#0f0f0f",
            borderColor: "#0f0f0f",
            "&:hover": {
                backgroundColor: "#dfdfdf",
                color: "#525252",
                borderColor: "#525252",
            },
        },
    },
    textButton: {
        variant: "text",
        sx: {
            color: "#0f0f0f",
            "&:hover": {
                backgroundColor: "#ffebeb",
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
    const { updatePointerLockEnable, updateVideosLinks, videosLinks } = useGameManager();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [fields, setFields] = useState<Inputs[]>(
        videosLinks?.map((x, index) => ({
            id: index,
            value: x,
        })) || [
            {
                id: 0,
                value: "",
            },
        ]
    );

    useInputs((inputs) => {
        if (inputs.openVideoLinksDialog) {
            setIsDialogOpen(true);
        }
    }, []);

    useEffect(() => {
        updatePointerLockEnable(!isDialogOpen);
    }, [isDialogOpen, updatePointerLockEnable]);

    useEffect(() => {
        setFields(
            videosLinks?.map((x, index) => ({
                id: index,
                value: x,
            })) || [
                {
                    id: 0,
                    value: "",
                },
            ]
        );
    }, [videosLinks]);

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
        updateVideosLinks(fields.map((x) => x.value));
        setIsDialogOpen(false);
    };

    const cancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
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
                    <Button onClick={addRow} {...styles.textButton}>
                        Add a row
                    </Button>
                </DialogContent>
                <DialogActions {...styles.dialogActions}>
                    <Button onClick={confirm} {...styles.filledButton}>
                        Confirm
                    </Button>
                    <Button onClick={cancel} {...styles.outlinedButton}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const widget = createUI({
    component: VideosLinksUI,
    reducer: videosLinksUIReducer,
    name: "VideosLinksUI",
});

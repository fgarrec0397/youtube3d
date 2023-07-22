import { capitalizeString } from "@granity/helpers";
import {
    Box,
    BoxProps,
    Breadcrumbs,
    BreadcrumbsProps,
    Container,
    Divider,
    Grid,
    Link,
    LinkProps,
    Typography,
    TypographyProps,
} from "@granity/ui";
import FileManagerFormModal from "@ui/components/moleculs/FileManagerFormModal/FileManagerFormModal";
import FileManagerItem, { FileItem } from "@ui/components/moleculs/FileManagerItem/FileManagerItem";
import pxToRem from "@ui/theme/utilities/pxToRem";
import { ChangeEvent, FC, FormEvent, useState } from "react";

type FilesData = {
    currentRootPath: string;
    folders: FileItem[];
    files: FileItem[];
};

export type FilesManagerProps = {
    title?: string;
    breadcrumbsLinks: string[];
    filesData: FilesData | undefined;
    newFolderName: string;
    selectedFolderIndex?: number;
    selectedFileIndex?: number;
    onChangeNewFolderName: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickFolder: (folderPath: string) => void;
    onClickBreadcrumbsElement: (folder: string) => void;
    onUploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
    onAddFolder: () => Promise<void>;
    setSelectedFolderIndex: (index?: number) => void;
    setSelectedFileIndex: (index?: number) => void;
    onDelete: (item: FileItem) => void;
    onEdit: (item: FileItem, newName: string) => void;
    onSelectFile?: (file: FileItem) => void;
};

export type FilesManagerStyles = {
    section?: BoxProps;
    headerSection?: BoxProps;
    breadcrumbs?: BreadcrumbsProps;
    breadcrumbsLink?: LinkProps;
    title?: TypographyProps;
    subTitle?: TypographyProps;
};

const styles: FilesManagerStyles = {
    section: {
        sx: {
            margin: pxToRem(25, 0),
        },
    },
    headerSection: {
        sx: {
            display: "flex",
            alignItems: "center",
        },
    },
    title: {
        sx: {
            fontSize: pxToRem(24),
            marginRight: pxToRem(32),
        },
    },
    breadcrumbsLink: {
        underline: "hover",
        color: "inherit",
        sx: {
            cursor: "pointer",
        },
    },
    subTitle: {
        sx: {
            fontSize: pxToRem(15),
            marginBottom: pxToRem(12),
        },
    },
};

const FilesManager: FC<FilesManagerProps> = ({
    title,
    breadcrumbsLinks,
    filesData,
    newFolderName,
    onChangeNewFolderName,
    onClickFolder,
    onClickBreadcrumbsElement,
    onUploadFile,
    onAddFolder,
    selectedFolderIndex,
    setSelectedFolderIndex,
    selectedFileIndex,
    setSelectedFileIndex,
    onDelete,
    onEdit,
    onSelectFile,
}) => {
    const [editingItem, setEditingItem] = useState<FileItem>();
    const [isCreateFolderModalOpen, setIsCreateForlderModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newName, setNewName] = useState("");

    const isFolderNotSelected = (index: number) => {
        return selectedFolderIndex === undefined || index !== selectedFolderIndex;
    };

    const isFolderSelected = (index: number) => {
        return selectedFolderIndex !== undefined && selectedFolderIndex === index;
    };

    const isFileNotSelected = (index: number) => {
        return selectedFileIndex === undefined || index !== selectedFileIndex;
    };

    const isFileSelected = (index: number) => {
        return selectedFileIndex !== undefined && selectedFileIndex === index;
    };

    const onClickFolderHandler = (name: string, index: number) => {
        if (selectedFileIndex !== undefined) {
            setSelectedFileIndex(undefined);
        }

        if (isFolderNotSelected(index)) {
            setSelectedFolderIndex(index);

            return;
        }

        onClickFolder?.(name);
        setSelectedFolderIndex(undefined);
    };

    const onClickFileHandler = (file: FileItem, index: number) => {
        if (selectedFolderIndex !== undefined) {
            setSelectedFolderIndex(undefined);
        }

        if (isFileNotSelected(index)) {
            setSelectedFileIndex(index);

            return;
        }

        onSelectFile?.(file);

        setSelectedFileIndex(undefined);
    };

    const onSubmitAddFolderForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddFolder();
        closeCreateFolderModal();
    };

    const onDeleteItem = (item: FileItem) => {
        onDelete(item);
    };

    const onEditItem = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingItem) {
            onEdit(editingItem, newName);
            onCloseEditModal();
        }
    };

    const openCreateFolderModal = () => {
        setIsCreateForlderModalOpen(true);
    };

    const closeCreateFolderModal = () => {
        setIsCreateForlderModalOpen(false);
    };

    const onOpenEditModal = (item: FileItem) => {
        setIsEditModalOpen(true);
        setEditingItem(item);
        setNewName(item.name);
    };

    const onCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const onChangeEditingName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    return (
        <Container>
            <Box {...styles.section}>
                <Box {...styles.headerSection}>
                    {title && <Typography {...styles.title}>{title}</Typography>}
                    <Breadcrumbs separator=">" {...styles.breadcrumbs}>
                        {breadcrumbsLinks?.map((x, index) => {
                            if (index === breadcrumbsLinks.length - 1) {
                                return (
                                    <Typography key={index} color="text.primary">
                                        {capitalizeString(x)}
                                    </Typography>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    onClick={() => onClickBreadcrumbsElement(x)}
                                    {...styles.breadcrumbsLink}
                                >
                                    {capitalizeString(x)}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
            </Box>
            <Divider />
            <Box {...styles.section}>
                <Typography {...styles.subTitle}>Folders</Typography>
                <Grid container spacing={2}>
                    {filesData?.folders?.length && filesData?.folders?.length > 0
                        ? filesData?.folders.map((x, index) => (
                              <Grid key={x.path} item xs={6} sm={4} lg={3}>
                                  <FileManagerItem
                                      item={x}
                                      type="folder"
                                      isSelected={isFolderSelected(index)}
                                      onClick={() => onClickFolderHandler(x.name, index)}
                                      options={[
                                          {
                                              name: "Edit",
                                              onClick: onOpenEditModal,
                                          },
                                          {
                                              name: "Delete",
                                              onClick: onDeleteItem,
                                          },
                                      ]}
                                  />
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={4} lg={3}>
                        <FileManagerItem type="addFolder" onClick={openCreateFolderModal} />
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box {...styles.section}>
                <Typography {...styles.subTitle}>Files</Typography>
                <Grid container spacing={2}>
                    {filesData?.files?.length && filesData?.files?.length > 0
                        ? filesData?.files?.map((x, index) => (
                              <Grid key={x.name} item xs={6} sm={3} lg={2}>
                                  <FileManagerItem
                                      item={x}
                                      type="file"
                                      isSelected={isFileSelected(index)}
                                      onClick={() => onClickFileHandler(x, index)}
                                      options={[
                                          {
                                              name: "Delete",
                                              onClick: onDeleteItem,
                                          },
                                          {
                                              name: "Edit",
                                              onClick: onOpenEditModal,
                                          },
                                      ]}
                                  />
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={3} lg={2}>
                        <FileManagerItem type="addFile" onInputFileChange={onUploadFile} />
                    </Grid>
                </Grid>
            </Box>
            {editingItem && (
                <FileManagerFormModal
                    title={`Edit ${editingItem.name}`}
                    buttonText="Confirm"
                    onChange={onChangeEditingName}
                    value={newName}
                    isModalOpen={isEditModalOpen}
                    onClose={onCloseEditModal}
                    onSubmit={onEditItem}
                />
            )}
            <FileManagerFormModal
                title="New Folder"
                buttonText="Create"
                onChange={onChangeNewFolderName}
                value={newFolderName}
                isModalOpen={isCreateFolderModalOpen}
                onClose={closeCreateFolderModal}
                onSubmit={onSubmitAddFolderForm}
            />
        </Container>
    );
};

export default FilesManager;

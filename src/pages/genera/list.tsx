import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { IGenera } from "../../interfaces/genera";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbar, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";
import { Grid, Typography } from "@mui/material";

export const GeneraList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IGenera>({
        initialPageSize: 10,
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting generas',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<IGenera>[]>(
        () => [
            {
                field: "name",
                headerName: "Name",
                minWidth: 150,
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                ),
                renderCell: function render({ row }) {
                    return <em>{row.name}</em>
                }
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={row._id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                resource="genera"
                                recordItemId={row._id}
                                mutationMode="undoable"
                                confirmTitle={`Are you sure to delete ${row.name} genus?`}
                                successNotification={{
                                    message: 'Successfully deleted genus',
                                    type: "success",
                                }}
                                errorNotification={{
                                    message: 'Error deleting a genus',
                                    type: "error",
                                }}
                            />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                flex: 0.5,
                minWidth: 80,
                sortable: false,
                filterable: false,
            },
        ],
        [],
    );

    return (
        <Grid container>
            <Grid item xs={12} lg={12}>
                <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Genera</Typography>}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowId={(row: IGenera) =>  row._id}
                        filterModel={undefined}
                        autoHeight
                        pageSizeOptions={[10, 20, 50, 100]}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        sx={{
                            ...dataGridProps.sx,
                            "& .MuiDataGrid-row": {
                                cursor: "pointer",
                            },
                        }}
                    />
                </List>
            </Grid>
        </Grid>
    )
}

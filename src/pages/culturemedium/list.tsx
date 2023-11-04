import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { ICultureMedium } from "../../interfaces/culturemedium";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbar, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";
import { Grid, Typography } from "@mui/material";

export const CultureMediumList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<ICultureMedium>({
        initialPageSize: 10,
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting culture media',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<ICultureMedium>[]>(
        () => [
            {
                field: "name",
                headerName: "Name",
                minWidth: 150,
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
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
                                resource="culturemedium"
                                recordItemId={row._id}
                                mutationMode="undoable"
                                confirmTitle={`Are you sure to delete ${row.name} culture media?`}
                                successNotification={{
                                    message: 'Successfully deleted culture media',
                                    type: "success",
                                }}
                                errorNotification={{
                                    message: 'Error deleting a culture media',
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
                <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Culture Media</Typography>}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowId={(row: ICultureMedium) =>  row._id}
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

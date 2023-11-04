import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { IEnzyme } from "../../interfaces/enzyme";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbar, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";
import { Grid, Typography } from "@mui/material";

export const EnzymeList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IEnzyme>({
        initialPageSize: 10,
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting enzymes',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<IEnzyme>[]>(
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
                                resource="enzyme"
                                recordItemId={row._id}
                                mutationMode="undoable"
                                confirmTitle={`Are you sure to delete ${row.name} enzyme?`}
                                successNotification={{
                                    message: 'Successfully deleted enzyme',
                                    type: "success",
                                }}
                                errorNotification={{
                                    message: 'Error deleting an enzyme',
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
                <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Enzymes</Typography>}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowId={(row: IEnzyme) =>  row._id}
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

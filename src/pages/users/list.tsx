import { List, useDataGrid, EditButton } from "@refinedev/mui";
import { IUser } from "../../interfaces/user";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";

const CustomToolbar: React.JSXElementConstructor<unknown> = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    );
}

export const UsersList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IUser>({
        initialPageSize: 10,
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting users',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<IUser>[]>(
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
                field: "email",
                headerName: "Email",
                minWidth: 150,
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "avatar",
                headerName: "Avatar",
                renderCell: function render({ row }) {
                    return <Avatar src={row.avatar} />;
                },
                minWidth: 100,
                sortable: false,
                filterable: false,
            },
            {
                field: "role",
                headerName: "Role",
                minWidth: 150,
                flex: 1,
                filterable: false,
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <EditButton
                            size="small"
                            hideText
                            recordItemId={row._id}
                        />
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
                <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Users</Typography>}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowId={(row: IUser) =>  row._id}
                        filterModel={undefined}
                        autoHeight
                        pageSizeOptions={[10, 20, 50, 100]}
                        slots={{
                            toolbar: CustomToolbar,
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
    );

}

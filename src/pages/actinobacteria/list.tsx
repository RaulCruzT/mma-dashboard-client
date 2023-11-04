import { List, useDataGrid, ShowButton, EditButton, DeleteButton } from "@refinedev/mui";
import { IActinobacteria } from "../../interfaces/actinobacteria";
import {
    IResourceComponentsProps,
    useGetIdentity,
    HttpError,
    CrudFilters,
    BaseRecord,
    getDefaultFilter
} from "@refinedev/core";
import {
    DataGrid,
    GridColDef,
    GridToolbar,
    getGridStringOperators
} from "@mui/x-data-grid";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import React from "react";
import { Box, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { IUser } from "../../interfaces/user";
import { CreatorOptions, UserRoles } from "../../enums/user.enum";
import { IActinobacteriaFilterVariables } from "../../interfaces/utils";

export const ActinobacteriaList: React.FC<IResourceComponentsProps> = () => {
    const { data: user } = useGetIdentity<IUser>();
    const role = localStorage.getItem("role") ?? UserRoles.User;

    const { dataGridProps, search, filters } = useDataGrid<
        IActinobacteria,
        HttpError,
        IActinobacteriaFilterVariables
    >({
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { person } = params;

            filters.push({
                field: "person",
                operator: "eq",
                value: person !== "" ? person : undefined,
            });

            return filters;
        },
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting actinobacteria',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<IActinobacteria>[]>(
        () => [
            {
                field: "identifierStrain",
                headerName: "Strain",
                minWidth: 150,
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "identifierGenera",
                headerName: "Genus",
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: function render({ row }) {
                    return <em>{row?.identifierGenera?.name}</em>
                }
            },
            {
                field: "identifierSpecies",
                headerName: "Species",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "arnr16sCompleteness",
                headerName: "16S rRNA",
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
                            <ShowButton
                                size="small"
                                hideText
                                recordItemId={row._id}
                            />
                            {
                                (user?.email === row.creator.email || [UserRoles.Admin, UserRoles.Manager].includes(role as UserRoles)) &&
                                <>
                                    <EditButton
                                        size="small"
                                        hideText
                                        recordItemId={row._id}
                                    />
                                    <DeleteButton
                                        size="small"
                                        hideText
                                        resource="actinobacteria"
                                        recordItemId={row._id}
                                        mutationMode="undoable"
                                        confirmTitle={`Are you sure to delete ${row.identifierStrain} actinobacteria?`}
                                        successNotification={{
                                            message: 'Successfully deleted actinobacteria',
                                            type: "success",
                                        }}
                                        errorNotification={{
                                            message: 'Error deleting an actinobacteria',
                                            type: "error",
                                        }}
                                    />
                                </>
                            }
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
        [role, user?.email],
    );

    const { handleSubmit, control } = useForm<
        BaseRecord,
        HttpError,
        IActinobacteriaFilterVariables
    >({
        defaultValues: {
            person: getDefaultFilter("person", filters, "eq") || "",
        },
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
                    <CardHeader title={"Filters"} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <Controller
                                control={control}
                                name="person"
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                render={({ field }: { field: any }) => (
                                    <FormControl margin="normal" size="small">
                                        <InputLabel id="person-select">
                                            {"Creator"}
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="person-select"
                                            label={"Creator"}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={CreatorOptions.Me}>
                                                {CreatorOptions.Me}
                                            </MenuItem>
                                            <MenuItem value={CreatorOptions.Other}>
                                                {CreatorOptions.Other}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <br />
                            <Button type="submit" variant="contained">
                                {"Filter"}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
            <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Actinobacteria</Typography>}>
                <DataGrid
                    {...dataGridProps}
                    columns={columns}
                    getRowId={(row: IActinobacteria) =>  row._id}
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
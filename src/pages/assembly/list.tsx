import { List, useDataGrid, EditButton, DeleteButton, useAutocomplete, ShowButton } from "@refinedev/mui";
import { IAssembly } from "../../interfaces/assembly";
import {
    IResourceComponentsProps,
    useGetIdentity,
    HttpError,
    CrudFilters,
    BaseRecord,
    getDefaultFilter
} from '@refinedev/core';
import {
    DataGrid,
    GridColDef,
    GridToolbar,
    getGridStringOperators
} from "@mui/x-data-grid";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import React from "react";
import { IUser } from "../../interfaces/user";
import { CreatorOptions, UserRoles } from "../../enums/user.enum";
import { IAssemblyFilterVariables } from "../../interfaces/utils";
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const AssemblyList: React.FC<IResourceComponentsProps> = () => {
    const { data: user } = useGetIdentity<IUser>();
    const role = localStorage.getItem("role") ?? UserRoles.User;

    const { dataGridProps, search, filters } = useDataGrid<
        IAssembly,
        HttpError,
        IAssemblyFilterVariables
    >({
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { actinobacteria, person } = params;

            filters.push({
                field: "actinobacteria",
                operator: "eq",
                value: actinobacteria,
            });

            filters.push({
                field: "person",
                operator: "eq",
                value: person !== "" ? person : undefined,
            });

            return filters;
        },
    });

    const columns = React.useMemo<GridColDef<IAssembly>[]>(
        () => [
            {
                field: "actinobacteria",
                headerName: "Actinobacteria",
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: function render({ row }) {
                    return row?.actinobacteria?.identifierStrain;
                }
            },
            {
                field: "date",
                headerName: "Date",
                minWidth: 150,
                flex: 1,
                filterable: false,
                renderCell: function render({ row }) {
                    return row?.date ? dayjs.utc(row.date).format('DD/MM/YYYY') : null;
                }
            },
            {
                field: "softwareTrimming",
                headerName: "Software trimming",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "softwareAssembly",
                headerName: "Software assembly",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "parametersAssembly",
                headerName: "Parameters assembly",
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
                                        resource="assembly"
                                        recordItemId={row._id}
                                        mutationMode="undoable"
                                        confirmTitle={`Are you sure to delete the assembly?`}
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
        IAssemblyFilterVariables
    >({
        defaultValues: {
            actinobacteria: getDefaultFilter("actinobacteria", filters, "eq"),
            person: getDefaultFilter("person", filters, "eq") || "",
        },
    });

    const { autocompleteProps: actinobacteriaAutocompleteProps } = useAutocomplete({
        resource: "actinobacteria",
        defaultValue: getDefaultFilter("actinobacteria", filters, "eq"),
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
                                name="actinobacteria"
                                render={({ field }) => (
                                    <Autocomplete
                                        {...actinobacteriaAutocompleteProps}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value?._id ?? value);
                                        }}
                                        getOptionLabel={(item) => {
                                            return item.identifierStrain
                                                ? item.identifierStrain
                                                : actinobacteriaAutocompleteProps?.options?.find(
                                                    (p) =>
                                                        p._id.toString() ===
                                                        item.toString(),
                                                )?.identifierStrain ?? "";
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            value === undefined ||
                                            option?._id?.toString() ===
                                                (value?._id ?? value)?.toString()
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={"Actinobacteria"}
                                                placeholder={"Actinobacteria"}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
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
                <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Assemblies</Typography>}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowId={(row: IAssembly) =>  row._id}
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

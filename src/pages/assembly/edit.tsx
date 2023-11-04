import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource";
import { useForm } from "@refinedev/react-hook-form";
import { IAssembly } from "../../interfaces/assembly";
import { HttpError } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, FormControl, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { Nullable } from "../../interfaces/utils";
import { IMyActinobacteria } from "../../interfaces/myactinobacteria";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const AssemblyEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult },
        register,
        control,
        formState: { errors },
    } = useForm<IAssembly, HttpError, Nullable<IAssembly>>({
        refineCoreProps: {
            successNotification: () => {
                return {
                    message: 'Successfully updated assembly',
                    type: "success",
                };
            },
            errorNotification: () => {
                return {
                    message: 'Error updating an assembly',
                    type: "error",
                }
            }
        }
    });

    const { autocompleteProps: myActinobacteriaAutocompleteProps } = useAutocomplete<IMyActinobacteria>({
        resource: "myactinobacteria",
        defaultValue: queryResult?.data?.data.actinobacteria._id,
        onSearch: (value: string) => [
            {
                field: "identifierStrain",
                operator: "contains",
                value
            }
        ]
    });

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps} title={<Typography variant="h5">Edit Assembly</Typography>}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
                    spacing={2}
                >
                    <Grid item xs={12} md={12}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Actinobacteria
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="actinobacteria"
                                    rules={{ required: "required" }}
                                    // eslint-disable-next-line
                                    defaultValue={null as any}
                                    render={({ field }) => (
                                        <Autocomplete
                                            size="small"
                                            disablePortal
                                            {...myActinobacteriaAutocompleteProps}
                                            {...field}
                                            onChange={(_, value) => {
                                                field.onChange(value);
                                            }}
                                            getOptionLabel={(item) => {
                                                return (
                                                    myActinobacteriaAutocompleteProps?.options?.find(
                                                        (p) =>
                                                            p?._id?.toString() ===
                                                            item?._id?.toString(),
                                                    )?.identifierStrain ?? ""
                                                );
                                            }}
                                            isOptionEqualToValue={(
                                                option,
                                                value,
                                            ) =>
                                                value === undefined ||
                                                option?._id?.toString() ===
                                                    (
                                                        value?._id ?? value
                                                    )?.toString()
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    error={
                                                        !!errors.actinobacteria
                                                            ?.message
                                                    }
                                                    required
                                                    disabled
                                                />
                                            )}
                                        />
                                    )}
                                />
                                {errors.actinobacteria && (
                                    <FormHelperText error>
                                        {errors.actinobacteria.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Sequencing Technology
                                </FormLabel>
                                <TextField
                                    {...register("sequencingTechnology", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.sequencingTechnology && (
                                    <FormHelperText error>
                                        {errors.sequencingTechnology.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Date
                                </FormLabel>
                                <Controller
                                    control={control}
                                    defaultValue={null}
                                    name="date"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                onChange={onChange}
                                                onAccept={onChange}
                                                value={dayjs.utc(value)}
                                                inputRef={ref}
                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD/MM/YYYY"
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                {errors.date && (
                                    <FormHelperText error>
                                        {errors.date.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Software trimming
                                </FormLabel>
                                <TextField
                                    {...register("softwareTrimming", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.softwareTrimming && (
                                    <FormHelperText error>
                                        {errors.softwareTrimming.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Software assembly
                                </FormLabel>
                                <TextField
                                    {...register("softwareAssembly", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.softwareAssembly && (
                                    <FormHelperText error>
                                        {errors.softwareAssembly.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Parameters assembly
                                </FormLabel>
                                <TextField
                                    {...register("parametersAssembly", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.parametersAssembly && (
                                    <FormHelperText error>
                                        {errors.parametersAssembly.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Quality final
                                </FormLabel>
                                <TextField
                                    {...register("qualityFinal", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.qualityFinal && (
                                    <FormHelperText error>
                                        {errors.qualityFinal.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    BGCs link
                                </FormLabel>
                                <TextField
                                    {...register("bgcs", {
                                        required: false,
                                        maxLength: {
                                            value: 400,
                                            message: "You cannot enter more than 400 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    type="url"
                                />
                                {errors.bgcs && (
                                    <FormHelperText error>
                                        {errors.bgcs.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Assembly link
                                </FormLabel>
                                <TextField
                                    {...register("link", {
                                        required: false,
                                        maxLength: {
                                            value: 400,
                                            message: "You cannot enter more than 400 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    type="url"
                                />
                                {errors.link && (
                                    <FormHelperText error>
                                        {errors.link.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Accession number
                                </FormLabel>
                                <TextField
                                    {...register("accessionNumber", {
                                        required: false,
                                        maxLength: {
                                            value: 400,
                                            message: "You cannot enter more than 400 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    type="url"
                                />
                                {errors.accessionNumber && (
                                    <FormHelperText error>
                                        {errors.accessionNumber.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Paper
                                </FormLabel>
                                <TextField
                                    {...register("paper", {
                                        required: false,
                                        maxLength: {
                                            value: 400,
                                            message: "You cannot enter more than 400 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    type="url"
                                />
                                {errors.paper && (
                                    <FormHelperText error>
                                        {errors.paper.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Comments
                                </FormLabel>
                                <TextField
                                    {...register("comments", {
                                        required: false,
                                        maxLength: {
                                            value: 400,
                                            message: "You cannot enter more than 400 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    multiline
                                    minRows={5}
                                />
                                {errors.comments && (
                                    <FormHelperText error>
                                        {errors.comments.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Edit>
    )
}

import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource";
import { useForm } from "@refinedev/react-hook-form";
import { IProcessedData } from "../../interfaces/processeddata";
import { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, FormControl, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { IMyActinobacteria } from "../../interfaces/myactinobacteria";
import { Nullable } from "../../interfaces/utils";
import { Controller } from "react-hook-form";

export const ProcessedDataCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm<IMyActinobacteria, HttpError, Nullable<IProcessedData>>({
        refineCoreProps: {
            successNotification: () => {
                return {
                    message: 'Successfully created processed data',
                    type: "success",
                };
            },
            errorNotification: () => {
                return {
                    message: 'Error creating an processed data',
                    type: "error",
                }
            }
        }
    });

    const { autocompleteProps: myActinobacteriaAutocompleteProps } = useAutocomplete<IMyActinobacteria>({
        resource: "myactinobacteria",
        onSearch: (value: string) => [
            {
                field: "identifierStrain",
                operator: "contains",
                value
            }
        ]
    });
    
    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps} title={<Typography variant="h5">Create Processed data</Typography>}>
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
                                                    helperText={errors.actinobacteria?.message}
                                                    required
                                                />
                                            )}
                                        />
                                    )}
                                />
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
                                    Data source
                                </FormLabel>
                                <TextField
                                    {...register("dataSource", {
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
                                    error={
                                        !!errors.dataSource
                                            ?.message
                                    }
                                    helperText={errors.dataSource?.message}
                                />
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
                                    Equipment
                                </FormLabel>
                                <TextField
                                    {...register("equipment", {
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
                                    error={
                                        !!errors.equipment
                                            ?.message
                                    }
                                    helperText={errors.equipment?.message}
                                />
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
                                    File name
                                </FormLabel>
                                <TextField
                                    {...register("fileName", {
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
                                    error={
                                        !!errors.fileName
                                            ?.message
                                    }
                                    helperText={errors.fileName?.message}
                                />
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
                                    Mass detection
                                </FormLabel>
                                <TextField
                                    {...register("massDetection", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.massDetection
                                            ?.message
                                    }
                                    helperText={errors.massDetection?.message}
                                />
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
                                    Chromatogram builder
                                </FormLabel>
                                <TextField
                                    {...register("chromatogramBuilder", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.chromatogramBuilder
                                            ?.message
                                    }
                                    helperText={errors.chromatogramBuilder?.message}
                                />
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
                                    Deconvolution
                                </FormLabel>
                                <TextField
                                    {...register("deconvolution", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.deconvolution
                                            ?.message
                                    }
                                    helperText={errors.deconvolution?.message}
                                />
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
                                    Isotope
                                </FormLabel>
                                <TextField
                                    {...register("isotope", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.isotope
                                            ?.message
                                    }
                                    helperText={errors.isotope?.message}
                                />
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
                                    Filtered
                                </FormLabel>
                                <TextField
                                    {...register("filtered", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.filtered
                                            ?.message
                                    }
                                    helperText={errors.filtered?.message}
                                />
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
                                    Identification
                                </FormLabel>
                                <TextField
                                    {...register("identification", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.identification
                                            ?.message
                                    }
                                    helperText={errors.identification?.message}
                                />
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
                                    Alignment
                                </FormLabel>
                                <TextField
                                    {...register("alignment", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.alignment
                                            ?.message
                                    }
                                    helperText={errors.alignment?.message}
                                />
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
                                    Gap filling
                                </FormLabel>
                                <TextField
                                    {...register("gapFilling", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.gapFilling
                                            ?.message
                                    }
                                    helperText={errors.gapFilling?.message}
                                />
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
                                    MassIVE ID
                                </FormLabel>
                                <TextField
                                    {...register("massIVEID", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.massIVEID
                                            ?.message
                                    }
                                    helperText={errors.massIVEID?.message}
                                />
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
                                    Processed data link
                                </FormLabel>
                                <TextField
                                    {...register("link", {
                                        required: false,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    error={
                                        !!errors.link
                                            ?.message
                                    }
                                    helperText={errors.link?.message}
                                />
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
                                    error={
                                        !!errors.comments
                                            ?.message
                                    }
                                    helperText={errors.comments?.message}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Create>
    )
}

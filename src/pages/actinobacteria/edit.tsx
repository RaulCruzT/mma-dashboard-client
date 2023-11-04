import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource";
import { useForm } from "@refinedev/react-hook-form";
import { IActinobacteria } from "../../interfaces/actinobacteria";
import { HttpError } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, FormControl, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import {
    ExpandMore
} from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { Nullable } from "../../interfaces/utils";
import { IGenera } from "../../interfaces/genera";
import { ITypeStrain } from "../../interfaces/typestrain";
import { IEnzyme } from "../../interfaces/enzyme";
import { ICultureMedium } from "../../interfaces/culturemedium";

export const ActinobacteriaEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult },
        register,
        control,
        formState: { errors },
        getValues,
    } = useForm<IActinobacteria, HttpError, Nullable<IActinobacteria>>({
        refineCoreProps: {
            successNotification: () => {
                return {
                    message: 'Successfully updated actinobacteria',
                    type: "success",
                };
            },
            errorNotification: () => {
                return {
                    message: 'Error updating an actinobacteria',
                    type: "error",
                }
            }
        }
    });

    const { autocompleteProps: generaAutocompleteProps } = useAutocomplete<IGenera>({
        resource: "genera",
        defaultValue: queryResult?.data?.data.identifierGenera._id,
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: typeStrainYesAutocompleteProps } = useAutocomplete<ITypeStrain>({
        resource: "typestrain",
        defaultValue: getValues("bioactivityYes") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: typeStrainNoAutocompleteProps } = useAutocomplete<ITypeStrain>({
        resource: "typestrain",
        defaultValue: getValues("bioactivityNo") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: typeStrainNaAutocompleteProps } = useAutocomplete<ITypeStrain>({
        resource: "typestrain",
        defaultValue: getValues("bioactivityNa") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: enzymesYesAutocompleteProps } = useAutocomplete<IEnzyme>({
        resource: "enzyme",
        defaultValue: getValues("enzymesYes") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: enzymesNoAutocompleteProps } = useAutocomplete<IEnzyme>({
        resource: "enzyme",
        defaultValue: getValues("enzymesNo") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: enzymesNaAutocompleteProps } = useAutocomplete<IEnzyme>({
        resource: "enzyme",
        defaultValue: getValues("enzymesNa") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: characterizationGrowingMediaAutocompleteProps } = useAutocomplete<ICultureMedium>({
        resource: "culturemedium",
        defaultValue: getValues("characterizationGrowingMedia") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const { autocompleteProps: characterizationNotGrowingMediaAutocompleteProps } = useAutocomplete<ICultureMedium>({
        resource: "culturemedium",
        defaultValue: getValues("characterizationNotGrowingMedia") || [],
        onSearch: (value: string) => [
            {
                field: "name",
                operator: "contains",
                value
            }
        ]
    });

    const step = 0.01;

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps} title={<Typography variant="h5">Edit Actinobacteria</Typography>}>
            <form>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Identification</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
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
                                            Strain
                                        </FormLabel>
                                        <TextField
                                            {...register("identifierStrain", {
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
                                            disabled
                                        />
                                        {errors.identifierStrain && (
                                            <FormHelperText error>
                                                {errors.identifierStrain.message}
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
                                            Genera
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="identifierGenera"
                                            rules={{ required: "required" }}
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    disablePortal
                                                    {...generaAutocompleteProps}
                                                    {...field}
                                                    onChange={(_, value) => {
                                                        field.onChange(value);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return (
                                                            generaAutocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p?._id?.toString() ===
                                                                    item?._id?.toString(),
                                                            )?.name ?? ""
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
                                                                !!errors.identifierGenera
                                                                    ?.message
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.identifierGenera && (
                                            <FormHelperText error>
                                                {errors.identifierGenera.message}
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
                                            Species
                                        </FormLabel>
                                        <TextField
                                            {...register("identifierSpecies", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.identifierSpecies && (
                                            <FormHelperText error>
                                                {errors.identifierSpecies.message}
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
                                            Main photo link
                                        </FormLabel>
                                        <TextField
                                            {...register("identifierMainPhoto", {
                                                required: {
                                                    value: true,
                                                    message: "required"
                                                },
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
                                        {errors.identifierMainPhoto && (
                                            <FormHelperText error>
                                                {errors.identifierMainPhoto.message}
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
                                            Other photos link
                                        </FormLabel>
                                        <TextField
                                            {...register("identifierPhotos", {
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
                                        {errors.identifierPhotos && (
                                            <FormHelperText error>
                                                {errors.identifierPhotos.message}
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
                                            Local storage
                                        </FormLabel>
                                        <TextField
                                            {...register("identifierLocalStorage", {
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
                                        {errors.identifierLocalStorage && (
                                            <FormHelperText error>
                                                {errors.identifierLocalStorage.message}
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
                                            International storage
                                        </FormLabel>
                                        <TextField
                                            {...register("identifierInternationalStorage", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.identifierInternationalStorage && (
                                            <FormHelperText error>
                                                {errors.identifierInternationalStorage.message}
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
                                            {...register("identifierComments", {
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
                                        {errors.identifierComments && (
                                            <FormHelperText error>
                                                {errors.identifierComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Geographical data</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
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
                                            Isolation site
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyIsolationSite", {
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
                                        {errors.geographyIsolationSite && (
                                            <FormHelperText error>
                                                {errors.geographyIsolationSite.message}
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
                                            Coordinates
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyCoordinates", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.geographyCoordinates && (
                                            <FormHelperText error>
                                                {errors.geographyCoordinates.message}
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
                                            Isolation source
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyIsolationSource", {
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
                                        {errors.geographyIsolationSource && (
                                            <FormHelperText error>
                                                {errors.geographyIsolationSource.message}
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
                                            Altitude (m.a.s.l)
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyAltitude", {
                                                required: false
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{ inputProps: { step: step}}}
                                        />
                                        {errors.geographyAltitude && (
                                            <FormHelperText error>
                                                {errors.geographyAltitude.message}
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
                                            {...register("geographyComments", {
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
                                        {errors.geographyComments && (
                                            <FormHelperText error>
                                                {errors.geographyComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Isolation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
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
                                            Medium
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationMedium", {
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
                                        {errors.isolationMedium && (
                                            <FormHelperText error>
                                                {errors.isolationMedium.message}
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
                                            Temperature (°C)
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationTemperature", {
                                                required: {
                                                    value: true,
                                                    message: "required"
                                                },
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{ inputProps: { step: step}}}
                                        />
                                        {errors.isolationTemperature && (
                                            <FormHelperText error>
                                                {errors.isolationTemperature.message}
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
                                            Method
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationMethod", {
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
                                        {errors.isolationMethod && (
                                            <FormHelperText error>
                                                {errors.isolationMethod.message}
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
                                            Person in charge
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationResponsible", {
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
                                        {errors.isolationResponsible && (
                                            <FormHelperText error>
                                                {errors.isolationResponsible.message}
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
                                            Thesis/Paper
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationThesisPaper", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.isolationThesisPaper && (
                                            <FormHelperText error>
                                                {errors.isolationThesisPaper.message}
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
                                            Thesis/Paper link
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationThesisPaperLink", {
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
                                        {errors.isolationThesisPaperLink && (
                                            <FormHelperText error>
                                                {errors.isolationThesisPaperLink.message}
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
                                            {...register("isolationComments", {
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
                                        {errors.isolationComments && (
                                            <FormHelperText error>
                                                {errors.isolationComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>rRNA 16S</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
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
                                            Completeness
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="arnr16sCompleteness"
                                            rules={{ required: "required" }}
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Complete",
                                                        "Partial",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.arnr16sCompleteness
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.arnr16sCompleteness && (
                                            <FormHelperText error>
                                                {errors.arnr16sCompleteness.message}
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
                                            Size (?)
                                        </FormLabel>
                                        <TextField
                                            {...register("arnr16sSize", {
                                                required: {
                                                    value: true,
                                                    message: "required"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                            InputProps={{ inputProps: { step: step}}}
                                        />
                                        {errors.arnr16sSize && (
                                            <FormHelperText error>
                                                {errors.arnr16sSize.message}
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
                                            Sequence file link
                                        </FormLabel>
                                        <TextField
                                            {...register("arnr16sSequenceFile", {
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
                                            type="url"
                                        />
                                        {errors.arnr16sSequenceFile && (
                                            <FormHelperText error>
                                                {errors.arnr16sSequenceFile.message}
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
                                            Macrogen file link
                                        </FormLabel>
                                        <TextField
                                            {...register("arnr16sMacrogenFile", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
                                        {errors.arnr16sMacrogenFile && (
                                            <FormHelperText error>
                                                {errors.arnr16sMacrogenFile.message}
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
                                            {...register("arnr16sComments", {
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
                                        {errors.arnr16sComments && (
                                            <FormHelperText error>
                                                {errors.arnr16sComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Characterization</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
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
                                            Growing media
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationGrowingMedia"
                                            rules={{ required: "required" }}
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = characterizationGrowingMediaAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...characterizationGrowingMediaAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                characterizationGrowingMediaAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="characterizationGrowingMedia"
                                                                    id="characterizationGrowingMedia"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.characterizationGrowingMedia?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.characterizationGrowingMedia && (
                                            <FormHelperText error>
                                                {errors.characterizationGrowingMedia.message}
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
                                            Not growing media
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationNotGrowingMedia"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = characterizationNotGrowingMediaAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...characterizationNotGrowingMediaAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                characterizationNotGrowingMediaAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="characterizationNotGrowingMedia"
                                                                    id="characterizationNotGrowingMedia"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.characterizationNotGrowingMedia?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.characterizationNotGrowingMedia && (
                                            <FormHelperText error>
                                                {errors.characterizationNotGrowingMedia.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
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
                                            Mycelial
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationMycelial"
                                            rules={{ required: "required" }}
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Yes",
                                                        "No",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.characterizationMycelial
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.characterizationMycelial && (
                                            <FormHelperText error>
                                                {errors.characterizationMycelial.message}
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
                                            Day of appearance of the first colonies
                                        </FormLabel>
                                        <TextField
                                            {...register("characterizationColoniesDay", {
                                                required: false,
                                                min: {
                                                    value: 0,
                                                    message: "You cannot enter a number less than 0"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                        />
                                        {errors.characterizationColoniesDay && (
                                            <FormHelperText error>
                                                {errors.characterizationColoniesDay.message}
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
                                            Sporulation start day
                                        </FormLabel>
                                        <TextField
                                            {...register("characterizationSporulationDay", {
                                                required: false,
                                                min: {
                                                    value: 0,
                                                    message: "You cannot enter a number less than 0"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                        />
                                        {errors.characterizationSporulationDay && (
                                            <FormHelperText error>
                                                {errors.characterizationSporulationDay.message}
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
                                            Biomass collection day
                                        </FormLabel>
                                        <TextField
                                            {...register("characterizationBiomassDay", {
                                                required: false,
                                                min: {
                                                    value: 0,
                                                    message: "You cannot enter a number less than 0"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                        />
                                        {errors.characterizationBiomassDay && (
                                            <FormHelperText error>
                                                {errors.characterizationBiomassDay.message}
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
                                            Shape
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationShape"
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Circular",
                                                        "Fusiform",
                                                        "Rhizoid",
                                                        "Filamentous",
                                                        "Irregular",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.characterizationShape
                                                            }
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.characterizationShape && (
                                            <FormHelperText error>
                                                {errors.characterizationShape.message}
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
                                            Border (margin of the colony)
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationBorder"
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Complete",
                                                        "Rhizoid",
                                                        "Filamentous",
                                                        "Wavy",
                                                        "Lobed",
                                                        "Curly",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.characterizationBorder
                                                            }
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.characterizationBorder && (
                                            <FormHelperText error>
                                                {errors.characterizationBorder.message}
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
                                            Elevation
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationElevation"
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Flat",
                                                        "Convex",
                                                        "Elevated",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.characterizationElevation
                                                            }
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.characterizationElevation && (
                                            <FormHelperText error>
                                                {errors.characterizationElevation.message}
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
                                            Surface
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationSurface"
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Smooth",
                                                        "Rough",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.characterizationSurface
                                                            }
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.characterizationSurface && (
                                            <FormHelperText error>
                                                {errors.characterizationSurface.message}
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
                                            Color
                                        </FormLabel>
                                        <TextField
                                            {...register("characterizationColor", {
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.characterizationColor && (
                                            <FormHelperText error>
                                                {errors.characterizationColor.message}
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
                                            Transparency
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationTransparency"
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Opaque",
                                                        "Transparent",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.characterizationTransparency
                                                            }
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.characterizationTransparency && (
                                            <FormHelperText error>
                                                {errors.characterizationTransparency.message}
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
                                            Brightness
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationBrightness"
                                            // eslint-disable-next-line
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    size="small"
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "Bright",
                                                        "Without bright",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.characterizationBrightness
                                                            }
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.characterizationBrightness && (
                                            <FormHelperText error>
                                                {errors.characterizationBrightness.message}
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
                                            {...register("characterizationComments", {
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
                                        {errors.characterizationComments && (
                                            <FormHelperText error>
                                                {errors.characterizationComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Genome</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            spacing={2}
                        >
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
                                            Raw data link
                                        </FormLabel>
                                        <TextField
                                            {...register("genomeRawData", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
                                        {errors.genomeRawData && (
                                            <FormHelperText error>
                                                {errors.genomeRawData.message}
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
                                            {...register("genomeComments", {
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
                                        {errors.genomeComments && (
                                            <FormHelperText error>
                                                {errors.genomeComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Bioactivity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            spacing={2}
                        >
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
                                            File link
                                        </FormLabel>
                                        <TextField
                                            {...register("bioactivityFile", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
                                        {errors.bioactivityFile && (
                                            <FormHelperText error>
                                                {errors.bioactivityFile.message}
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
                                            Yes
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="bioactivityYes"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = typeStrainYesAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...typeStrainYesAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                typeStrainYesAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="bioactivityYes"
                                                                    id="bioactivityYes"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.bioactivityYes?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.bioactivityYes && (
                                            <FormHelperText error>
                                                {errors.bioactivityYes.message}
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
                                            No
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="bioactivityNo"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = typeStrainNoAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...typeStrainNoAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                typeStrainNoAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="bioactivityNo"
                                                                    id="bioactivityNo"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.bioactivityNo?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.bioactivityNo && (
                                            <FormHelperText error>
                                                {errors.bioactivityNo.message}
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
                                            Na
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="bioactivityNa"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = typeStrainNaAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...typeStrainNaAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                typeStrainNaAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="bioactivityNa"
                                                                    id="bioactivityNa"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.bioactivityNa?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.bioactivityNa && (
                                            <FormHelperText error>
                                                {errors.bioactivityNa.message}
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
                                            {...register("bioactivityComments", {
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
                                        {errors.bioactivityComments && (
                                            <FormHelperText error>
                                                {errors.bioactivityComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Metabolomics</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid
                            container
                            spacing={2}
                        >
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
                                            Medina Foundation reports link
                                        </FormLabel>
                                        <TextField
                                            {...register("metabolomicsMedinaFoundationReports", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
                                        {errors.metabolomicsMedinaFoundationReports && (
                                            <FormHelperText error>
                                                {errors.metabolomicsMedinaFoundationReports.message}
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
                                            Raw data link
                                        </FormLabel>
                                        <TextField
                                            {...register("metabolomicsRawData", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
                                        {errors.metabolomicsRawData && (
                                            <FormHelperText error>
                                                {errors.metabolomicsRawData.message}
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
                                            {...register("metabolomicsComments", {
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
                                        {errors.metabolomicsComments && (
                                            <FormHelperText error>
                                                {errors.metabolomicsComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Enzymes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            spacing={2}
                        >
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
                                            Yes
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="enzymesYes"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = enzymesYesAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...enzymesYesAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                enzymesYesAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="enzymesYes"
                                                                    id="enzymesYes"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.enzymesYes?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.enzymesYes && (
                                            <FormHelperText error>
                                                {errors.enzymesYes.message}
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
                                            No
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="enzymesNo"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = enzymesNoAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...enzymesNoAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                enzymesNoAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="enzymesNo"
                                                                    id="enzymesNo"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.enzymesNo?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.enzymesNo && (
                                            <FormHelperText error>
                                                {errors.enzymesNo.message}
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
                                            Na
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="enzymesNa"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = enzymesNaAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v._id === p?._id) !==
                                                        undefined,
                                                );

                                                return (
                                                    <Autocomplete
                                                        {...enzymesNaAutocompleteProps}
                                                        {...field}
                                                        value={newValue}
                                                        multiple
                                                        clearOnBlur={false}
                                                        onChange={(_, value) => {
                                                            const newValue = value;
                                                            field.onChange(newValue);
                                                        }}
                                                        getOptionLabel={(item) => {
                                                            return (
                                                                enzymesNaAutocompleteProps?.options?.find(
                                                                    (p) =>
                                                                        p?._id?.toString() ===
                                                                        item?._id.toString(),
                                                                )?.name ?? ""
                                                            );
                                                        }}
                                                        isOptionEqualToValue={(option, value) => {
                                                            return (
                                                                value === undefined ||
                                                                option?._id?.toString() ===
                                                                    value?._id?.toString()
                                                            );
                                                        }}
                                                        renderInput={(params) => {
                                                            return (
                                                                <TextField
                                                                    {...params}
                                                                    size="small"
                                                                    name="enzymesNa"
                                                                    id="enzymesNa"
                                                                    margin="normal"
                                                                    variant="outlined"
                                                                    error={!!errors.enzymesNa?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors.enzymesNa && (
                                            <FormHelperText error>
                                                {errors.enzymesNa.message}
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
                                            {...register("enzymesComments", {
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
                                        {errors.enzymesComments && (
                                            <FormHelperText error>
                                                {errors.enzymesComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </form>
        </Edit>
    )
}

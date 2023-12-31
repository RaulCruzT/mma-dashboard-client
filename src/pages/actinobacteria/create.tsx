import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource";
import { useForm } from "@refinedev/react-hook-form";
import { IActinobacteria } from "../../interfaces/actinobacteria";
import { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, FormControl, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import {
    ExpandMore
} from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { Nullable } from "../../interfaces/utils";
import { IGenera } from "../../interfaces/genera";
import { ITypeStrain } from "../../interfaces/typestrain";
import { IEnzyme } from "../../interfaces/enzyme";
import { ICultureMedium } from "../../interfaces/culturemedium";

export const ActinobacteriaCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
        getValues,
    } = useForm<IActinobacteria, HttpError, Nullable<IActinobacteria>>({
        refineCoreProps: {
            successNotification: () => {
                return {
                    message: 'Successfully created actinobacteria',
                    type: "success",
                };
            },
            errorNotification: () => {
                return {
                    message: 'Error creating an actinobacteria',
                    type: "error",
                }
            }
        }
    });

    const { autocompleteProps: generaAutocompleteProps } = useAutocomplete<IGenera>({
        resource: "genera",
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
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps} title={<Typography variant="h5">Create Actinobacteria</Typography>}>
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
                                            error={
                                                !!errors.identifierStrain
                                                    ?.message
                                            }
                                            helperText={errors.identifierStrain?.message}
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
                                            Genus
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
                                                            helperText={errors.identifierGenera?.message}
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
                                            error={
                                                !!errors.identifierSpecies
                                                    ?.message
                                            }
                                            helperText={errors.identifierSpecies?.message}
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
                                            error={
                                                !!errors.identifierMainPhoto
                                                    ?.message
                                            }
                                            helperText={errors.identifierMainPhoto?.message}
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
                                            error={
                                                !!errors.identifierPhotos
                                                    ?.message
                                            }
                                            helperText={errors.identifierPhotos?.message}
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
                                            error={
                                                !!errors.identifierLocalStorage
                                                    ?.message
                                            }
                                            helperText={errors.identifierLocalStorage?.message}
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
                                            error={
                                                !!errors.identifierInternationalStorage
                                                    ?.message
                                            }
                                            helperText={errors.identifierInternationalStorage?.message}
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
                                            error={
                                                !!errors.identifierComments
                                                    ?.message
                                            }
                                            helperText={errors.identifierComments?.message}
                                        />
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
                                            error={
                                                !!errors.geographyIsolationSite
                                                    ?.message
                                            }
                                            helperText={errors.geographyIsolationSite?.message}
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
                                            error={
                                                !!errors.geographyCoordinates
                                                    ?.message
                                            }
                                            helperText={errors.geographyCoordinates?.message}
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
                                            error={
                                                !!errors.geographyIsolationSource
                                                    ?.message
                                            }
                                            helperText={errors.geographyIsolationSource?.message}
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
                                            error={
                                                !!errors.geographyAltitude
                                                    ?.message
                                            }
                                            helperText={errors.geographyAltitude?.message}
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
                                            error={
                                                !!errors.geographyComments
                                                    ?.message
                                            }
                                            helperText={errors.geographyComments?.message}
                                        />
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
                                            error={
                                                !!errors.isolationMedium
                                                    ?.message
                                            }
                                            helperText={errors.isolationMedium?.message}
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
                                            error={
                                                !!errors.isolationTemperature
                                                    ?.message
                                            }
                                            helperText={errors.isolationTemperature?.message}
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
                                            error={
                                                !!errors.isolationMethod
                                                    ?.message
                                            }
                                            helperText={errors.isolationMethod?.message}
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
                                            Person who isolated it
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
                                            error={
                                                !!errors.isolationResponsible
                                                    ?.message
                                            }
                                            helperText={errors.isolationResponsible?.message}
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
                                            error={
                                                !!errors.isolationThesisPaper
                                                    ?.message
                                            }
                                            helperText={errors.isolationThesisPaper?.message}
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
                                            error={
                                                !!errors.isolationThesisPaperLink
                                                    ?.message
                                            }
                                            helperText={errors.isolationThesisPaperLink?.message}
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
                                            error={
                                                !!errors.isolationComments
                                                    ?.message
                                            }
                                            helperText={errors.isolationComments?.message}
                                        />
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
                        <Typography>16S rRNA</Typography>
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.arnr16sCompleteness?.message}
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
                                            Size (bp)
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
                                            error={
                                                !!errors.arnr16sSize
                                                    ?.message
                                            }
                                            helperText={errors.arnr16sSize?.message}
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
                                            error={
                                                !!errors.arnr16sSequenceFile
                                                    ?.message
                                            }
                                            helperText={errors.arnr16sSequenceFile?.message}
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
                                            error={
                                                !!errors.arnr16sMacrogenFile
                                                    ?.message
                                            }
                                            helperText={errors.arnr16sMacrogenFile?.message}
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
                                            error={
                                                !!errors.arnr16sComments
                                                    ?.message
                                            }
                                            helperText={errors.arnr16sComments?.message}
                                        />
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
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.characterizationGrowingMedia
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.characterizationGrowingMedia?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
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
                                            Not growing media
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="characterizationNotGrowingMedia"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = characterizationNotGrowingMediaAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.characterizationNotGrowingMedia
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.characterizationNotGrowingMedia?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.characterizationMycelial?.message}
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
                                            error={
                                                !!errors.characterizationColoniesDay
                                                    ?.message
                                            }
                                            helperText={errors.characterizationColoniesDay?.message}
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
                                            error={
                                                !!errors.characterizationSporulationDay
                                                    ?.message
                                            }
                                            helperText={errors.characterizationSporulationDay?.message}
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
                                            error={
                                                !!errors.characterizationBiomassDay
                                                    ?.message
                                            }
                                            helperText={errors.characterizationBiomassDay?.message}
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.characterizationShape?.message}
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.characterizationBorder?.message}
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.characterizationElevation?.message}
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.characterizationSurface?.message}
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
                                            error={
                                                !!errors.characterizationColor
                                                    ?.message
                                            }
                                            helperText={errors.characterizationColor?.message}
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.characterizationTransparency?.message}
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
                                                                    ?.message
                                                            }
                                                            helperText={errors.characterizationBrightness?.message}
                                                        />
                                                    )}
                                                />
                                            )}
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
                                            error={
                                                !!errors.characterizationComments
                                                    ?.message
                                            }
                                            helperText={errors.characterizationComments?.message}
                                        />
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
                                            error={
                                                !!errors.genomeRawData
                                                    ?.message
                                            }
                                            helperText={errors.genomeRawData?.message}
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
                                            error={
                                                !!errors.genomeComments
                                                    ?.message
                                            }
                                            helperText={errors.genomeComments?.message}
                                        />
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
                                            error={
                                                !!errors.bioactivityFile
                                                    ?.message
                                            }
                                            helperText={errors.bioactivityFile?.message}
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
                                            Yes
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="bioactivityYes"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = typeStrainYesAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.bioactivityYes
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.bioactivityYes?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
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
                                            No
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="bioactivityNo"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = typeStrainNoAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.bioactivityNo
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.bioactivityNo?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
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
                                            Na
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="bioactivityNa"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = typeStrainNaAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.bioactivityNa
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.bioactivityNa?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
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
                                            error={
                                                !!errors.bioactivityComments
                                                    ?.message
                                            }
                                            helperText={errors.bioactivityComments?.message}
                                        />
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
                                            Fundación Medina reports link
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
                                            error={
                                                !!errors.metabolomicsMedinaFoundationReports
                                                    ?.message
                                            }
                                            helperText={errors.metabolomicsMedinaFoundationReports?.message}
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
                                            error={
                                                !!errors.metabolomicsRawData
                                                    ?.message
                                            }
                                            helperText={errors.metabolomicsRawData?.message}
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
                                            error={
                                                !!errors.metabolomicsComments
                                                    ?.message
                                            }
                                            helperText={errors.metabolomicsComments?.message}
                                        />
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
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.enzymesYes
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.enzymesYes?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
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
                                            No
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="enzymesNo"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = enzymesNoAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.enzymesNo
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.enzymesNo?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
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
                                            Na
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="enzymesNa"
                                            defaultValue={[]}
                                            render={({ field }) => {
                                                const newValue = enzymesNaAutocompleteProps.options.filter(
                                                    (p) =>
                                                        field.value?.find((v) => v === p?._id) !==
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
                                                            const newValue = value.map((p) => p?._id.toString());
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
                                                                    error={
                                                                        !!errors.enzymesNa
                                                                            ?.message
                                                                    }
                                                                    helperText={errors.enzymesNa?.message}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                );
                                            }}
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
                                            error={
                                                !!errors.enzymesComments
                                                    ?.message
                                            }
                                            helperText={errors.enzymesComments?.message}
                                        />
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </form>
        </Create>
    )
}

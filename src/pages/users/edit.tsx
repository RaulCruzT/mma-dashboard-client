import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource"
import { useForm } from "@refinedev/react-hook-form";
import { IUser } from "../../interfaces/user";
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { Autocomplete, FormControl, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";


export const UsersEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        register,
        control,
        refineCore: { formLoading },
        formState: { errors },
        saveButtonProps,
    } = useForm<IUser, HttpError, IUser>({
        refineCoreProps: {
            successNotification: () => {
                return {
                    message: 'Successfully updated user',
                    type: "success",
                };
            },
            errorNotification: () => {
                return {
                    message: 'Error updating an user',
                    type: "error",
                }
            }
        }
    });

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps} title={<Typography variant="h5">Edit User</Typography>}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
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
                                    Name
                                </FormLabel>
                                <TextField
                                    {...register("name", {
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
                                    error={
                                        !!errors.name
                                            ?.message
                                    }
                                    helperText={errors.name?.message}
                                />
                            </FormControl>
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
                                    Email
                                </FormLabel>
                                <TextField
                                    {...register("email", {
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
                                    error={
                                        !!errors.email
                                            ?.message
                                    }
                                    helperText={errors.email?.message}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Role
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="role"
                                    rules={{
                                        required: "required",
                                    }}
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
                                                "user",
                                                "manager",
                                                "admin",
                                            ]}
                                            renderInput={(
                                                params,
                                            ) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    error={
                                                        !!errors.role
                                                            ?.message
                                                    }
                                                    helperText={errors.role?.message}
                                                    required
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Edit>
    )
}

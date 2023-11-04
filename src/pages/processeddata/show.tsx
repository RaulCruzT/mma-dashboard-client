import {
    IResourceComponentsProps,
    useShow
} from "@refinedev/core";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Show } from "@refinedev/mui";
import { IProcessedData } from "../../interfaces/processeddata";

export const ProcessedDataShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IProcessedData>({
        errorNotification: () => {
            return {
                message: 'Error getting processed data data',
                type: "error",
            };
        },
    });

    return (
        <Show title={<Typography variant="h5">Show Processed data</Typography>}>
            <Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Actinobacteria</TableCell>
                                <TableCell align="right">{queryResult.data?.data.actinobacteria.identifierStrain}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Data source</TableCell>
                                <TableCell align="right">{queryResult.data?.data.dataSource}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Equipment</TableCell>
                                <TableCell align="right">{queryResult.data?.data.equipment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>File name</TableCell>
                                <TableCell align="right">{queryResult.data?.data.fileName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Mass detection</TableCell>
                                <TableCell align="right">{queryResult.data?.data.massDetection}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Chromatogram builder</TableCell>
                                <TableCell align="right">{queryResult.data?.data.chromatogramBuilder}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Deconvolution</TableCell>
                                <TableCell align="right">{queryResult.data?.data.deconvolution}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Isotope</TableCell>
                                <TableCell align="right">{queryResult.data?.data.isotope}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Filtered</TableCell>
                                <TableCell align="right">{queryResult.data?.data.filtered}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Identification</TableCell>
                                <TableCell align="right">{queryResult.data?.data.identification}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Alignment</TableCell>
                                <TableCell align="right">{queryResult.data?.data.alignment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Gap filling</TableCell>
                                <TableCell align="right">{queryResult.data?.data.gapFilling}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>MassIVE ID</TableCell>
                                <TableCell align="right">{queryResult.data?.data.massIVEID}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Processed data link</TableCell>
                                <TableCell align="right" sx={{display: "flex", justifyContent: "flex-start"}}>{queryResult.data?.data.link}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Comments</TableCell>
                                <TableCell align="right">{queryResult.data?.data.comments}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Show>
    )
}

import {
    IResourceComponentsProps,
    useShow
} from "@refinedev/core";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Show } from "@refinedev/mui";
import { IAssembly } from "../../interfaces/assembly";
import { LinkButton } from "../../components";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const AssemblyShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IAssembly>({
        errorNotification: () => {
            return {
                message: 'Error getting processed data data',
                type: "error",
            };
        },
    });
    return (
        <Show title={<Typography variant="h5">Show Assembly</Typography>}>
            <Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Actinobacteria</TableCell>
                                <TableCell align="right">{queryResult.data?.data.actinobacteria.identifierStrain}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Sequencing technology</TableCell>
                                <TableCell align="right">{queryResult.data?.data.sequencingTechnology}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Date</TableCell>
                                <TableCell align="right">{queryResult.data?.data.date ? dayjs.utc(queryResult.data?.data.date).format('DD/MM/YYYY') : null}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Software trimming</TableCell>
                                <TableCell align="right">{queryResult.data?.data.softwareTrimming}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Software assemby</TableCell>
                                <TableCell align="right">{queryResult.data?.data.softwareAssembly}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Parameters assembly</TableCell>
                                <TableCell align="right">{queryResult.data?.data.parametersAssembly}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Quality final</TableCell>
                                <TableCell align="right">{queryResult.data?.data.qualityFinal}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>BGCs link</TableCell>
                                <TableCell align="right" sx={{display: "flex", justifyContent: "flex-start"}}><LinkButton href={queryResult?.data?.data.bgcs} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Assembly link</TableCell>
                                <TableCell align="right" sx={{display: "flex", justifyContent: "flex-start"}}><LinkButton href={queryResult?.data?.data.link} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Accession number</TableCell>
                                <TableCell align="right">{queryResult.data?.data.accessionNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700, verticalAlign: 'top'}}>Paper</TableCell>
                                <TableCell align="right">{queryResult.data?.data.paper}</TableCell>
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

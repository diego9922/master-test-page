import { memo } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Skeleton,
    Stack
} from "@mui/material"
import { GitHub as GitHubIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useQuery } from '@tanstack/react-query';
import { getRepositoriesByUser } from "../utils/requesters/gitHubRequester";

const GitHubTableLoagind = memo(()=>{
    return <Stack>
        <Skeleton variant="rounded" height={300}/>
    </Stack>;
});

const GitHubTable = ()=>{
    const { t } = useTranslation();
    const { isPending, error, data } = useQuery({
        queryKey: ['github-user-repos'],
        queryFn: () => getRepositoriesByUser(process.env.REACT_APP_GIT_HUB_DEFAULT_USER_TO_SEARCH, "stars")
    });

    if (isPending){
        return <GitHubTableLoagind/>;
    }

    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow sx={{ '.MuiTableCell-root': { px: 0.3 } }}>
                    <TableCell>
                        <Typography align="center" variant="subtitle1" sx={{ textTransform: "capitalize" }}>{t("id")}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography align="center" variant="subtitle1" sx={{ textTransform: "capitalize" }}>{t("name")}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography align="center" variant="subtitle1" sx={{ textTransform: "capitalize" }}>{t("description")}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography align="center" variant="subtitle1" sx={{ textTransform: "capitalize" }}>{t("stars")}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography align="center" variant="subtitle1" sx={{ textTransform: "capitalize" }}>{t("open")}</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.items.map(repository=><TableRow key={repository.id}>
                    <TableCell>{repository.id}</TableCell>
                    <TableCell>{repository.name}</TableCell>
                    <TableCell>{repository.description}</TableCell>
                    <TableCell>{repository.stargazers_count}</TableCell>
                    <TableCell>
                        <IconButton onClick={()=>{
                            window.open(repository.html_url, "_blank");
                        }}>
                            <OpenInNewIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
};

const GitHubList = ()=>{
    const { t } = useTranslation();

    return <Card>
        <CardHeader
            avatar={
                <GitHubIcon color="primary" fontSize="large"/>
            }
            title={
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                    {t("git-hub-request")}
                </Typography>
            }
            subheader={
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                    {t("git-hub-request-description")}
                </Typography>
            }
        />
        <CardContent>
            <GitHubTable/>
        </CardContent>
    </Card>;
};

export default GitHubList;
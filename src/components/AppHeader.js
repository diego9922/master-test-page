import { useState } from 'react';
import {
    AppBar as MuiAppBar,
    Container,
    Toolbar,
    Box,
    Typography,
    Tooltip,
    IconButton,
    Avatar,
    Popover,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    CssBaseline
} from '@mui/material';
import { 
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
    GTranslate as GTranslateIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `100%`,
        // marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Main = styled('main')(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }),
    //   marginLeft: `-${drawerWidth}px`,
          ...(open && {
          transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
      }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'end',
}));

const AppHeader = ({children})=>{
    const { t, i18n } = useTranslation();
    const [usedTheme, setUsedTheme] = useState('light');
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleChangeThemeColor = () =>{
        const newColor = (usedTheme == 'light') ? 'dark' : 'light';
        setUsedTheme(newColor);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const selectedTheme = createTheme({
        palette: {
            mode: usedTheme,
        },
    });

    return <ThemeProvider theme={selectedTheme}>
        <Box>
            <CssBaseline/>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow:1 }}>
                            <Typography 
                                variant="h6" 
                                noWrap 
                                component="div"
                                sx={{
                                    display: {md: 'flex'}
                                }}
                                >
                                    {t("test")}
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={t("settings")}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <SettingsIcon/>
                                </IconButton>
                            </Tooltip>
                            <Popover 
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                anchorEl={anchorElUser}
                            >
                                <Card>
                                    <CardContent sx={{ width: 350, py: 0 }}>
                                        <MenuList sx={{ pb: 0 }}>
                                            <MenuItem onClick={()=>{ i18n.changeLanguage((i18n.language == "en") ? "es" : "en") }}>
                                                <ListItemIcon>
                                                    <GTranslateIcon fontSize="small"/>
                                                </ListItemIcon>
                                                <ListItemText sx={{ textTransform: "capitalize" }}>{t("change-language")}</ListItemText>
                                                <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                                                    {i18n.language}
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleChangeThemeColor} sx={{ pb: 0 }}>
                                                <ListItemIcon>
                                                    {usedTheme === 'dark' ? <Brightness7Icon fontSize="small"/> : <Brightness4Icon fontSize="small"/>}
                                                </ListItemIcon>
                                                <ListItemText sx={{ textTransform: "capitalize" }}>{t("theme")}</ListItemText>
                                                <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                                                    {usedTheme}
                                                </Typography>
                                            </MenuItem>
                                        </MenuList>
                                    </CardContent>
                                </Card>
                            </Popover>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Main>
                <DrawerHeader/>
                {children}
            </Main>
        </Box>
    </ThemeProvider>;
};

export default AppHeader;
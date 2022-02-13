import * as React from 'react';
import {
    Grid,
    AppBar,
    Container,
    Typography,
    Toolbar,
} from "@mui/material";

const SiteWrapper = ({children}) => {
    console.log(window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)))
    return (<Grid container>
        {window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)) !== "" && <Grid item xs={12}>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        >
                            LOGO
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </Grid>}
        <Grid item xs={12}>
            {children}
        </Grid>
    </Grid>);
};

export default SiteWrapper;
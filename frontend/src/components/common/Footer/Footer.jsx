import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import Logo from '../../../assets/logo.png'
import '../../../colors.css';

export default function Footer() {
    return (
        <Box
            component="footer"
            className='lgray'
            sx={{ paddingTop: '10em', paddingLeft: '2em' }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <img src={Logo} alt='Project Chess' style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" className=".offwhiteText">
                            123 Main Street, Anytown, USA
                        </Typography>
                        <Typography variant="body2" className=".offwhiteText">
                            Email: info@example.com
                        </Typography>
                        <Typography variant="body2" className=".offwhiteText">
                            Phone: +1 234 567 8901
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Twitter />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" className=".offwhiteText" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://your-website.com/">
                            Project Chess
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
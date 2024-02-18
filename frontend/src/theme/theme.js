import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: "#ffffff",
            main: "#81B64C",
            dark: "#ffffff",
            contrastText: "#ffffff"
        },

        background: {
            paper: '#373634',
        },
    },
});

//-------custom theme example
// const customTheme = createTheme({
//     palette: {
//       primary: {
//         light: "#112233",
//         main: "#445566",
//         dark: "#778899",
//         contrastText: "#fff"
//       },
//       secondary: {
//         light: "#f0e6e6",
//         main: "#c93434",
//         dark: "#3c3c3c",
//         contrastText: "#000"
//       }
//     }
//   });

export default theme;
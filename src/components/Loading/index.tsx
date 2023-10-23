import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                margin: "15% 0",
            }}
        >
            <CircularProgress />
        </Box>
    );
}

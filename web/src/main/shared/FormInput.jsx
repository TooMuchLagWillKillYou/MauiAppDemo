import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormInput(props) {

  return (
      <Box>
        <TextField
            id={props.name}
            label={props.label}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            slotProps={props.slotProps}
            sx={props.sx}
            error={props.errorMessage?.length}
            helperText={props.errorMessage}
        />
      </Box>
  )
}

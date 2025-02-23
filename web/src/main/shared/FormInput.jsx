import TextField from "@mui/material/TextField";

export default function FormInput({name, label, type, value, onChange, slotProps, sx, errorMessage}) {

  return (
        <TextField
            id={name}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            slotProps={slotProps}
            sx={sx}
            error={errorMessage?.length}
            helperText={errorMessage}
            size="small"
        />
  )
}

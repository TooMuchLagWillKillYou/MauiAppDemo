import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText } from "@mui/joy";
import { TimeField } from "@mui/x-date-pickers";

export default function FormTimeInput({ label, format, name, value, onChange, slotProps, errorMessage, sx }) {
  return (
    <FormControl error={errorMessage && errorMessage.length} sx={sx}>
      <TimeField
          label={label}
        format={format}
        name={name}
        value={value}
        onChange={onChange}
        sx={sx}
        slotProps={slotProps}
          size="small"
          //TODO: disablePast
      />
      {errorMessage && (
        <FormHelperText>
          <InfoOutlined />
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { TimeField } from "@mui/x-date-pickers";

export default function FormTimeInput(props) {
  const { errorMessage, label, format, name, onChange, sx, slotProps, value } =
    props;

  return (
    <FormControl error={errorMessage && errorMessage.length} sx={sx}>
      <FormLabel>{label}</FormLabel>
      <TimeField
        format={format}
        name={name}
        value={value}
        onChange={onChange}
        sx={sx}
        slotProps={slotProps}
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

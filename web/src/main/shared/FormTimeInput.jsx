import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { TimePicker } from "@mui/x-date-pickers";

export default function FormTimeInput(props) {
  const { errorMessage, label, format, name, onChange, sx, slotProps, value } =
    props;

  return (
    <FormControl error={errorMessage && errorMessage.length} sx={sx}>
      <FormLabel>{label}</FormLabel>
      <TimePicker
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

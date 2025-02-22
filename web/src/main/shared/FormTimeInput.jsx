import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { TimeField } from "@mui/x-date-pickers";

export default function FormTimeInput(props) {
  const { errorMessage, label, format, name, onChange, sx, slotProps, value } =
    props;

  return (
    <FormControl error={errorMessage && errorMessage.length} sx={sx}>
      <TimeField
          label={props.label}
        format={props.format}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        sx={props.sx}
        slotProps={props.slotProps}
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

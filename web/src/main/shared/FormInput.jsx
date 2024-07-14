import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";

export default function FormInput(props) {
  const {
    errorMessage,
    label,
    name,
    type,
    defaultValue,
    onChange,
    sx,
    slotProps,
  } = props;

  return (
    <FormControl
      error={errorMessage != null && errorMessage.length > 0}
      sx={sx}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        sx={sx}
        variant="outlined"
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

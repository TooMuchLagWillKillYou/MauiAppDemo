import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";

export default function FormInput(props) {
  const { errorMessage, label, name, type, onChange, sx, slotProps, value } =
    props;

  return (
    <FormControl
      error={errorMessage != null && errorMessage.length > 0}
      sx={sx}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={type}
        onChange={onChange}
        value={value}
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

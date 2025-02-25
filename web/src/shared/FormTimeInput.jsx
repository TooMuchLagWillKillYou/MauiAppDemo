import { TimeField } from "@mui/x-date-pickers";

export default function FormTimeInput({
  label,
  format,
  name,
  value,
  onChange,
  slotProps,
  sx,
}) {
  return (
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
  );
}

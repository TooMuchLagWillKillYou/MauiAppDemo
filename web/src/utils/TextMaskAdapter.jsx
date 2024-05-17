import * as React from "react";
import { IMaskInput } from "react-imask";

export const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00:00"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { id: props.id, value } })}
      overwrite
    />
  );
});

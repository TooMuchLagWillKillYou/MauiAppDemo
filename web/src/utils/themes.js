// import { outlinedInputClasses } from "@mui/material";
import { extendTheme as materialExtendTheme } from "@mui/material/styles";

// https://mui.com/material-ui/customization/how-to-customize/
// I'll leave this as an example in case I need it in the future
export const materialTheme = materialExtendTheme({
  // components: {
  //   MuiTimePicker: {
  //     defaultProps: {
  //       slotProps: {
  //         textField: {
  //           sx: {
  //             [`.${outlinedInputClasses.root}`]: {
  //               backgroundColor: "var(--joy-palette-background-surface)",
  //               color:
  //                 "color: var(--variant-outlinedColor, var(--joy-palette-neutral-outlinedColor, var(--joy-palette-neutral-700, #32383E)));",
  //             },
  //             [`.${outlinedInputClasses.notchedOutline}`]: {
  //               borderColor:
  //                 "var(--variant-outlinedBorder, var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1)));",
  //               boxShadow:
  //                 "var(--joy-shadowRing, 0 0 #000),0px 1px 2px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))",
  //               borderRadius: "var(--joy-radius-sm)",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
});

import {
  useButton,
  useSlot
} from "./chunk-JOAIAL5Q.js";
import {
  styled_default,
  useThemeProps
} from "./chunk-TQQ2ZAVS.js";
import {
  capitalize,
  composeClasses,
  generateUtilityClass2 as generateUtilityClass,
  generateUtilityClasses2 as generateUtilityClasses,
  useForkRef
} from "./chunk-BU3PPHQO.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  clsx_default,
  init_clsx,
  init_extends,
  init_objectWithoutPropertiesLoose,
  require_jsx_runtime,
  require_prop_types
} from "./chunk-O34IQWEA.js";
import {
  __toESM,
  require_react
} from "./chunk-O2F6JIHC.js";

// node_modules/@mui/joy/ListItemButton/ListItemButton.js
init_objectWithoutPropertiesLoose();
init_extends();
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();

// node_modules/@mui/joy/ListItem/listItemClasses.js
function getListItemUtilityClass(slot) {
  return generateUtilityClass("MuiListItem", slot);
}
var listItemClasses = generateUtilityClasses("MuiListItem", ["root", "startAction", "endAction", "nested", "nesting", "sticky", "colorPrimary", "colorNeutral", "colorDanger", "colorSuccess", "colorWarning", "colorContext", "variantPlain", "variantSoft", "variantOutlined", "variantSolid"]);
var listItemClasses_default = listItemClasses;

// node_modules/@mui/joy/ListItemButton/listItemButtonClasses.js
function getListItemButtonUtilityClass(slot) {
  return generateUtilityClass("MuiListItemButton", slot);
}
var listItemButtonClasses = generateUtilityClasses("MuiListItemButton", ["root", "horizontal", "vertical", "colorPrimary", "colorNeutral", "colorDanger", "colorSuccess", "colorWarning", "colorContext", "focusVisible", "disabled", "selected", "variantPlain", "variantSoft", "variantOutlined", "variantSolid"]);
var listItemButtonClasses_default = listItemButtonClasses;

// node_modules/@mui/joy/ListItemButton/ListItemButtonOrientationContext.js
var React = __toESM(require_react());
var ListItemButtonOrientationContext = React.createContext("horizontal");
if (true) {
  ListItemButtonOrientationContext.displayName = "ListItemButtonOrientationContext";
}
var ListItemButtonOrientationContext_default = ListItemButtonOrientationContext;

// node_modules/@mui/joy/List/RowListContext.js
var React2 = __toESM(require_react());
var RowListContext = React2.createContext(false);
if (true) {
  RowListContext.displayName = "RowListContext";
}
var RowListContext_default = RowListContext;

// node_modules/@mui/joy/ListItemButton/ListItemButton.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className", "action", "component", "orientation", "role", "selected", "color", "variant", "slots", "slotProps"];
var useUtilityClasses = (ownerState) => {
  const {
    color,
    disabled,
    focusVisible,
    focusVisibleClassName,
    selected,
    variant
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", color && `color${capitalize(color)}`, selected && "selected", variant && `variant${capitalize(variant)}`]
  };
  const composedClasses = composeClasses(slots, getListItemButtonUtilityClass, {});
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
var StyledListItemButton = styled_default("div")(({
  theme,
  ownerState
}) => {
  var _a, _b, _c, _d, _e, _f;
  return _extends({
    "--Icon-margin": "initial",
    // reset the icon's margin.
    "--Icon-color": ownerState.color !== "neutral" || ownerState.variant === "solid" ? "currentColor" : theme.vars.palette.text.icon,
    WebkitTapHighlightColor: "transparent",
    boxSizing: "border-box",
    position: "relative",
    font: "inherit",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    // always stretch itself to fill the parent (List|ListItem)
    gap: "var(--ListItem-gap)"
  }, ownerState.orientation === "vertical" && {
    flexDirection: "column",
    justifyContent: "center"
  }, {
    textAlign: "initial",
    textDecoration: "initial",
    // reset native anchor tag
    backgroundColor: "initial",
    // reset button background
    cursor: "pointer",
    // In some cases, ListItemButton is a child of ListItem so the margin needs to be controlled by the ListItem. The value is negative to account for the ListItem's padding
    marginInline: "var(--ListItemButton-marginInline)",
    marginBlock: "var(--ListItemButton-marginBlock)"
  }, ownerState["data-first-child"] === void 0 && {
    marginInlineStart: ownerState.row ? "var(--List-gap)" : void 0,
    marginBlockStart: ownerState.row ? void 0 : "var(--List-gap)"
  }, {
    // account for the border width, so that all of the ListItemButtons content aligned horizontally
    paddingBlock: "calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px))",
    // account for the border width, so that all of the ListItemButtons content aligned vertically
    paddingInlineStart: "calc(var(--ListItem-paddingLeft) + var(--ListItem-startActionWidth, var(--unstable_startActionWidth, 0px)))",
    // --internal variable makes it possible to customize the actionWidth from the top List
    paddingInlineEnd: "calc(var(--ListItem-paddingRight) + var(--ListItem-endActionWidth, var(--unstable_endActionWidth, 0px)))",
    // --internal variable makes it possible to customize the actionWidth from the top List
    minBlockSize: "var(--ListItem-minHeight)",
    border: "1px solid transparent",
    // use `transparent` as a placeholder to prevent the button from jumping when switching to `outlined` variant
    borderRadius: "var(--ListItem-radius)",
    flex: "var(--unstable_ListItem-flex, none)",
    // prevent children from shrinking when the List's height is limited.
    fontSize: "inherit",
    // prevent user agent style when component="button"
    lineHeight: "inherit",
    // prevent user agent style when component="button"
    minInlineSize: 0,
    [theme.focus.selector]: _extends({}, theme.focus.default, {
      zIndex: 1
      // to be above of the next element. For example, the first Tab item should be above the second so that the outline is above the second Tab.
    })
  }, (_a = theme.variants[ownerState.variant]) == null ? void 0 : _a[ownerState.color], {
    "&:active": (_b = theme.variants[`${ownerState.variant}Active`]) == null ? void 0 : _b[ownerState.color],
    [`.${listItemClasses_default.root} > &`]: {
      "--unstable_ListItem-flex": "1 0 0%"
      // grow to fill the available space of ListItem
    },
    [`&.${listItemButtonClasses_default.selected}`]: _extends({}, (_c = theme.variants[`${ownerState.variant}Active`]) == null ? void 0 : _c[ownerState.color], {
      "--Icon-color": "currentColor"
    }),
    [`&:not(.${listItemButtonClasses_default.selected}, [aria-selected="true"])`]: {
      "&:hover": (_d = theme.variants[`${ownerState.variant}Hover`]) == null ? void 0 : _d[ownerState.color],
      "&:active": (_e = theme.variants[`${ownerState.variant}Active`]) == null ? void 0 : _e[ownerState.color]
    },
    [`&.${listItemButtonClasses_default.disabled}`]: _extends({}, (_f = theme.variants[`${ownerState.variant}Disabled`]) == null ? void 0 : _f[ownerState.color])
  });
});
var ListItemButtonRoot = styled_default(StyledListItemButton, {
  name: "JoyListItemButton",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(({
  ownerState,
  theme
}) => _extends({}, !ownerState.row && {
  [`&.${listItemButtonClasses_default.selected}`]: {
    fontWeight: theme.vars.fontWeight.md
  }
}));
var ListItemButton = React3.forwardRef(function ListItemButton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "JoyListItemButton"
  });
  const row = React3.useContext(RowListContext_default);
  const {
    children,
    className,
    action,
    component = "div",
    orientation = "horizontal",
    role,
    selected = false,
    color = "neutral",
    variant = "plain",
    slots = {},
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const buttonRef = React3.useRef(null);
  const handleRef = useForkRef(buttonRef, ref);
  const {
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    rootRef: handleRef
  }));
  React3.useImperativeHandle(action, () => ({
    focusVisible: () => {
      var _a;
      setFocusVisible(true);
      (_a = buttonRef.current) == null ? void 0 : _a.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    component,
    color,
    focusVisible,
    orientation,
    row,
    selected,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = _extends({}, other, {
    component,
    slots,
    slotProps
  });
  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: clsx_default(classes.root, className),
    elementType: ListItemButtonRoot,
    externalForwardedProps,
    ownerState,
    getSlotProps: getRootProps
  });
  return (0, import_jsx_runtime.jsx)(ListItemButtonOrientationContext_default.Provider, {
    value: orientation,
    children: (0, import_jsx_runtime.jsx)(SlotRoot, _extends({}, rootProps, {
      role: role ?? rootProps.role,
      children
    }))
  });
});
true ? ListItemButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({
    current: import_prop_types.default.shape({
      focusVisible: import_prop_types.default.func.isRequired
    })
  })]),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: import_prop_types.default.bool,
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["danger", "neutral", "primary", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: import_prop_types.default.string,
  /**
   * The content direction flow.
   * @default 'horizontal'
   */
  orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
  /**
   * @ignore
   */
  role: import_prop_types.default.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: import_prop_types.default.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    root: import_prop_types.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * @default 0
   */
  tabIndex: import_prop_types.default.number,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["outlined", "plain", "soft", "solid"]), import_prop_types.default.string])
} : void 0;
var ListItemButton_default = ListItemButton;

export {
  getListItemUtilityClass,
  listItemClasses_default,
  getListItemButtonUtilityClass,
  listItemButtonClasses_default,
  ListItemButtonOrientationContext_default,
  RowListContext_default,
  StyledListItemButton,
  ListItemButton_default
};
//# sourceMappingURL=chunk-LN3PE63S.js.map

import {
  ThemeProvider_default,
  createCssVarsProvider,
  createStyled,
  defaultTheme_default,
  extendTheme,
  identifier_default,
  useThemeProps,
  useTheme_default
} from "./chunk-BU3PPHQO.js";
import {
  _extends,
  init_extends,
  require_jsx_runtime
} from "./chunk-O34IQWEA.js";
import {
  __toESM,
  require_react
} from "./chunk-O2F6JIHC.js";

// node_modules/@mui/joy/styles/CssVarsProvider.js
var {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript
} = createCssVarsProvider({
  themeId: identifier_default,
  theme: defaultTheme_default,
  attribute: "data-joy-color-scheme",
  modeStorageKey: "joy-mode",
  colorSchemeStorageKey: "joy-color-scheme",
  defaultColorScheme: {
    light: "light",
    dark: "dark"
  }
});

// node_modules/@mui/joy/styles/styled.js
var styled = createStyled({
  defaultTheme: defaultTheme_default,
  themeId: identifier_default
});
var styled_default = styled;

// node_modules/@mui/joy/styles/ThemeProvider.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useTheme = () => {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
};
function ThemeProvider({
  children,
  theme: themeInput
}) {
  let theme = defaultTheme_default;
  if (themeInput) {
    theme = extendTheme(identifier_default in themeInput ? themeInput[identifier_default] : themeInput);
  }
  return (0, import_jsx_runtime.jsx)(ThemeProvider_default, {
    theme,
    themeId: themeInput && identifier_default in themeInput ? identifier_default : void 0,
    children
  });
}

// node_modules/@mui/joy/styles/useThemeProps.js
init_extends();
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: _extends({}, defaultTheme_default, {
      components: {}
    }),
    themeId: identifier_default
  });
}

export {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript,
  styled_default,
  useTheme,
  ThemeProvider,
  useThemeProps2 as useThemeProps
};
//# sourceMappingURL=chunk-TQQ2ZAVS.js.map

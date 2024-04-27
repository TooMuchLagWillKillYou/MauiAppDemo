import {
  useForkRef,
  useIsFocusVisible
} from "./chunk-BU3PPHQO.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  clsx_default,
  init_clsx,
  init_extends,
  init_objectWithoutPropertiesLoose,
  require_jsx_runtime
} from "./chunk-O34IQWEA.js";
import {
  __toESM,
  require_react
} from "./chunk-O2F6JIHC.js";

// node_modules/@mui/base/useButton/useButton.js
init_extends();
var React2 = __toESM(require_react());

// node_modules/@mui/base/utils/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/base/utils/useRootElementName.js
var React = __toESM(require_react());
function useRootElementName(parameters) {
  const {
    rootElementName: rootElementNameProp = "",
    componentName
  } = parameters;
  const [rootElementName, setRootElementName] = React.useState(rootElementNameProp.toUpperCase());
  if (true) {
    React.useEffect(() => {
      if (rootElementNameProp && rootElementName !== rootElementNameProp.toUpperCase()) {
        console.error(`useRootElementName: the \`rootElementName\` prop of ${componentName ? `the ${componentName} component` : "a component"} expected the '${rootElementNameProp}' element, but a '${rootElementName.toLowerCase()}' was rendered instead`, "This may cause hydration issues in an SSR context, for example in a Next.js app");
      }
    }, [rootElementNameProp, rootElementName, componentName]);
  }
  const updateRootElementName = React.useCallback((instance) => {
    setRootElementName((instance == null ? void 0 : instance.tagName) ?? "");
  }, []);
  return [rootElementName, updateRootElementName];
}

// node_modules/@mui/base/useButton/useButton.js
function useButton(parameters = {}) {
  const {
    disabled = false,
    focusableWhenDisabled,
    href,
    rootRef: externalRef,
    tabIndex,
    to,
    type,
    rootElementName: rootElementNameProp
  } = parameters;
  const buttonRef = React2.useRef();
  const [active, setActive] = React2.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React2.useState(false);
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React2.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const [rootElementName, updateRootElementName] = useRootElementName({
    rootElementName: rootElementNameProp ?? (href || to ? "a" : void 0),
    componentName: "Button"
  });
  const createHandleMouseLeave = (otherHandlers) => (event) => {
    var _a;
    if (focusVisible) {
      event.preventDefault();
    }
    (_a = otherHandlers.onMouseLeave) == null ? void 0 : _a.call(otherHandlers, event);
  };
  const createHandleBlur = (otherHandlers) => (event) => {
    var _a;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_a = otherHandlers.onBlur) == null ? void 0 : _a.call(otherHandlers, event);
  };
  const createHandleFocus = (otherHandlers) => (event) => {
    var _a, _b;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      (_a = otherHandlers.onFocusVisible) == null ? void 0 : _a.call(otherHandlers, event);
    }
    (_b = otherHandlers.onFocus) == null ? void 0 : _b.call(otherHandlers, event);
  };
  const isNativeButton = () => {
    const button = buttonRef.current;
    return rootElementName === "BUTTON" || rootElementName === "INPUT" && ["button", "submit", "reset"].includes(button == null ? void 0 : button.type) || rootElementName === "A" && (button == null ? void 0 : button.href);
  };
  const createHandleClick = (otherHandlers) => (event) => {
    var _a;
    if (!disabled) {
      (_a = otherHandlers.onClick) == null ? void 0 : _a.call(otherHandlers, event);
    }
  };
  const createHandleMouseDown = (otherHandlers) => (event) => {
    var _a;
    if (!disabled) {
      setActive(true);
      document.addEventListener("mouseup", () => {
        setActive(false);
      }, {
        once: true
      });
    }
    (_a = otherHandlers.onMouseDown) == null ? void 0 : _a.call(otherHandlers, event);
  };
  const createHandleKeyDown = (otherHandlers) => (event) => {
    var _a, _b;
    (_a = otherHandlers.onKeyDown) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    if (event.target === event.currentTarget && !isNativeButton() && event.key === "Enter" && !disabled) {
      (_b = otherHandlers.onClick) == null ? void 0 : _b.call(otherHandlers, event);
      event.preventDefault();
    }
  };
  const createHandleKeyUp = (otherHandlers) => (event) => {
    var _a, _b;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_a = otherHandlers.onKeyUp) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === " " && !event.defaultMuiPrevented) {
      (_b = otherHandlers.onClick) == null ? void 0 : _b.call(otherHandlers, event);
    }
  };
  const handleRef = useForkRef(updateRootElementName, externalRef, focusVisibleRef, buttonRef);
  const buttonProps = {};
  if (tabIndex !== void 0) {
    buttonProps.tabIndex = tabIndex;
  }
  if (rootElementName === "BUTTON") {
    buttonProps.type = type ?? "button";
    if (focusableWhenDisabled) {
      buttonProps["aria-disabled"] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (rootElementName === "INPUT") {
    if (type && ["button", "submit", "reset"].includes(type)) {
      if (focusableWhenDisabled) {
        buttonProps["aria-disabled"] = disabled;
      } else {
        buttonProps.disabled = disabled;
      }
    }
  } else if (rootElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex ?? 0;
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex ?? 0 : -1;
    }
  }
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = _extends({}, extractEventHandlers(parameters), extractEventHandlers(externalProps));
    const props = _extends({
      type
    }, externalEventHandlers, buttonProps, externalProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      ref: handleRef
    });
    delete props.onFocusVisible;
    return props;
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    active,
    rootRef: handleRef
  };
}

// node_modules/@mui/base/utils/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}

// node_modules/@mui/base/utils/useSlotProps.js
init_extends();
init_objectWithoutPropertiesLoose();

// node_modules/@mui/base/utils/appendOwnerState.js
init_extends();
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}

// node_modules/@mui/base/utils/mergeSlotProps.js
init_extends();
init_clsx();

// node_modules/@mui/base/utils/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}

// node_modules/@mui/base/utils/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}

// node_modules/@mui/base/utils/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}

// node_modules/@mui/base/utils/useSlotProps.js
var _excluded = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function useSlotProps(parameters) {
  var _a;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_a = parameters.additionalProps) == null ? void 0 : _a.ref);
  const props = appendOwnerState(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}

// node_modules/@mui/base/utils/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}

// node_modules/@mui/base/utils/ClassNameConfigurator.js
var React3 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var defaultContextValue = {
  disableDefaultClasses: false
};
var ClassNameConfiguratorContext = React3.createContext(defaultContextValue);
if (true) {
  ClassNameConfiguratorContext.displayName = "ClassNameConfiguratorContext";
}
function useClassNamesOverride(generateUtilityClass) {
  const {
    disableDefaultClasses
  } = React3.useContext(ClassNameConfiguratorContext);
  return (slot) => {
    if (disableDefaultClasses) {
      return "";
    }
    return generateUtilityClass(slot);
  };
}

// node_modules/@mui/base/utils/prepareForSlot.js
init_extends();
init_objectWithoutPropertiesLoose();
var React4 = __toESM(require_react());

// node_modules/@mui/joy/utils/useSlot.js
init_extends();
init_objectWithoutPropertiesLoose();
var _excluded2 = ["className", "elementType", "ownerState", "externalForwardedProps", "getSlotOwnerState", "internalForwardedProps"];
var _excluded22 = ["component", "slots", "slotProps"];
var _excluded3 = ["component"];
function useSlot(name, parameters) {
  const {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    getSlotOwnerState,
    internalForwardedProps
  } = parameters, useSlotPropsParams = _objectWithoutPropertiesLoose(parameters, _excluded2);
  const {
    component: rootComponent,
    slots = {
      [name]: void 0
    },
    slotProps = {
      [name]: void 0
    }
  } = externalForwardedProps, other = _objectWithoutPropertiesLoose(externalForwardedProps, _excluded22);
  const elementType = slots[name] || initialElementType;
  const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
  const _mergeSlotProps = mergeSlotProps(_extends({
    className
  }, useSlotPropsParams, {
    externalForwardedProps: name === "root" ? other : void 0,
    externalSlotProps: resolvedComponentsProps
  })), {
    props: {
      component: slotComponent
    },
    internalRef
  } = _mergeSlotProps, mergedProps = _objectWithoutPropertiesLoose(_mergeSlotProps.props, _excluded3);
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, parameters.ref);
  const slotOwnerState = getSlotOwnerState ? getSlotOwnerState(mergedProps) : {};
  const finalOwnerState = _extends({}, ownerState, slotOwnerState);
  const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
  const props = appendOwnerState(elementType, _extends({}, name === "root" && !rootComponent && !slots[name] && internalForwardedProps, name !== "root" && !slots[name] && internalForwardedProps, mergedProps, LeafComponent && {
    as: LeafComponent
  }, {
    ref
  }), finalOwnerState);
  Object.keys(slotOwnerState).forEach((propName) => {
    delete props[propName];
  });
  return [elementType, props];
}

export {
  extractEventHandlers,
  useButton,
  isHostComponent,
  areArraysEqual,
  useClassNamesOverride,
  resolveComponentProps,
  useSlotProps,
  useSlot
};
//# sourceMappingURL=chunk-JOAIAL5Q.js.map

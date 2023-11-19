export const COLORS = {
  main: "#6886C5",
  mainDarker: "#4864A1",
  highlight: "#FFE0AC",
  highlightDarker: "#C7A66E",
  text: "#151515",
  textLight: "#FFFFFF",
  detail: "#8c8c8c",
  error: "red",
};

export const SIZE = {
  xs: 6,
  sm: 12,
  md: 24,
  lg: 36,
  xl: 48,
};

export const FONT_SIZE = {
  sm: 16,
  md: 18,
  lg: 20,
  xl: 32,
  xxl: 42,
};

export const FONT = {
  h1: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text,
  },
  h2: {
    fontSize: 38,
    fontWeight: "600",
    color: COLORS.main,
  },
  h3: {
    fontSize: 32,
    fontWeight: "500",
  },
  sub: {
    fontSize: 18,
    fontWeight: "400",
    color: COLORS.detail,
  },
  button: {
    fontWeight: "700",
    fontSize: 20,
  },
};

export const COMPONENT = {
  button: {
    main: {
      backgroundColor: COLORS.main,
      borderRadius: 36,
      color: COLORS.textLight,
      paddingHorizontal: 12,
      width: "80%",
    },
    highlight: {
      backgroundColor: COLORS.highlight,
      borderRadius: 36,
      color: COLORS.text,
      paddingHorizontal: 12,
      width: "80%",
    },
  },
  error: {
    textAlign: "center",
    color: "red",
  },
};

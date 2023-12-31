export const COLORS = {
  main: "#6886C5",
  mainDarker: "#4864A1",
  highlight: "#FFE0AC",
  highlightDarker: "#C7A66E",
  text: "#151515",
  textLight: "#FFFFFF",
  detail: "#8c8c8c",
  detailLight: "#dcdcdc",
  bacground: "#FFFFFF",
  danger: "#f80045",
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
  xxl: 38,
};

export const FONT = {
  h1: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "900",
    color: COLORS.text,
  },
  h2: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: "600",
    color: COLORS.main,
  },
  h3: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "500",
  },
  h4: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
  },
  sub: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "400",
    color: COLORS.detail,
  },
  button: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
  },
};

export const COMPONENT = {
  button: {
    width: "80%",
    paddingVertical: SIZE.xs,
    paddingHorizontal: SIZE.md,
    borderRadius: SIZE.lg,

    title: { ...FONT.button },

    main: {
      button: {
        backgroundColor: COLORS.main,
      },
      title: {
        color: COLORS.textLight,
      },
    },
    highlight: {
      button: {
        backgroundColor: COLORS.highlight,
      },
      title: {
        color: COLORS.text,
      },
    },
  },

  input: {
    borderBottomWidth: 1,
    marginBottom: SIZE.sm,
    paddingTop: SIZE.sm,
  },

  error: {
    textAlign: "center",
    color: "red",
  },

  dialog: {
    backgroundColor: COLORS.main,
    borderRadius: SIZE.md,
    width: "80%",
    padding: SIZE.lg,
  },
};

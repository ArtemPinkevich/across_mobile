import { extendTheme } from "native-base";

export const customTheme = extendTheme({
	fontConfig: {
		Inter: {
			100: {
				normal: "Inter_100Thin",
			},
			200: {
				normal: "Inter_200ExtraLight",
			},
			300: {
				normal: "Inter_300Light",
			},
			400: {
				normal: "Inter_400Regular",
			},
			500: {
				normal: "Inter_500Medium",
			},
			600: {
				normal: "Inter_600SemiBold",
			},
			700: {
				normal: "Inter_700Bold",
			},
			800: {
				normal: "Inter_800ExtraBold",
			},
			900: {
				normal: "Inter_900Black",
			},
		},
	},
	fonts: {
		heading: "Inter",
		body: "Inter",
		mono: "Inter",
	},
	components: {
		Box: {
			variants: {
				gray_card: () => {
					return {
						bg: "#F6F7F8",
						borderRadius: "16",
						overflow: "hidden",
					};
				},
			},
		},
		Text: {
			variants: {
				header17: () => {
					return {
						color: "#000",
						fontWeight: "600",
						fontSize: 17,
						lineHeight: 22,
						letterSpacing: -0.43,
					};
				},
				header15: () => {
					return {
						color: "#000",
						fontWeight: "500",
						fontSize: 15,
						lineHeight: 20,
						letterSpacing: -0.23,
					};
				},
				body15_black: () => {
					return {
						color: "#000",
						fontWeight: "400",
						fontSize: 15,
						lineHeight: 20,
						letterSpacing: -0.23,
					};
				},
				body15_gray: () => {
					return {
						color: "#737E86",
						fontWeight: "400",
						fontSize: 15,
						lineHeight: 20,
						letterSpacing: -0.23,
					};
				},
				body12: () => {
					return {
						fontWeight: "500",
						fontSize: 12,
						lineHeight: 16,
					};
				},
				body13: () => {
					return {
						color: "#737E86",
						fontWeight: "400",
						fontSize: 13,
						lineHeight: 18,
						letterSpacing: -0.08,
					};
				},
			},
		},
		Badge: {
			variants: {
				status_badge: () => {
					return {
						borderRadius: "24",
						paddingVertical: 2,
						paddingHorizontal: 8,
						gap: 8,
					};
				},
			},
		},
	},
});

type CustomThemeType = typeof customTheme;

declare module "native-base" {
	interface ICustomTheme extends CustomThemeType {}
}

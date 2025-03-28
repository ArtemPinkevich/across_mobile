import { extendTheme } from "native-base";
import { GENERAL_BLUE_COLOR } from "../constants/Colors";

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
		Button: {
			variants: {
				blue_button: () => {
					return {
						bg: GENERAL_BLUE_COLOR,
						borderRadius: "16",
						width: "100%",
						height: 58,
						_text: {
							color: "white",
							fontWeight: "600",
							fontSize: 17,
							lineHeight: 22,
							letterSpacing: -0.43,
						},
					};
				},
				red_link_button: () => {
					return {
						_text: {
							color: "#E32C2C",
							fontWeight: "600",
							fontSize: 17,
							lineHeight: 22,
							letterSpacing: -0.43,
						},
					};
				},
			},
		},
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
				header20: () => {
					return {
						color: "#000",
						fontWeight: "600",
						fontSize: 20,
						lineHeight: 25,
						letterSpacing: -0.45,
					};
				},
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
				header15_gray: () => {
					return {
						color: "#737E86",
						fontWeight: "500",
						fontSize: 15,
						lineHeight: 20,
						letterSpacing: -0.23,
					};
				},
				body17_black: () => {
					return {
						color: "#000",
						fontWeight: "400",
						fontSize: 17,
						lineHeight: 22,
						letterSpacing: -0.43,
					};
				},
				body17_gray: () => {
					return {
						color: "#666666",
						fontWeight: "400",
						fontSize: 17,
						lineHeight: 22,
						letterSpacing: -0.43,
					};
				},
				body16_gray: () => {
					return {
						color: "#737E86",
						fontWeight: "500",
						fontSize: 16,
						lineHeight: 21,
						letterSpacing: -0.31,
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
				body13: () => {
					return {
						color: "#737E86",
						fontWeight: "400",
						fontSize: 13,
						lineHeight: 18,
						letterSpacing: -0.08,
					};
				},
				body12: () => {
					return {
						fontWeight: "500",
						fontSize: 12,
						lineHeight: 16,
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

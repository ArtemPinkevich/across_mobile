import Svg, { Path, SvgProps } from "react-native-svg";

const BackButtonSvg = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path stroke="#2C64E3" strokeWidth={2} d="m15 20-8-8 8-8" />
	</Svg>
);
export default BackButtonSvg;

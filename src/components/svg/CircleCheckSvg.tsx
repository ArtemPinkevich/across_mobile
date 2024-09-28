import Svg, { Path, SvgProps } from "react-native-svg";

const CircleCheckSvg = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path stroke="#000" strokeLinecap="square" strokeWidth={2} d="M15 9.5 10.5 15l-2-2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
	</Svg>
);
export default CircleCheckSvg;

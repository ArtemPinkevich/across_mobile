import Svg, { Path, SvgProps } from "react-native-svg";

const ChevronRightSmallSvg = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path stroke="#737E86" strokeLinecap="square" strokeWidth={2} d="m10 16 4-4-4-4" />
	</Svg>
);
export default ChevronRightSmallSvg;

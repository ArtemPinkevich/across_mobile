import Svg, { Path, SvgProps } from "react-native-svg";

const DriverRequestsTabSvg = (props: SvgProps) => (
	<Svg width={18} height={20} fill="none" {...props}>
		<Path stroke="#737E86" strokeLinecap="square" strokeWidth={2} d="M5.9 6h6m-6 4h3M1.4 1.5v17h15v-17h-15Z" />
	</Svg>
);
export default DriverRequestsTabSvg;

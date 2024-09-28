import Svg, { Circle, SvgProps } from "react-native-svg";

const MapMarkerSvg = (props: SvgProps) => (
	<Svg width={14} height={14} fill="none" {...props}>
		<Circle cx={7} cy={7} r={7} fill={props.color} />
		<Circle cx={7} cy={7} r={4} fill="#F2F3F5" />
	</Svg>
);
export default MapMarkerSvg;

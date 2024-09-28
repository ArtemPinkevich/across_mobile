import Svg, { Path, SvgProps } from "react-native-svg";

const TruckSvg = (props: SvgProps) => (
	<Svg width={21} height={16} fill="none" {...props}>
		<Path
			stroke={props.color}
			strokeWidth={2}
			d="M8.3 12h4m-9.286 0H1.3V6l2-3h4m0 0v7m0-7V1h12v11h-1.818m-9.182.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm9 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
		/>
	</Svg>
);
export default TruckSvg;

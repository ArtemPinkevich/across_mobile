import Svg, { Path, SvgProps } from "react-native-svg";

const EditSvg = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path stroke="#737E86" strokeLinecap="square" strokeWidth={2} d="M14 21h7m0-13.5L16.5 3 3 16.5V21h4.5L21 7.5Z" />
	</Svg>
);
export default EditSvg;

import Svg, { Path, SvgProps } from "react-native-svg";
import { GENERAL_BLUE_COLOR } from "../../constants/Colors";

const BackButtonSvg = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<Path stroke={GENERAL_BLUE_COLOR} strokeWidth={2} d="m15 20-8-8 8-8" />
	</Svg>
);
export default BackButtonSvg;

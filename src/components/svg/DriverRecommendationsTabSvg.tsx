import Svg, { Path, SvgProps } from "react-native-svg";

const DriverRecommendationsTabSvg = (props: SvgProps) => (
	<Svg width={20} height={18} fill="none" {...props}>
		<Path
			fill="#737E86"
			d="M1.5 1V0h-1v1h1Zm0 16h-1v1h1v-1Zm16-16h1V0h-1v1Zm-10 0V0h-2v1h2Zm-1 5h-1v1h1V6Zm6 0v1h1V6h-1Zm1-5V0h-2v1h2Zm3 10v-1h-2v1h2Zm-2 6v1h2v-1h-2Zm-2-4h-1v2h1v-2Zm6 2h1v-2h-1v2ZM.5 1v16h2V1h-2Zm1 17h8v-2h-8v2Zm0-16h16V0h-16v2Zm15-1v7h2V1h-2Zm-11 0v5h2V1h-2Zm1 6h6V5h-6v2Zm7-1V1h-2v5h2Zm1 5v3h2v-3h-2Zm0 3v3h2v-3h-2Zm-2 1h3v-2h-3v2Zm3 0h3v-2h-3v2Z"
		/>
	</Svg>
);
export default DriverRecommendationsTabSvg;

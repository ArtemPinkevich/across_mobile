import Svg, { Path, SvgProps } from "react-native-svg";

const SearchSvg = (props: SvgProps) => (
	<Svg width={19} height={19} fill="none" {...props}>
		<Path stroke="#737E86" strokeLinecap="square" strokeWidth={2} d="m17.1 17-3.95-3.95M15.1 8a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
	</Svg>
);
export default SearchSvg;

import * as React from "react";
import { LoadingType } from "../../api/truck/LoadingType";
import { Select } from "native-base";

export interface LoadTypeSelectProps {
    onChange: (value: string) => void;
    value?: string;
}

export default function LoadTypeSelect(props: LoadTypeSelectProps) {
    const { value, onChange } = props;

    return (
        <Select selectedValue={value} variant="underlined" onValueChange={onChange}>
            <Select.Item label="Верхняя" value={LoadingType.top.toString()} />
            <Select.Item label="Боковая" value={LoadingType.side.toString()} />
            <Select.Item label="Задняя" value={LoadingType.rear.toString()} />
            <Select.Item label="С полной растентовкой" value={LoadingType.full.toString()} />
            <Select.Item label="Со снятием поперечных перекладин" value={LoadingType.withSlidingRoof.toString()} />
            <Select.Item label="Со снятием стоек" value={LoadingType.withRemovablePillars.toString()} />
            <Select.Item label="Без ворот" value={LoadingType.withoutGates.toString()} />
            <Select.Item label="Гидроборт" value={LoadingType.hydroboard.toString()} />
            <Select.Item label="Аппарели" value={LoadingType.apparels.toString()} />
            <Select.Item label="С обрешеткой" value={LoadingType.withCrate.toString()} />
            <Select.Item label="С бортами" value={LoadingType.withBoards.toString()} />
            <Select.Item label="Боковая с 2-х сторон" value={LoadingType.sideBySide.toString()} />
            <Select.Item label="Налив" value={LoadingType.pour.toString()} />
            <Select.Item label="Электрический" value={LoadingType.electric.toString()} />
            <Select.Item label="Гидравлический" value={LoadingType.hydraulic.toString()} />
            <Select.Item label="Не указан" value={LoadingType.unspecified.toString()} />
            <Select.Item label="Пневматический" value={LoadingType.pneumatic.toString()} />
            <Select.Item label="Дизельный компрессор" value={LoadingType.dieselCompressor.toString()} />
        </Select>
    );
}

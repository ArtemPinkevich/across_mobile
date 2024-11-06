import * as React from "react";
import { Button, Modal, Spacer, Text } from "native-base";
import { SHIPPER_ROLE } from "../../../api/profile/Profile";

type Props = {
	role: string;
	showModal: boolean;
	onCancel: () => void;
	onOk: () => void;
};

export default function RoleConfirmationModal(props: Props) {
	const { role, showModal, onCancel, onOk } = props;

	return (
		<Modal isOpen={showModal} onClose={onCancel}>
			<Modal.Content maxWidth="400px">
				<Modal.Header>Внимание</Modal.Header>
				<Modal.Body>
					<Text variant={"body15_black"}>
						Выбрана роль <Text bold>{role === SHIPPER_ROLE ? "Грузоотправитель" : "Грузоперевозчик"}</Text>.
					</Text>
					<Text mt={2} variant={"body15_black"}>
						При необходимости, изменить роль будет возможно через обращение в службу технической поддержки.
					</Text>
				</Modal.Body>
				<Modal.Footer>
					<Button variant={"blue_button"} bg={"#7096ec"} m={1} onPress={onCancel}>
						Отмена
					</Button>
					<Spacer />
					<Button variant={"blue_button"} m={1} onPress={onOk}>
						Продолжить
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
}

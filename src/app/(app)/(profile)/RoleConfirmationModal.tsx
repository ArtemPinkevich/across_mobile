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
					<Text>
						Выбрана роль <Text bold>{role === SHIPPER_ROLE ? "Грузоотправитель" : "Грузоперевозчик"}</Text>.
					</Text>
					<Text>При необходимости, изменить роль будет возможно через обращение в службу технической поддержки.</Text>
				</Modal.Body>
				<Modal.Footer>
					<Button minW={100} onPress={onCancel}>
						Отмена
					</Button>
					<Spacer />
					<Button minW={100} onPress={onOk}>
						Продолжить
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
}

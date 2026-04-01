import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@heroui/react";
import { useNotificationContext } from "@/context/notificationcontext/NoteficationContext";
import { useNavigate } from "react-router-dom";

export const LoginModal = () => {
  const [state, setState] = useState({
    name: "",
    password: "",
    error: "",
    isOpen: true,
  });

  const { setUsername } = useNotificationContext();
  const navigate = useNavigate();

  const update = (key: string, value: string | boolean) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleLogin = () => {
    const { name, password } = state;

    if (!name.trim()) return update("error", "Please enter a username");
    if (!password.trim()) return update("error", "Please enter a password");

    if (password === "Shashvat@123") {
      setUsername(name);
      update("isOpen", false);
      navigate("/");
    } else {
      update("error", "Invalid password");
    }
  };

  return (
    <Modal
      isOpen={state.isOpen}
      onOpenChange={(open) => update("isOpen", open)}
      hideCloseButton
      isDismissable={false}
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">
          Login Required
        </ModalHeader>
        <ModalBody>
          <Input
            label="Username"
            placeholder="Enter your name"
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            variant="bordered"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            value={state.password}
            onChange={(e) => update("password", e.target.value)}
            variant="bordered"
          />
          {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={handleLogin}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

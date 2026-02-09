import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    title: '',
    price: '',
    brand: '',
    sku: '',
  });

  const labels: Record<keyof typeof form, string> = {
    title: 'Наименование',
    price: 'Цена',
    brand: 'Вендор',
    sku: 'Артикул',
  };

  const submit = () => {
    toast({
      title: 'Товар добавлен',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setForm({ title: '', price: '', brand: '', sku: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить товар</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            {(Object.keys(form) as (keyof typeof form)[]).map((key) => (
              <FormControl key={key}>
                <FormLabel>{labels[key]}</FormLabel>
                <Input
                  value={form[key]}
                  onChange={(event) =>
                    setForm({ ...form, [key]: event.target.value })
                  }
                />
              </FormControl>
            ))}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Отмена
          </Button>
          <Button colorScheme="blue" onClick={submit}>
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;

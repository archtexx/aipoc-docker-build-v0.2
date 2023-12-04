import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Link,
} from '@chakra-ui/react'

export default function PopupModal({ link, content }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Link onClick={onOpen} color='teal.500' className="pr-2">
                {link}
            </Link>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className="font-normal">{content} </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
import React from 'react';
import { Modal } from 'react-native';

const BaseModal = function({visible, modalRequest, content, transparent = false}) {
    return (
        <Modal
            animationType={"none"}
            visible={visible}
            onRequestClose={modalRequest}
            transparent={transparent}
            statusBarTranslucent={false}
        >
            {content}
        </Modal>
    )
}

export default BaseModal;
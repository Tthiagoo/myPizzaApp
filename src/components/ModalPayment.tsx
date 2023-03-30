import React, { useMemo, useState } from 'react'
import { Button, Modal, Select, Text } from 'native-base'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import uuid from 'react-native-uuid'
import { useAuth } from '../context/auth'
import { useCart } from '../context/newCartContext'
import { Alert } from 'react-native'
interface props {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export function ModalPayment({ visible, setVisible }: props) {
  const [payment, setPayment] = useState('')
  const [loading, setLoading] = useState(false)
  const { data, reseteCart } = useCart()

  const closeModal = () => {
    setVisible(false)
  }
  const cartTotal = useMemo(() => {
    const total = data.reduce((accumulator, product) => {
      const productSubTotal = product.price * product.quantidade

      return accumulator + productSubTotal
    }, 0)

    return total
  }, [data])

  const { user } = useAuth()
  const newDate = new Date()
  const date = new Date().getDate()

  const month = new Date().getMonth() + 1

  const newMin = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()
  const newHour = (newDate.getHours() < 10 ? '0' : '') + newDate.getHours()
  async function handleAddOrder() {
    setLoading(true)
    const orderRef = collection(db, 'Orders')
    await addDoc(orderRef, {
      id: uuid.v4(),
      userName: user?.name,
      userId: user?.uid,
      date: `${date}/${month}`,
      aptoUser: `Apto ${user?.apto} bl ${user?.bloco}`,
      hours: `${newHour}:${newMin}`,
      status: 'Preparando',
      order: data,
      priceTotal: cartTotal,
      payment: payment
    })
      .then(async () => {
        setLoading(false)
        reseteCart()
        closeModal()
        Alert.alert('', 'Pedido concluido com sucesso')
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Modal isOpen={visible} onClose={closeModal} size={'xs'}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Selecione a forma de pagamento</Modal.Header>
        <Modal.Body>
          <Select
            selectedValue={payment}
            borderRadius={'10px'}
            bg="white"
            variant={'unstyled'}
            borderColor="gray.300"
            borderWidth={'1'}
            p="1rem"
            fontSize={'sm'}
            w="100%"
            _selectedItem={{
              bg: 'green.200'
            }}
            onValueChange={setPayment}
          >
            <Select.Item label="Pix" value="Pix" />
            <Select.Item label="Cartão - Credito" value="Cartão | Credito" />
            <Select.Item label="Cartão - Debito" value="Cartão | Debito" />
            <Select.Item label="Dinheiro" value="Dinheiro" />
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            backgroundColor={'#528F33'}
            isDisabled={!payment}
            colorScheme={'green'}
            isLoading={loading}
            onPress={handleAddOrder}
          >
            Finalizar Pedido
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

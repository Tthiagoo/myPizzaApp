import {
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  Heading,
  Text
} from 'native-base'
import React from 'react'
import CartItem from '../components/CartItem'
import OrderDetailCard, { OrderDetailProp } from '../components/OrderDetailCard'

export default function Carrinho() {
  const orders: OrderDetailProp[] = [
    {
      id: '1',
      description: 'teste de descrição',
      price: 'R$100',
      title: 'test',
      image:
        'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2020/08/pizza-margherita.jpg?x41527'
    },
    {
      id: '2',
      description: 'teste de descrição',
      price: 'R$100',
      title: 'test',
      image:
        'https://www.teusonhar.com.br/wp-content/uploads/2017/01/sonhar-com-coca-cola-e1487097028478.jpg'
    },
    {
      id: '3',
      description: 'teste de descrição',
      price: 'R$100',
      title: 'test',
      image:
        'https://blog.ginbrasil.com.br/wp-content/uploads/2022/01/gin-com-sprite-blog-gin-brasil.png'
    },
    {
      id: '4',
      description: 'teste de descrição',
      price: 'R$100',
      title: 'test',
      image:
        'https://www.paollarestaurante.com.br/uploads/images/2019/08/pizza-strogonoff-de-carne-1565146013.jpg'
    },
    {
      id: '1224455344',
      description: 'teste de descrição',
      price: 'R$100',
      title: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/recipes/000/098/564/333992/333992_original.jpg'
    },
    {
      id: '12234444',
      description: 'teste de descrição',
      price: 'R$100',
      title: 'test',
      image:
        'https://guiadacozinha.com.br/wp-content/uploads/2019/10/pizza-hot-dog-38187.jpg'
    }
  ]
  return (
    <Flex flex="1" bg="light.200" alignItems={'center'}>
      <Flex
        safeAreaTop
        w="100%"
        h="15%"
        bg="red.700"
        alignItems={'center'}
        justifyContent="center"
        color="white"
      >
        <Heading size="md" color="white">
          Carrinho
        </Heading>
      </Flex>
      <Flex
        flexDirection="row"
        py={'2'}
        w="100%"
        bg="#eeeeee"
        justifyContent={'space-around'}
        alignItems={'center'}
        borderBottomColor="gray.300"
        borderBottomWidth={1}
        shadow={1}
      >
        <Heading size="sm">Total: R$56</Heading>
        <Button
          _pressed={{ opacity: 0.6 }}
          w="auto"
          style={{
            borderRadius: 12,
            maxHeight: 50,
            minHeight: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#528F33'
          }}
        >
          <Text color={'white'}> Finalizar Pedido </Text>
        </Button>
      </Flex>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <CartItem index={index} key={index} data={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        paddingTop={2}
      />
    </Flex>
  )
}

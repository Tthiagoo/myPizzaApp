import { Box, Divider, FlatList, Flex, Heading, HStack } from 'native-base'
import React from 'react'
import OrderDetailCard, { OrderDetailProp } from '../components/OrderDetailCard'
import { OrderProps } from './OrderHistory'

export default function OrderDetail() {
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
          Detalhes do Pedido
        </Heading>
      </Flex>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderDetailCard index={index} key={index} data={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        paddingTop={2}
      />
      <Flex
        py={'4'}
        w="100%"
        bg="white"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading size="sm">Total: R$56</Heading>
      </Flex>
    </Flex>
  )
}

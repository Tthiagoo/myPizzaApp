import { Box, Divider, FlatList, Flex, Heading, Text } from 'native-base'
import React from 'react'
import OrderCard from '../components/OrderCard'

export interface OrderProps {
  id: string
  pizza: string
  image: string
}

export default function OrderHistory() {
  const orders: OrderProps[] = [
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2020/08/pizza-margherita.jpg?x41527'
    },
    {
      id: '12234444',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
    },
    {
      id: '122344',
      pizza: 'test',
      image:
        'https://img.itdg.com.br/tdg/images/blog/uploads/2022/07/5-itens-necessarios-para-se-tornar-um-pizzaiolo-neste-Dia-da-Pizza.jpg?mode=crop&width={:width=%3E150,%20:height=%3E130'
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
          Pedidos Feitos
        </Heading>
      </Flex>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard index={index} data={item} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={{}}
      />
    </Flex>
  )
}

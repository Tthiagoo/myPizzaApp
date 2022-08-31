import { Box, FlatList, Flex, Heading, Text } from 'native-base'
import React from 'react'

export interface OrderProps  {
    id: string,
    pizza: string,
    image: string,
   
    
  }

export default function OrderHistory() {
    const orders:OrderProps[] =[{
        id:"1223",
        pizza:"test",
        image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",

    }]
  return (
    <Box flex="1" bg="light.200">
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
        <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            
            
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
      </Flex>
    </Box>
  )
}

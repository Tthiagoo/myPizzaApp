import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FlatList } from 'native-base'
import React from 'react'
import ItemPizza from './ItemPizza'
type RootStackParamList = {
  order: { id: string }
  orderDetail: { id: string }
}

interface ProductProps {
  id: string
  image: string
  title: string
  description: string
}

export default function MenuPizza() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  function handleOpen(item: ProductProps) {
    navigation.navigate('order', item)
  }
  const data: ProductProps[] = [
    {
      id: 'bd7acbea-c1b1-46cs2-aed5-3ad53abb28ba',
      title: '4 Queijos',
      description: 'Mussarela, provolone, parmesão e gorgonzola.',
      image:
        'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2016/07/pizza-de-4-queijos.jpg?x41527'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aeddd5-3ad53abb28ba',
      title: 'Margherita',
      description: 'Mussarela, manjericão fresco,parmesão e tomate',
      image:
        'https://img.itdg.com.br/images/recipes/000/095/378/225012/225012_original.jpg'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aeddd5-3ad5d3abb28ba',
      title: 'Portuguesa',
      description: 'Calabresa, ovo e pimentão cobertos com mussarela.',
      image:
        'https://img.itdg.com.br/tdg/images/recipes/000/000/324/323149/323149_original.jpg'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aedddssd5-3ad5d3abb28ba',
      title: 'Bauru',
      description: 'Mussarela, Presunto, Oregano, Tomate',
      image:
        'https://s2.glbimg.com/wMQRG2vmN_dDJ-1HrSwGOKEbZak=/0x0:1080x608/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/e/n/G9IuruRaezxqgmwozOyg/capa-materia-gshow-49-.png'
    },
    {
      id: 'bd7acbea-c1ss  b1-46c2-aedddssd5-3ad5d3abb28ba',
      title: 'Frango C/ Catupiry',
      description: 'Frango desfiado, Catupiry e Oregano',
      image:
        'https://www.receiteria.com.br/wp-content/uploads/pizza-de-frango-de-liquidificador-00-730x449.jpg'
    }
  ]
  return (
    <FlatList
      paddingX={'5%'}
      marginTop={'10px'}
      data={data}
      renderItem={({ item }) => (
        <ItemPizza key={item.id} data={item} onPress={() => handleOpen(item)} />
      )}
      keyExtractor={item => item.id}
    />
  )
}

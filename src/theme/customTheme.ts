import { NativeBaseProvider, extendTheme } from 'native-base'

export const theme = extendTheme({
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'DMSerifDisplay_400Regular',
    body: 'DMSans_400Regular',
    mono: 'DMSans_400Regular'
  }
})
/*fonts: {
    heading: 'PilatWide-Regular',
    body: 'PilatWide-Regular',
    mono: 'PilatWide-Regular',
  },

  fonts: { heading: 'PilatWide', body: 'PilatWide', mono: 'PilatWide', },*/

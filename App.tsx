import Loading from "./src/components/Loading"
import { 
  useFonts, 
  RedHatDisplay_300Light 
} from '@expo-google-fonts/red-hat-display'
import Login from "./src/screens/Login"
export default function App() {
  const [ fontsLoaded ] = useFonts({ RedHatDisplay_300Light })

  if(!fontsLoaded) return <Loading/>

  return (
    <Login/>
  )
}


import Carte from "./components/cart"
import ListeProduit from "./components/liste"

function App() {
  return(
    <div id="container" className="lg:flex lg:gap-3 lg:p-6 lg:h-screen lg:overflow-hidden" >
      <ListeProduit/>
      <Carte/>
    </div>
  )
}
export default App

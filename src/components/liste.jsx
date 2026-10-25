import { useState } from "react";
import useCart from "../hooks/usecart";
import Usenoms from "../hooks/usenoms";

function ListeProduit() {
  const { nomsd} = Usenoms();
  // qui est une fonction qui permet de recuperer la fonction addToCart du store useCart ,il communique avec react par le biais de l'etat du store useCart
  const addToCart = useCart((state) => state.addToCart);// state est un objet qui contient l'etat du store useCart, il permet de recuperer la fonction addToCart du store useCart
  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);// qui est un etat qui permet de filtrer les produits disponibles ou non
  const result = () => {
    return noms.filter((items) => {
      const recherche = items.nom.toLowerCase().includes(search.toLowerCase());
      const disponible = !onlyAvailable || items.disponibilite;// il retourne un tableau de produits qui sont disponibles si onlyAvailable est true, sinon il retourne tous les produits
      return recherche && disponible;
    });
  };
  return (
    <div
      id="contain"
      className="relative h-screen overflow-hidden font-poppins lg:w-230 "
    >
      <div className="overflow-y-auto h-full">
        <div className="sticky border-b border-gray-400/20 z-20 top-0  p-3 bg-lime-800">
          <div className="flex justify-between ">
            <h1 className="font-bold text-lg ml-2 text-white lg:text-2xl">Shop</h1>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <input
              type="text"
              placeholder="search...."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="bg-white/80 text-black rounded-lg border-1 border-orange-500/20 w-60 h-10 shadow backdrop-blur-xl placeholder: text-black-900 font-500 text-md lg:w-90 "
            />
            <label className="mt-2 text-white/80">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 rounded border-4 border-orange-900 bg-orange-900"
                checked={onlyAvailable}
                onChange={(e) => {
                  setOnlyAvailable(e.target.checked);
                }}
              />
              Afficher seulement les produits disponibles 
            </label>
          </div>
        </div>
        <div className="lg:flex-1">
        <div className="grid grid-cols-2 gap-4 p-4 bg-black/20 lg:grid-cols-4 lg:gap-5">
          {result().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl flex flex-col items-center justify-center shadow-md backdrop-blur-xl border border-gray-200 "
            >
              <div className="w-30 h-15 flex items-center m-4 justify-center">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-b from-white to-gray-100  rounded-xl shadow-inner">
                <p className="text-6xl drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] transition-transform hover:scale-110">{item.emoji}</p>
               </div>
              </div>
              {/* est une condition permettant d'afficher un message lorsque le produit n'est pas disponible */}
              {!item.disponibilite && (
                <p
                  style={{ color: "red" }}
                  className="text-sm opacity-60  font-medium"
                >
                  rupture de stock
                </p>
              )}
              <p>
                
                <span className="ml-3 mr-2">Prix: </span> {item.prix}
              </p>
              <p className="font-bold ml-3">{item.nom}</p>
              <button
                disabled={!item.disponibilite}
                onClick={() => addToCart(item)}
                className="w-30 h-7 rounded-xl mt-2 disabled:opacity-60 mb-2 bg-orange-500 text-white font-medium hover:bg-orange-700 hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                add 
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
export default ListeProduit;

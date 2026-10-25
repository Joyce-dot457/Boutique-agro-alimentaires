import { useState } from "react";
import useCart from "../hooks/usecart";

function Carte() {
  const card = useCart((state) => state.card);
  const removeToCart = useCart((state) => state.removeToCart);
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);
  const clear = useCart((state) => state.clear);
  const [open, setOpen] = useState(false);

  //  total est une constante qui  affiche la valeur finale dont le calcul est le total du panier en multipliant le prix de chaque produit par sa quantite et en additionnant le tout
  const total = card.reduce(
    (somme, item) => somme + item.prix * item.quantite,0
  );
  return (
    <>
    {/* si le panier n'est pas ouvert,on affiche un bouton qui permet d'ouvrir le panier */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 left-4 lg:hidden right-3 z-10 bg-indigo-700 rounded-xl text-white px-4 py-3 hover:bg-indigo-600 shadow-[0_8px _50px_rgba(47,104,68,0.35)] hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <span className="font-semibold">
            🛒 Voir mon panier ({card.length})
          </span>
          <span className="ml-20 font-bold">{total}cfa </span>
        </button>
      )}
      {/* est un element qui permet de voiler le reste de la page lorsque le panier est ouvert */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-white transition-opacity duration-300 ${open ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"} lg:hidden`}
      />
      <div
        className={`fixed left-0 bottom-0 right-0 z-30 transition-transform rounded-2xl bg-white overflow-y-auto p-4 h-2/3  duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"} lg:block lg:static lg:translate-y-0 lg:h-full lg:w-100 lg:rounded-2xl lg:shadow lg:border lg:border-gray-200`}
        style={{ maxHeight: "85vh" }}
      >
        <div id="containe" className="bg-gray-300/20">
          <div className="flex justify-between p-3">
            <span className="text-black font-semibold text-lg">
             Mon panier
            </span>
            <button
              onClick={() => setOpen(false)}
              className=" text-md w-15 rounded-lg  bg-red-800/80 hover:scale-105 transition-transform text-white hover:opacity-70 lg:hidden"
            >
              fermer
            </button>
          </div>
          {/*est une condition qui permet d'afficher un message lorsque le panier est vide*/}
          {card.length === 0 ? (
            <p className="text-center mt-5 text-lg">Pas de produit ajoute</p>
          ) : ( 
            <>
              {card.map((item) => (
                <div
                  key={item.id}
                  className=" flex justify-between items-center p-1 mb-2 "
                >
                  <div className="flex justify-between items-center w-80 h-20 backdrop-blur-3xl shadow bg-white rounded-lg m-2">
                 <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-b from-white to-gray-100  rounded-xl shadow-inner">
                  <p className="text-5xl drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] transition-transform hover:scale-110 lg:text-3xl">{item.emoji}</p>
                    </div>
                  <div className="flex flex-col justify-center items-center mr-10">
                    <p className="font-bold">{item.nom}</p>
                    <p className="text-sm mb-1">{item.prix}</p>
                    <div className="flex gap-2 items-center">
                      <button onClick={() => increaseQuantity(item.id)} className="rounded-lg border-2 border-yellow-700 w-7 bg-yellow-500/50 h-6 text-center font-semibold hover:opacity-70 hover:scale-105 transition-transform duration-300 ease-in-out">
                        +
                      </button>
                      <p className="font-medium text-lg">{item.quantite}</p>
                      <button onClick={() => decreaseQuantity(item.id)} className="rounded-lg border-2 border-yellow-700 w-7 bg-yellow-500/50 h-6 text-center font-semibold hover:opacity-70 hover:scale-105 transition-transform duration-300 ease-in-out">
                        -
                      </button>
                      </div>
                    </div>
                  </div>
                  
                    <p className="font-bold ">
                      {item.quantite * item.prix} fcfa
                    </p>
                    <button onClick={() => removeToCart(item.id)} className="mr-4 rounded-xl w-7 bg-red-800/80  text-white hover:opacity-70 lg:text-black lg:bg-white lg:text-lg lg:ml-3">x</button>
                  </div>
              ))}
              <div className="mt-10 flex flex-col items-center justify-center">
                <div className="flex items-center gap-50 font-bold mb-2 lg:gap-25">
                  <p>Total </p>
                  <span>{total} fcfa</span>
                </div>
                <button className="font-bold w-70 h-10 rounded-lg bg-orange-500 text-white transition-transform lg:bg-indigo-600 hover:scale-105 hover:opacity-80 lg:w-50">Checkout</button>
                <br />
                <hr className="border-t border-gray-400 w-full"/>
                <button onClick={clear} className="mt-3 text-red-800 hover:opacity-70 transition-transform hover:scale-105">
                  Tout effacer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Carte;

import {create} from "zustand"

// create (set) est une fonction qui permet de creer un store avec un etat initial et des fonctions pour modifier cet etat. set est une fonction qui permet de modifier l'etat du store.
const useCart=create((set)=> ({
    // le tableau de depart est vide, il va contenir les produits ajoutés au panier
    card:[],
// la fonction add to cart permet de prendre la valeur de depart de verifier si son id est egale a l'id du produit
    addToCart : (produit)=>
        set((state)=>{
            const existant= state.card.find((item)=> item.id === produit.id)// qui pacourt le tableau de depart , retourne le premier element qui satisfait la condition dont l'id de l'element est egale a l'id du produit
            // si l'element existe deja dans le tableau de depart , on retourne le tableau de depart avec la quantite du produit qui est egale a la quantite du produit +1 
            if (existant) {
                return{
                    card: state.card.map((item)=>
                    item.id ===produit.id ?
                  {...item,quantite: item.quantite +1} : item)
                }
            }
            // si l'element n'existe pas dans le tableau de depart , on retourne le tableau de depart avec le produit ajouté et une quantite de 1
            return {card:[...state.card, {...produit,quantite:1}]}
       }),
 // la fonction remove to cart permet de prendre la valeur de depart et de verifier si son id est egale a l'id du produit
    removeToCart: (id) =>
     set((state)=>({
        card: state.card.filter((item)=> item.id !== id) // si l'id de la valeur de depart est different de l'id du produit , on retourne le tableau de depart sans le produit
     })),
 // la fonction increaseQuantity permet de prendre la valeur de depart de verifier si son id est egale a l'id du produit et d'augmenter la quantite du produit de 1
    increaseQuantity: (id) =>
        set((state) =>({
          card: state.card.map((item)=>
           item.id ===id ?
         {...item,quantite: item.quantite +1} : item)// si l'id de la valeur de depart est egale a l'id du produit, elle retourne le tableau de depart avec la meme condition que ce lui de if existant dans la fonction addToCart, sinon elle retourne le tableau de depart sans le produit 
            
        })),
 // la fonction decreaseQuantity est la meme que celui de increaseQuantity mais elle diminue la quantite du produit de 1
    decreaseQuantity: (id)=>
        set((state)=>({
             card: state.card.map((item)=>
           item.id ===id ?
         {...item,quantite: item.quantite -1} : item).filter((item)=> item.quantite >0) // si la quantite du produit est inferieur a 0 ,on retourne le tableau dont les elements sont superieur a 0, et si la quantite du produit est inferieur a 0 , on retourne le tableau de depart sans le produit
        })),
//la fonction clear permet de vider le tableau de depart
    clear: ()=> set({card:[]})
   
}))
export default useCart
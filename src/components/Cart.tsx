import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { url } from "../../config/url";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { CartByID, ProductElement } from "interfaces/productTypes";
import ProductCard from "./ProductCard";

interface Props {
  idCart: string;
}

const CartComponent = ({ idCart }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState<ProductElement[]>([]);

  const getCarritoData = async () => {
    try {
      const cartByIdRes = await fetch(`${url}/carts/${idCart}`);
      const cartIdData: CartByID = await cartByIdRes.json();

      if (cartIdData) {
        setCartData(cartIdData.products);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCarritoData();
  }, [])


  const addProduct = async (idProduct: string) => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${url}/carts/${idCart}/products/${idProduct}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: 1
        }),
      });

      if (!resp.ok) {
        console.error(`Error: ${resp.status} ${resp.statusText}`)
      }

      getCarritoData();

    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const clearCart = async () => {
    try {
      const resp = await fetch(`${url}/carts/clear/${idCart}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (resp.ok) {
        toast({
          variant: 'success',
          title: `¡Se vació tu carrito exitosamente!`,
        });

        getCarritoData();
      } else {
        toast({
          variant: 'destructive',
          title: `¡Ha ocurrido un error al vaciar el carrito!`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const removeProduct = async (idProduct: string) => {
    try {
      const resp = await fetch(`${url}/carts/${idCart}/products/${idProduct}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (resp.ok) {
        toast({
          variant: 'success',
          title: `¡Producto eliminado exitosamente!`,
        });

        getCarritoData();
      } else {
        toast({
          variant: 'destructive',
          title: `¡Ha ocurrido un error al eliminar el producto!`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {cartData.length > 0 ? (
        <>
          <Button onClick={clearCart} variant="destructive" className="mb-5">Vaciar carrito</Button>
          <div className="grid grid-cols-4 gap-5">
            {
              cartData.map((product) => (
                <Card key={product.product._id}>
                  <CardHeader>
                    <img src={product.product.thumbnail} alt={product.product.title} />
                  </CardHeader>
                  <CardContent>
                    <h5 className="text-base font-bold">${product.product.price}</h5>
                    <h5 className="mb-2">{product.product.title}</h5>
                    <CardDescription>{product.product.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-5">
                    <Button disabled={isLoading} size="lg" onClick={() => addProduct(product.product._id)}>
                      <Plus className="mr-2" />{product.quantity}
                    </Button>
                    <Button variant="destructive" onClick={() => removeProduct(product.product._id)}>
                      <Trash />
                    </Button>

                  </CardFooter>
                </Card>
              ))
            }
          </div>
        </>
      ) : (
        <h3>No tienes productos en tu carrito</h3>
      )}

    </>

  )
}

export default CartComponent;
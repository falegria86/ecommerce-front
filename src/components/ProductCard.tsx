import { useState } from "react";
import { Plus } from "lucide-react";
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

interface ProductCardProps {
    thumbnail: string;
    title: string;
    price: number;
    description: string;
    idProduct: string;
    idCart: string;
    quantity?: number;
}

// const url = "https://product-manager-production-8d9a.up.railway.app";

const ProductCard = ({ thumbnail, title, price, description, idProduct, idCart, quantity }: ProductCardProps) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

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

            toast({
                variant: 'success',
                title: `¡Agregaste ${title} a tu carrito!`,
                // description: "Friday, February 10, 2023 at 5:57 PM",
            });
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <img src={thumbnail} alt={title} />
            </CardHeader>
            <CardContent>
                <h5 className="text-base">${price}</h5>
                <h5 className="mb-2">{title}</h5>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button disabled={isLoading} size="lg" onClick={() => addProduct(idProduct)}>
                    <Plus className="mr-2" />Agregar
                </Button>
            </CardFooter>
        </Card>
    )
}
export default ProductCard
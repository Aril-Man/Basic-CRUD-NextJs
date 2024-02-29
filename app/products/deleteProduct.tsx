/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
    id: number,
    title: string,
    price: number
}

export default function DeleteProduct(product: Product) {

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    function handleChange() {
        setModal(!modal);
    }

    async function handleDelete(productId: number) {
        setIsLoading(true)
        await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
        })

        setIsLoading(false)
        router.refresh()
        setModal(false)
    }

  return (
    <div>
        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg"> Are you sure for delete {product.title} ?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isLoading ? (
                            <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">Delete</button>

                        ) : (
                            <button type="button" className="btn loading">Deleting...</button>
                        )}
                    </div>
            </div>
        </div>
    </div>
  )
}

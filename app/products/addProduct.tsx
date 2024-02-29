/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AddProduct() {
    
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    function handleChange() {
        setModal(!modal);
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setIsLoading(true)
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price
            })
        })

        setIsLoading(false)

        setTitle("")
        setPrice("")
        router.refresh()
        setModal(false)
    }

  return (
    <div>
        <button className="btn" onClick={handleChange}>Add New</button>

        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"/>

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg"> Add New Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product Name" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="Price"/>
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isLoading ? (
                            <button type="submit" className="btn btn-primary">Save</button>

                        ) : (
                            <button type="button" className="btn loading">Saving...</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

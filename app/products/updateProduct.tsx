"use client"
import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";


type Product = {
    id: number;
    title: string;
    price: number;
    brandId: number;
    description: string;
}

const UpdateProduct = ({ 
    brands, product 
}: { 
    brands: Brand[]; product: Product 
}) => {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [brand, setBrand] = useState(product.brandId);
    const [description, setDescription] = useState(product.description);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleUpdate = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        await axios.patch(`/api/products/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand),
            description: description
        })
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>Edit</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product name</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(ev) => setTitle(ev.target.value)}
                                className="input input-bordered" 
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input 
                                type="text" 
                                value={price}
                                onChange={(ev) => setPrice(Number(ev.target.value))}
                                className="input input-bordered" 
                                placeholder="Price"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Description</label>
                            <input 
                                type="text" 
                                value={description}
                                onChange={(ev) => setDescription(ev.target.value)}
                                className="input input-bordered" 
                                placeholder="Product Description"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select 
                                value={brand}
                                onChange={(ev) => setBrand(Number(ev.target.value))}
                                className="select select-bordered"
                            >

                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct

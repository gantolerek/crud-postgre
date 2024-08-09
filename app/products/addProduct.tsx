"use client"
import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        await axios.post('/api/products', {
            title: title,
            price: Number(price),
            brandId: Number(brand),
            description: description
        })
        setTitle("");
        setPrice("");
        setBrand("");
        setDescription("");
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div>
            <button className="btn" onClick={handleModal}>Add new</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add new product</h3>
                    <form onSubmit={handleSubmit}>
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
                                onChange={(ev) => setPrice(ev.target.value)}
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
                                onChange={(ev) => setBrand(ev.target.value)}
                                className="select select-bordered"
                            >
                                <option value="" 
                                disabled>Select a brand</option>
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

export default AddProduct

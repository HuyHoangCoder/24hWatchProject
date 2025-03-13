import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListProduct from '../ListProduct';
import { handlePercentDiscount } from '../../../untils/index';
import { useDispatch } from 'react-redux';

function Iphone(props) {
    const dispatch = useDispatch();
    const [hotIphone, setHotIphone] = useState([]);
    const [sortType, setSortType] = useState('default'); // default, asc, desc

    useEffect(() => {
        async function FetchApi() {
            try {
                const { data } = await axios.get(`http://localhost:4000/products`);
                setHotIphone(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        FetchApi();
    }, []);

    // Hàm sắp xếp sản phẩm theo giá
    const sortProducts = (type) => {
        let sortedProducts = [...hotIphone];
        if (type === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần theo giá
        } else if (type === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần theo giá
        }
        setHotIphone(sortedProducts);
    };

    // Hàm xử lý khi người dùng thay đổi loại sắp xếp
    const handleSortChange = (e) => {
        const selectedType = e.target.value;
        setSortType(selectedType);
        sortProducts(selectedType);
    };

    return (
        <section id="hotsale iphone">
            <div className="hotsale">
                <h2>ĐỒNG HỒ NAM</h2>
                <div className="sort-options">
                    <label htmlFor="sort">Sắp xếp theo: </label>
                    <select id="sort" value={sortType} onChange={handleSortChange}>
                        <option value="default">Mặc định</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>
                {/* Dropdown chọn loại sắp xếp */}
                

                {/* Hiển thị danh sách sản phẩm */}
                {hotIphone.length > 0 ? (
                    <ListProduct HotSaleProducts={handlePercentDiscount(hotIphone)}></ListProduct>
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>
        </section>
    );
}

export default Iphone;

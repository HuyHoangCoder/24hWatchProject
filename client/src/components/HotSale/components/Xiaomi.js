import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListProduct from '../ListProduct';
import { handlePercentDiscount } from '../../../untils/index';
import { useDispatch } from 'react-redux';

function Xiaomi(props) {
    const dispatch = useDispatch();
    const [hotXiaomi, setHotXiaomi] = useState([]);
    const [sortType, setSortType] = useState('default'); // 'default', 'asc', 'desc'

    useEffect(() => {
        async function FetchApi() {
            try {
                const { data } = await axios.get(`http://localhost:4000/products`);
                setHotXiaomi(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        FetchApi();
    }, [props.name]);

    // Hàm sắp xếp sản phẩm theo giá
    const sortProducts = (type) => {
        let sortedProducts = [...hotXiaomi]; // Tạo bản sao của mảng hotXiaomi để tránh thay đổi dữ liệu gốc
        if (type === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần theo giá
        } else if (type === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần theo giá
        }
        setHotXiaomi(sortedProducts);
    };

    // Hàm xử lý khi người dùng chọn kiểu sắp xếp
    const handleSortChange = (e) => {
        const selectedType = e.target.value;
        setSortType(selectedType);
        sortProducts(selectedType);
    };

    return (
        <section id="hotsale">
            <div className="hotsale">
                <h2>ĐỒNG HỒ CHO TRẺ</h2>

                {/* Dropdown chọn kiểu sắp xếp */}
                <div className="sort-options">
                    <label htmlFor="sort">Sắp xếp theo:</label>
                    <select id="sort" value={sortType} onChange={handleSortChange}>
                        <option value="default">Mặc định</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>

                {/* Hiển thị danh sách sản phẩm */}
                {hotXiaomi.length > 0 ? (
                    <ListProduct HotSaleProducts={handlePercentDiscount(hotXiaomi)}></ListProduct>
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>
        </section>
    );
}

export default Xiaomi;

import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header';
import OneCard from '../../components/Card';
import styles from './MainPage.module.scss'
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import SearchIcon from '../../components/Icons/SearchIcon'
import { mockItems } from '../../../consts';
import { api } from '../../api';
import { setCurrentPage, setMaterial, setOrderID, setTitle } from '../../components/state/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/state/state';

export type Item = {
    id: number;
    name: string;
    image_url: string;
    quantity: number;
    material: string;
    height: number;
    width: number;
    depth: number;
    barcode: number;
}

export type ReceivedItemData = {
    id: number;
    name: string;
    image_url: string;
    status: string;
    quantity: number;
    material: string;
    height: number;
    width: number;
    depth: number;
    barcode: number;
}



const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const title = useSelector((state: RootState) => state.user.title)
    const material = useSelector((state: RootState) => state.user.material)

    const currentPage = useSelector((state: RootState) => state.user.currentPage)
    
    const [items, setItems] = useState<Item[]>([]);
    const linksMap = new Map<string, string>([
        ['Домашняя страница', '/'],
        ['Комплектующие', "/items"]
    ]);
//запрос на главной 
    const getItems = async () => {
        dispatch(setCurrentPage('Главная'))
        try {
            const { data } = await api.items.itemsList({
                title: title,
                material: material,
            },{
                withCredentials: true
            });
            const itemsData = data.items;
            const newItemsArr = itemsData.map((raw: ReceivedItemData) => ({
                id: raw.id,
                name: raw.name,
                image_url: raw.image_url,
                status: raw.status,
                quantity: raw.quantity,
                material: raw.material,
                height: raw.height,
                width: raw.width,
                depth: raw.depth,
                barcode: raw.barcode
            }));
            setItems(newItemsArr);
            dispatch(setOrderID(data.orderID))
        } catch (error) {
            console.log('запрос не прошел !', error);
            if (title || material) {
                const filteredArray = mockItems.filter(mockItem => (mockItem.name.includes(title) && mockItem.material.includes(material)));
                setItems(filteredArray);
            } else {
                setItems(mockItems);
            }
        }
    };
    useEffect(() => {
        getItems();
    }, []);

    const handleSearchButtonClick = () => {
        getItems();
    }


    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };


    return (
        <div className={styles['main__page']}>
            <Header/>
            <div className={styles['content']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>
                <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                    <div className='w-100'>
                        <Form.Group style={{height: 60}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 16}} value={title} onChange={e => {dispatch(setTitle(e.target.value))}} type="text" placeholder="Введите название ..." />
                            <Form.Select
                                style= {{marginTop: 10, width: '20%'}}
                                value={material}
                                onChange={e => {
                                    dispatch(setMaterial(e.target.value))
                                }}
                                aria-label="Выберите материал" className='mb-3 form-select' id='material'>
                                <option value="">Выберите материал</option>
                                <option value="металл">металл</option>
                                <option value="композит">композит</option>
                                <option value="резина">резина</option>
                                <option value="пластмасса">пластмасса</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    
                    <Button style={{backgroundColor: "#FF9800", color: '#FFF', padding: "15px 40px", borderColor: "#000", fontSize: 18, height: 60}} onClick={() => handleSearchButtonClick()}>
                        <SearchIcon />
                    </Button>
                </Form>

                <div className={styles["content__cards"]}>
                    {items.map((item: Item) => (
                        <OneCard callback={getItems} id={item.id} image_url={item.image_url} onButtonClick={() => console.log('add to application')} name={item.name} barcode={Number(item.barcode)}></OneCard>
                    ))}
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;
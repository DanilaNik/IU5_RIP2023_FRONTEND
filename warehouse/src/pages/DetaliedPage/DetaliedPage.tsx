import * as React from 'react';
import Header from '../../components/Header';
import BreadCrumbs from '../../components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { mockItems } from '../../../consts'
import { api } from '../../api';

type Item = {
    id: number;
    name: string;
    image_url: string;
    quantity: number;
    material: string;
    height: number;
    width: number;
    depth: number;
    barcode: number;
};

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
    const {id} = useParams();
    const [linksMap, setLinksMap] = useState<Map<string, string>>(
        new Map<string, string>([['Домашняя страница', '/'], ['Комплектующие', '/']])
    );

    const [item, setItem] = useState<Item>();
//доп информация
    const getItem = async () => {
        try {
            //const response = await fetch(`http://172.20.10.6:8080/items/${id}`);
           // const data = await response.json();
            const { data } = await api.items.itemsDetail(id, {
            withCredentials: true
            });
            const itemData = data.item; // Извлечение объекта item из объекта
            setItem({
                id: Number(itemData.id),
                name: itemData.name,
                image_url: itemData.image_url,
                quantity: itemData.quantity,
                material: itemData.material,
                height: itemData.height,
                width: itemData.width,
                depth: itemData.depth,
                barcode: itemData.barcode
            })
     
            const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
            newLinksMap.set(itemData.name, '/items/' + id);
            setLinksMap(newLinksMap)
        } catch {
            const item = mockItems.find(item => item.id === Number(id));
            setItem(item)
        }
     };     
    useEffect(() => {
        getItem();
        // console.log(currentUrl)
    }, []);

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div className='d-flex gap-5'>
                    <Image
                        style={{ width: '45%' }}
                        src={item?.image_url ? item?.image_url : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
                        rounded
                    />
                    <div style={{width: '55%'}}>
                            <h1 className='mb-4' style={{fontSize: 30}}>{item?.name}</h1>
                        <div className={styles.content__description}>
                            <h4>Описание:</h4>
                            <p>Количество: {item?.quantity}</p>
                            <p>Код: {item?.barcode}</p>
                            <p>Материал: {item?.material}</p>
                            <p>Размеры: {item?.height}x{item?.width}x{item?.depth}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;
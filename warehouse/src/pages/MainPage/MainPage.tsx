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

export type Item = {
    id: number;
    name: string;
    image_url: string;
    quantity: number;
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
    height: number;
    width: number;
    depth: number;
    barcode: number;
}



const MainPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [titleValue, setTitleValue] = useState<string>('')
    const linksMap = new Map<string, string>([
        ['Комплектующие', '/']
    ]);
//запрос на главной 
    const fetchItems = async () => {
        let url = 'http://172.20.10.6:7070/items'
        if (titleValue) {
            url += `?search=${titleValue}`
            console.log(titleValue, url)
        }
        try {
            const response = await fetch(url, {
                credentials: 'include'
             });
             const data = await response.json();
             const itemsData = data.items; // Извлечение массива items из объекта
             const newRecipesArr = itemsData.map((raw: ReceivedItemData) => ({
                id: raw.id,
                name: raw.name,
                image_url: raw.image_url,
                status: raw.status,
                quantity: raw.quantity,
                height: raw.height,
                width: raw.width,
                depth: raw.depth,
                barcode: raw.barcode
             }));
             setItems(newRecipesArr);
        }
        catch {
            console.log('запрос не прошел !')
            if (titleValue) {
                const filteredArray = mockItems.filter(mockItem => mockItem.name.includes(titleValue));
                setItems(filteredArray);
            }
            else {
                setItems(mockItems);
            }
        }
        
    };
    useEffect(() => {
        fetchItems();
    }, []);

    const handleSearchButtonClick = () => {
        fetchItems();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };


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
                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} value={titleValue} onChange={handleTitleValueChange} type="text" placeholder="Введите название ..." />
                        </Form.Group>
                        
                    </div>
                    
                    <Button style={{backgroundColor: "#FF9800", color: '#FFF', padding: "15px 40px", borderColor: "#000", fontSize: 18, height: 60}} onClick={() => handleSearchButtonClick()}>
                        <SearchIcon />
                    </Button>
                </Form>

                <div className={styles["content__cards"]}>
                    {items.map((item: Item) => (
                        <OneCard id={item.id} image_url={item.image_url} onButtonClick={() => console.log('add to application')} name={item.name} barcode={Number(item.barcode)}></OneCard>
                    ))}
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;
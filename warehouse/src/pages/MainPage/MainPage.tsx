import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header';
import OneCard from '../../components/Card';
import styles from './MainPage.module.scss'
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
//import Dropdown from 'react-bootstrap/Dropdown';
// import { Link } from 'react-router-dom';
// import SliderFilter from '../../components/Slider';
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
    //const [categoryValue, setCategoryValue] = useState<string>(categories[0].value)
    const [titleValue, setTitleValue] = useState<string>('')
    // const [priceValue, setPriceValue] = useState<number>()
    // const [sliderValues, setSliderValues] = useState([0, 10000]);
    const linksMap = new Map<string, string>([
        ['Комплектующие', '/']
    ]);

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

    // const handlePriceValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setPriceValue(Number(event.target.value));
    // };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    // const handleCategorySelect = (eventKey: string | null) => {
    //     if (eventKey) {
    //       const selectedCategory = categories.find(category => category.key === eventKey);
    //       if (selectedCategory) {
    //         setCategoryValue(selectedCategory.value);
    //       }
    //     }
    // };

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
                        {/* <div style={{display: 'flex', gap: 10, width: '100%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <Dropdown style={{minWidth: '40%'}} onSelect={handleCategorySelect}>
                                <Dropdown.Toggle
                                    style={{
                                    height: 60,
                                    borderColor: '#3D348B',
                                    backgroundColor: "#fff",
                                    color: '#000',
                                    width: '100%',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingRight: '1rem',
                                    fontSize: 18
                                    }}
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    {categoryValue}
                                    <i className="bi bi-chevron-down"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width: '100%', textAlign: 'left',}}>
                                    {categories.map(category => (
                                        <Dropdown.Item key={category.key} eventKey={category.key}>{category.value}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div> */}
                        
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
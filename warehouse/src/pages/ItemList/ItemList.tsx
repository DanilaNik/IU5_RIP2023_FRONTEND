import * as React from 'react';
import Header from '../../components/Header';
import BreadCrumbs from '../../components/BreadCrumbs';
import styles from './ItemList.module.scss'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../../components/Icons/SearchIcon'
import NegativeIcon from '../../components/Icons/NegativeIcon';
import { api } from '../../api';
import { GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetItemsResponse } from '../../api/Api';
import { Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/state/state';
import { setCurrentPage, setEditTitle, setTitle } from '../../components/state/user/user';
import PlusIcon from '../../components/Icons/PlusIcon';

const ItemListPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const role = useSelector((state: RootState) => state.user.role)
    const editTitle = useSelector((state: RootState) => state.user.editTitle)
    const [items, setItems] = useState<GithubComDanilaNikIU5RIP2023InternalHttpmodelsTestingGetItemsResponse>();
    
    const [linksMap, setLinksMap] = useState<Map<string, string>>(
        new Map<string, string>([['Домашняя страница', '/']])
    );

    const currentPage = useSelector((state: RootState) => state.user.currentPage)

    const getItemList = async () => {
        dispatch(setCurrentPage('Редактировать комплектующие'))

        const { data } = await api.items.itemsList({
            title: editTitle,
        },{
            withCredentials: true,
        })

        const newLinksMap = new Map<string, string>(linksMap);
        newLinksMap.set('Редактировать комплектующие', '/items/edit');
        setLinksMap(newLinksMap)
        
        data.items?.sort(function compare( a, b ) {
            if ( Number(a.id) > Number(b.id) ){
              return -1;
            }
            if ( Number(a.id) < Number(b.id) ){
              return 1;
            }
            return 0;
        })

        setItems(data);
    };

    useEffect(() => {
        getItemList()
    }, []);

    const handleSearchButtonClick = () => {
        getItemList();
    }
    

    const deleteItem = async (itemID: number) => {
        await api.items.deleteDelete(itemID, {
            withCredentials: true,
        });
        getItemList()
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div style={{paddingBottom: '3%'}}>
                    {role == "Admin" &&
                        <div>
                            <div className='w-100'>
                                <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                                    <div className='w-100'>
                                    <Form.Group style={{height: 60}} className='w-100 mb-3' controlId="search__sub.input__sub">
                                        <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 16}} value={editTitle} onChange={e => {dispatch(setEditTitle(e.target.value))}} type="text" placeholder="Введите название ..." />
                                    </Form.Group>
                                    </div>

                                    <Button style={{backgroundColor: "#FF9800", color: '#FFF', padding: "15px 40px", borderColor: "#000", fontSize: 18, height: 60}} onClick={() => handleSearchButtonClick()}>
                                        <SearchIcon />
                                     </Button>
                                </Form>
                                <div style={{ paddingBottom: 30}}> 
                                    {<Link to={"/items/create"}><Button style={{color: '#FFF', borderColor: "#000", fontSize: 16, height: 50 }} className="noOutline bg-success d-flex justify-content-center align-items-center"  onClick={() => handleSearchButtonClick()}>Создать</Button></Link>}
                                </div>
                            </div>
                        </div>
                    }
                    <Table bordered hover responsive="md" className="table w-100">
                        <thead>
                            <tr>
                            <th>№ комплектующей</th>
                            <th>Название</th>
                            <th>Код</th>
                            <th>Материал</th>
                            <th>Размеры</th>
                            <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.items?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.barcode}</td>
                                <td>{item.material}</td>
                                <td> {item?.height}x{item?.width}x{item?.depth}</td>
                                <td style={{display: 'flex', gap: '10px'}}>
                                    {<Link to={"/items/edit/" + item.id}><Button className="noOutline" style={{backgroundColor: "#232F3E", borderColor: "#000"}}>Редактировать</Button></Link>}
                                    {
                                        <Button style={{width: '30px', height: '30px', borderRadius: '15px', padding: '5px', borderColor: "red"}} className="noOutline bg-danger d-flex justify-content-center align-items-center" onClick={() => {deleteItem(Number(item.id))}}>
                                            <NegativeIcon />
                                        </Button>
                                    }
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        
    )
};
  
export default ItemListPage;
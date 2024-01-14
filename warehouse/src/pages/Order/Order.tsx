import * as React from 'react';
import Header from '../../components/Header';
import BreadCrumbs from '../../components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { mockItems } from '../../../consts'
import { api } from '../../api';
import { GithubComDanilaNikIU5RIP2023InternalHttpmodelsRequest, GithubComDanilaNikIU5RIP2023InternalHttpmodelsUserRequest } from '../../api/Api';
import { Button, Form, Table } from 'react-bootstrap';

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


const OrderPage: React.FC = () => {
    const {id} = useParams();
    const [order, setOrder] = useState<GithubComDanilaNikIU5RIP2023InternalHttpmodelsUserRequest>()

    const [linksMap, setLinksMap] = useState<Map<string, string>>(
        new Map<string, string>([['Комплектующие', '/']])
    );

    const [item, setItem] = useState<Item>();

    const navigate = useNavigate();


    const getOrder = async () => {
        let l = 0;
        if(id) {
            const { data } = await api.orders.ordersDetail(id, {
                withCredentials: true,
            })
            l = data.items?.length;
            data?.items?.sort(function compare( a, b ) {
                if ( a.id < b.id ){
                  return -1;
                }
                if ( a.id > b.id ){
                  return 1;
                }
                return 0;
              })
            setOrder(data)
            console.log(data)
        }
        if (l == 0) {
            await api.orders.deleteDelete({id: Number(id)}, {
                withCredentials: true,
            });
            navigate("/")
        };
    };
     
    const addItem = async (itemID: number) => {
        const {data} = await api.items.postCreate(itemID, {
            withCredentials: true,
        });
        await getOrder()
    };

    const deleteItem = async (itemID: number) => {
        const {data} = await api.orders.itemsDelete(String(itemID), {
            withCredentials: true,
        });
        await getOrder()
    };

    const approveOrder = async () => {
        await api.orders.makeUpdate({
            withCredentials: true,
        });

        navigate("/")
    }

    const deleteOrder = async () => {
        await api.orders.deleteDelete({id: Number(id)}, {
            withCredentials: true,
        });
        navigate("/")
    }

    useEffect(() => {
        getOrder()
    }, []);

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div>
                    <Table striped bordered hover responsive="md" className="table w-100">
                        <thead>
                            <tr>
                            <th>№ услуги</th>
                            <th>Название</th>
                            <th>Код</th>
                            <th>Материал</th>
                            <th>Количество</th>
                            {order?.request?.status == "draft" && <th>Действие</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {order?.items?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td><Link to={"/items/"+item.id}>{item.name}</Link></td>
                                <td>{item.barcode}</td>
                                <td>{item.material}</td>
                                <td>{item.quantityInRequest}</td>
                                <td>
                                    <Button onClick={() => {addItem(item.id)}} >Добавить</Button>
                                    <Button onClick={() => {deleteItem(item.id)}}>Удалить</Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    {order?.request?.status == "draft" && <Button onClick={approveOrder} variant="success" className="m-3" style={{width: '200px'}}>Подтвердить заказ</Button>}
                    {order?.request?.status == "draft" && <Button onClick={deleteOrder} variant="danger" className="m-3" style={{width: '200px'}}>Удалить заказ</Button>}
                </div>
            </div>
        </div>
        
    )
};
  
export default OrderPage;
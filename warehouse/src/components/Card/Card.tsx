import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import styles from './Card.module.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/state';
import { api } from '../../api';

export type CardProps = {
  id?: number;
  name: React.ReactNode;
  image_url?: string;
  barcode?: React.ReactNode;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
  callback: Function;
};

const OneCard: React.FC<CardProps> = ({id, name, barcode, image_url, onButtonClick, onImageClick, callback}) => {
  const login = useSelector((state: RootState) => state.user.login)
  const add = async () => {
    const {data} = await api.items.postCreate(id, {
      withCredentials: true,
    })
    callback()
  }

  return (
    <Card>
      <Link to={`/items/${id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', overflow: 'hidden'}}>
          <Image
            style={{ cursor: 'pointer', width: '100%', height: '200px', objectFit: 'cover', objectPosition: '50% 50%' }}
            onClick={onImageClick}
            src={image_url ? image_url : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
            rounded
          />
        </div>
      </Link>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='pt-3'>{name}</Card.Title>
        <Card.Text>Код: {barcode}</Card.Text>
        <div className='mt-auto w-100' style={{position: 'relative', height: 60, display: 'flex', justifyContent: 'space-between'}}>
        {<Link to={`/items/${id}`}><Button style={{ backgroundColor: '#000', color: '#FFF', padding: '15px 30px', borderColor: "#000", fontSize: 18 }}  className={styles.btn} onClick={onImageClick} variant="primary">Подробнее</Button></Link>}
        {login != '' && <Button style={{ backgroundColor: '#000', color: '#FFF', padding: '15px 30px', borderColor: "#000", fontSize: 18 }}  className={styles.btn} onClick={add} variant="primary">Добавить</Button>}
        </div>

        {/* <div className='mt-auto w-100' style={{position: 'relative', height: 60}}>
          {login != '' &&  <Button style={{ backgroundColor: '#000', color: '#FFF', padding: '15px 30px', borderColor: "#000", position: 'absolute', right: 0, marginBottom: 50, fontSize: 18 }} onClick={onImageClick} variant="primary">Подробнее</Button>}
        </div>
        <div className='mt-auto w-100' style={{position: 'relative', height: 60}}>
          {login != '' &&  <Button style={{ backgroundColor: '#000', color: '#FFF', padding: '15px 30px', borderColor: "#000", position: 'absolute', right: 0, marginBottom: 50, fontSize: 18 }} onClick={add} variant="primary">Добавить</Button>}
        </div> */}
         
      </Card.Body>
    </Card>
  );
};

export default OneCard;
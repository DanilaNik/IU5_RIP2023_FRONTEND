import * as React from 'react';
import Header from '../../components/Header';
import BreadCrumbs from '../../components/BreadCrumbs';
import styles from './ItemCreatePage.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem } from '../../api/Api';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../components/state/state';
import { setCurrentPage } from '../../components/state/user/user';
import { URL } from 'whatwg-url';


const ItemCreatePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const role = useSelector((state: RootState) => state.user.role)
    const [currentItem, setCurrentItem] = useState<GithubComDanilaNikIU5RIP2023InternalHttpmodelsItem>({})
    const [name, setName] = useState(currentItem?.name);
    const [quantity, setQuantity] = useState(currentItem?.quantity);
    const [material, setMaterial] = useState(currentItem?.material);
    const [height, setHeight] = useState(currentItem?.height);
    const [width, setWidth] = useState(currentItem?.width);
    const [depth, setDepth] = useState(currentItem?.depth);
    const [barcode, setBarcode] = useState(currentItem?.barcode);
    const [img, setImg] = useState(currentItem?.image_url);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams()
    
    const [linksMap, setLinksMap] = useState<Map<string, string>>(
        new Map<string, string>([['Домашняя страница', '/'], ['Редактировать комплектующие', '/items/edit'], ['Создать', '/items/create']])
    );
    
    const currentPage = useSelector((state: RootState) => state.user.currentPage)


    useEffect(() => {
        currentItem.material = material
        setCurrentItem(currentItem)
    }, []);
    
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState<File>();
    const handleImageChange = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0];
        setImageFile(file)
        const reader = new FileReader();
      
        reader.onload = (e) => {
          setImage(String(e?.target?.result));
        };
      
        if (file) {
          reader.readAsDataURL(file);
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    const save = async () => {
        console.log("Save run")
        if (!name || name == '' || !quantity || quantity == 0 || !material || material == '' || !height || height == 0 || !width || width == 0 || !depth || depth == 0 || !barcode || barcode == 0) {
            return
        }
        console.log(currentItem)
        await uploadFile()
        if (currentItem) {
            console.log("if currentItem run")
            const { data } = await api.items.postCreate2(currentItem,
            {
            withCredentials: true,
            });
            console.log("post request done")
            await new Promise(r => setTimeout(r, 500));
            if (data.name != undefined) {
                navigate("/items/edit")
            }
        }

    }
    

    const uploadFile = async () => {
        console.log("uploadFile run")
        if (!imageFile) {
            console.log("if !imageFile")
          return
        }
        const { data } = await api.items.imageCreate({
          file: imageFile,
          metadata: ""
        })
        console.log("request done")
        if (data.link != undefined) {
            console.log("data.link != undefined run")
            let img_link = new URL(data.link)
            let convertLink = ":" + img_link.port + img_link.pathname
            currentItem.image_url = convertLink
            setCurrentItem(currentItem)
            setImg(currentItem?.image_url)   
        }
    };
  

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div style={{paddingBottom: '3%'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Form className='w-75 m-3' onSubmit={handleSubmit}>
                            <Form.Group className='m-3'>
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={name}
                                onChange={(e) => {
                                currentItem.name = e.target.value
                                setCurrentItem(currentItem)
                                setName(currentItem?.name)
                                }}
                            />
                            </Form.Group>
                    
                            <Form.Group className='m-3'>
                            <Form.Label>Материал</Form.Label>
                            <Form.Select
                                required
                                as="select"
                                value={material}
                                defaultValue=""
                                onChange={(e) =>{
                                    currentItem.material = e.target.value
                                    setCurrentItem(currentItem)
                                    setMaterial(currentItem?.material)
                                }}
                                aria-label="Выберите материал" className='mb-3' id='material'
                            >   
                                <option value="">Выберите материал</option>
                                <option value="металл">металл</option>
                                <option value="композит">композит</option>
                                <option value="резина">резина</option>
                                <option value="пластмасса">пластмасса</option>
                            </Form.Select>
                            </Form.Group>
                    
                            <Form.Group className='m-3'>
                            <Form.Label>Код</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                pattern="[0-9]{13}"
                                title="Код должен состоять из 13 цифр"
                                value={barcode}
                                maxLength={13}
                                style={{borderColor: error ? 'red' : ''}}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 13) {
                                        currentItem.barcode = Number(value);
                                        setCurrentItem(currentItem);
                                        setBarcode(currentItem?.barcode);
                                        setError('');
                                    }else {
                                        setError("Код должен состоять из 13 цифр");
                                    }
                                }}
                            />
                            </Form.Group>

                            <Form.Group className='m-3'>
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 13 && Number(value) < Number.MAX_VALUE) {
                                        currentItem.quantity = Number(e.target.value)
                                        setCurrentItem(currentItem)
                                        setQuantity(currentItem?.quantity)
                                    }else {
                                        alert("Слишком большое значение");
                                    }
                                }}
                                min={1}
                            />
                            </Form.Group>

                            <Form.Group className='m-3'>
                            <Form.Label>Высота</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={height}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < Number.MAX_VALUE) {
                                        currentItem.height = Number(e.target.value)
                                        setCurrentItem(currentItem)
                                        setHeight(currentItem?.height)
                                    } else {
                                        alert("Слишком большое значение");
                                    }
                                }}
                                min={1}
                            />
                            </Form.Group>

                            <Form.Group className='m-3'>
                            <Form.Label>Ширина</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={width}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < Number.MAX_VALUE) {
                                        currentItem.width = Number(e.target.value)
                                        setCurrentItem(currentItem)
                                        setWidth(currentItem?.width)
                                    }else {
                                        alert("Слишком большое значение");
                                    }
                                }}
                                min={1}
                            />
                            </Form.Group>

                            <Form.Group className='m-3'>
                            <Form.Label>Глубина</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={depth}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < Number.MAX_VALUE) {
                                        currentItem.depth = Number(e.target.value)
                                        setCurrentItem(currentItem)
                                        setDepth(currentItem?.depth)
                                    }else {
                                        alert("Слишком большое значение");
                                    }
                                }}
                                min={1}
                            />
                            </Form.Group>

                            <Button variant='success' className='m-3'><label htmlFor='file'>Загрузить картинку</label></Button>
                            <input id='file' className='m-3' style={{visibility: 'hidden'}} type="file" onChange={handleImageChange} />

                            {image && <div className='m-3'>Новая картинка</div>}
                            <br></br>
                            {image && <Image className='m-3' src={image} style={{height: '200px'}} />}
                            <br></br>
                            <Button variant='success' className='m-3' onClick={save} type="submit">Сохранить</Button>
                            </Form>                          
                        </div>                
                </div>
            </div>
        </div>
        
    )
};
  
export default ItemCreatePage;
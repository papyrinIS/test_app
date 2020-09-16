import React from 'react';
import './App.css';

const App = () => {
    const [show, setShow] = React.useState(false)
    const [arrayImg, setArrayImg] = React.useState([])

    const dragEnterHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        setShow(true)
    }

    const dragLeaveHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        setShow(false)
    }

    const dropHandler = async e => {
        e.preventDefault()
        e.stopPropagation()
        let file = e.dataTransfer.files[0]
        let typeList = file.type.split('/')
        if (typeList[0] === 'image') {
            const base64 = await convertBase64(file)
            let repeatImg = arrayImg.filter(f => f === base64)
            if (!repeatImg.length)
                setArrayImg([...arrayImg, base64])
            setShow(false)
        }
    }

    const convertBase64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }


    const sendHandler = () => console.log(arrayImg)


    return (
        <div className="App">
            <div className='window'>
                {!show
                    ? <div onDragEnter={dragEnterHandler}
                           onDragLeave={dragLeaveHandler}
                           onDragOver={dragEnterHandler}
                           className='container'>
                        перетащите файл сюда
                    </div>
                    : <div onDrop={dropHandler}
                           onDragEnter={dragEnterHandler}
                           onDragLeave={dragLeaveHandler}
                           onDragOver={dragEnterHandler}
                           className='containerSave'>
                        сохранить файл
                    </div>
                }
            </div>
            <div className='images'>
                {arrayImg && <div className='imagesContainer'>
                    {arrayImg.map((m, index) => <div className='imageContainer' key={index}>
                        <img className='img'
                             src={m}
                             alt='img'/>
                    </div>)
                    }
                </div>
                }
                <button onClick={sendHandler}>отправить</button>
            </div>
        </div>
    );
}

export default App;
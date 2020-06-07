import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './style.css';

/*
Criando uma interface para aceitar a função
criada CreatePoint chamada de onFileUploaded
 */
interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);
        
        console.log(fileUrl);
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
        console.log(acceptedFiles);
        
    }, [onFileUploaded])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            {/* JS para fazer o preview da imagem dentro do input */}
            {
                selectedFileUrl
                    ? <img src={selectedFileUrl} alt="Point thumbnail"/>
                    : (
                        <p>
                            <FiUpload />
                            Clique ou arras para inserir a imagem do estabelecimento
                        </p>
                    )
            }

        </div>
    )
}

export default Dropzone;
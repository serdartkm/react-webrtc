import React,{useState, useEffect} from 'react'

const BYTES_PER_CHUNK= 100;
export default function useFileReader (){
    const [files,setFiles] = useState(null);
    const [file,setFile] =useState(null);
    const [slices,setSlices]= useState([])
    const [fileChunk, setFileChunk] =useState(null);
    const [reader,setReader]=useState(null);


    useEffect(()=>{
        createFileReader()

    },[])
    useEffect(()=>{
        if(files){
            setFile(files[0])
            debugger;
        }
    },[files])
    useEffect(()=>{
        if(file){
            sliceFile(file);
        }
    },[file])
    function handleFileChange (e){
        setFiles(e.target.files);
    }

    function createFileReader (){
        let rd = new FileReader();

        rd.onabort =()=>{

        }

        rd.onerror =()=>{

        }

        rd.onloadstart =()=>{

        }
        rd.onloadend =(r)=>{
            if (r.target.readyState === FileReader.DONE) {
                var chunk = r.target.result
                setFileChunk(chunk)
            }
        }

        rd.onprogress =()=>{

        }

        rd.onabort =()=>{

        }

        setReader(rd)
    }

    function sliceFile(file){
        const size =file.size;
        let start =0;
            for (start; start < size; start * BYTES_PER_CHUNK){
                let end = Math.min(file.size, start + BYTES_PER_CHUNK)
                setSlices(prev => [...prev,{start,end}])
            }
    }


    function handleReadFileBySlice (){
        for (let slice in slices){
            if(slice){
                reader.readAsArrayBuffer(file.slice(slice.start, slice.end))
            }
        }
   
    }

 
    return {handleFileChange, reader, fileChunk, handleReadFileBySlice}
}
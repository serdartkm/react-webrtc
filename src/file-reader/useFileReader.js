import {useState, useEffect} from 'react'

const BYTES_PER_CHUNK= 100;
export default function useFileReader (){
    const [files,setFiles] = useState(null);
    const [file,setFile] =useState(null);
    const [slices,setSlices]= useState([])
    const [fileChunk, setFileChunk] =useState(null);
    const [reader,setReader]=useState(null);
    const [error,setError] =useState(null);
    const [nextSlice,setNextSlice] =useState(0);
    const [readProgress,setReadProcess]= useState(0);
    useEffect(()=>{
        if(slices){
            createFileReader()
        }
     
    },[slices])
    useEffect(()=>{
        if(files){
            setFile(files[0])
        }
    },[files])
    useEffect(()=>{
        if(file){
         
            sliceFile(file);
        }
    },[file])

  useEffect(()=>{
      if(nextSlice && nextSlice < slices.length){
         
  
            let progress =(((nextSlice* BYTES_PER_CHUNK) * 100)/ file.size ).toFixed()
            setReadProcess(Number.parseInt(progress))
          
      
      }
  },[nextSlice,slices])

  useEffect(()=>{
      if(readProgress ===100){
    
      }
  },[readProgress])

    function handleFileChange (e){
        setFiles(e.target.files);
    }

    function createFileReader (){
        let rd = new FileReader();

        rd.onabort =()=>{

        }

        rd.onerror =(err)=>{
            setError(err);
            debugger;
        }

        rd.onloadstart =()=>{

        }
        rd.onloadend =(r)=>{
        
            if (r.target.readyState === FileReader.DONE) {
                var chunk = r.target.result
                setFileChunk(chunk)
                if(nextSlice <= slices.length){
                    setNextSlice(prev =>  ++ prev)
                }
            }
        }

        rd.onprogress =(e)=>{
          
        }

        rd.onabort =()=>{

        }

        setReader(rd)
    }

    function sliceFile(file){
        const size =file.size;
        let start =0;
        let list =[]
            while(start< size){
                let end = Math.min(size, start+ BYTES_PER_CHUNK)
                list.push({start,end})
                start =start+ BYTES_PER_CHUNK;
            }
            setSlices(list);
    }


    function startReadingFileBySlice (){
       if(nextSlice <slices.length){
        readNextSlice()
       }
   
    }

     function readNextSlice (){
        reader.readAsArrayBuffer(file.slice(slices[nextSlice].start, slices[nextSlice].end))
     }
    return {handleFileChange, file, fileChunk, startReadingFileBySlice,error, readProgress}
}
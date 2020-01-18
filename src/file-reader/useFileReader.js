/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'

const BYTES_PER_CHUNK= 100;
export default function useFileReader (){
    const [files,setFiles] = useState(null);
    const [file,setFile] =useState(null);
    const [slices,setSlices]= useState([])
    const [fileChunk, setFileChunk] =useState(null);
    const [reader,setReader]=useState(null);
    const [readComplete,setReadComplete]= useState(false);
    const [error,setError] =useState(null);
    const [nextSlice,setNextSlice] =useState(0);
    const [readProgress,setReadProcess]= useState(0);
    const [bytesRead,setBytesRead]= useState(0)

   
  

    // 1. Create FileReader on component's first mount
    useEffect(()=>{
        if(slices){
            createFileReader()
        }
     
    },[slices])

    //2.file state changes after user selects a file
    useEffect(()=>{
        if(files){
            setFile(files[0])
        }
    },[files])

    //4. After file state chage files gets sliced and put into slices array for later use
    useEffect(()=>{
        if(file){
         
            sliceFile(file);
        }
    },[file])
 
    //5.After File slice gets read by File Reader setBytesRead
    useEffect(()=>{
        if(fileChunk){
          
            let progress =(((bytesRead + fileChunk.byteLength)/ file.size)*100 ).toFixed()
            setReadProcess(Number.parseInt(progress))
        }
 
    },[fileChunk])

    //6.After bytesRead change set readProgress

    useEffect(()=>{
    
          if(file && bytesRead=== file.size){
            setReadComplete(true)
          }
        
    },[bytesRead])

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
                setBytesRead(preState => preState + chunk.byteLength)
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
      
        if(nextSlice < slices.length){
         
            reader.readAsArrayBuffer(file.slice(slices[nextSlice].start, slices[nextSlice].end))
            setNextSlice(prev =>  ++ prev)
    
        
        }
   
    }

    return {handleFileChange, file, fileChunk, startReadingFileBySlice,error, readProgress,readComplete}
}
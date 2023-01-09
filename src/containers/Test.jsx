import { Configuration, OpenAIApi  } from "openai";
import { useEffect, useState } from "react";

function Test() {
    
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_AI_KEY
    })

    const [dataArr, setDataArr] = useState([])

    const [isLoading, setIsloading] = useState(false)

    const [input, setInput] = useState("")

    const openai = new OpenAIApi(configuration)

    const makeApi = async ()=>{
        let a = await openai.createImage({
            prompt: input,
            n: 1,
            size: "1024x1024"
        })
        let data =  a.data
        setDataArr([data.data[0].url, ...dataArr])
        setIsloading(false)
    }


    const handleClick = ()=>{
        setIsloading(true)
        makeApi()
    }

    const handleOnChange = (e)=>{
        setInput(e.target.value)
    }

    console.log(dataArr);
    return (
        <>
            <div className="flex gap-[40px] justify-center items-center">
                <h1 className="text-xl">Generate</h1>
                <input className="bg-slate-200 p-3" type="text" onChange={handleOnChange} value={input} />
                <button className="bg-blue-500 px-[30px] py-[10px] text-white rounded hover:bg-blue-400" onClick={handleClick}>generate</button>
            </div>
            {isLoading && <p>Loading...</p>}
            <div className="flex justify-center flex-col gap-[50px my-[50px]">
              {dataArr.map(val=>{
                return <div className="flex justify-center"> <img class="w-[80%]" src={val} alt="" /> </div> 
              })}
            </div>
        </>
    )
}

export default Test;
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [news, setNews] = useState([])
  const apilayerKey: string = localStorage.getItem(`key`)||``
  let myHeaders = new Headers();
  myHeaders.append("apikey", apilayerKey);
  // console.log(myHeaders)
  
  let requestOptions: RequestInit  = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
    mode : 'cors'
  };
  
  useEffect(() => {
    const url= `https://api.apilayer.com/financelayer/news?date=today&limit=100`
    fetch(url, requestOptions)
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(data => {
      console.log(data)
      setNews(data.data)
      // toast(`SUCCESS`)
    })
    .catch(error => console.log('error', error));
  },[])
  return (
    <>
      <div className="">
        <h1>Finance News Today</h1>
        <section>
          {news && news.map((newsItem: any,index) => {
            return <details key={index}>
            <summary>
              <h2>
                {newsItem.title}
              </h2>
            </summary>
            <p>{newsItem.description}</p>
            <p>
              Read More: {` `}
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
              {newsItem.source}
            </a>
            </p>
          </details>
            // return <li key={index}>
            //   <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
            //     {newsItem.title}
            //   </a>
            // </li>
          })}
        </section>
      </div>
    </>
  )
}

export default App

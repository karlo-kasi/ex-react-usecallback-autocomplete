import { useState, useEffect, useCallback } from 'react'

function App() {

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])




  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const fechData = async (query) => {

    if (!query.trim()) {
      setSuggestions([])
      return
    }

    try {
      const response = await fetch(`http://localhost:5001/products?search=${query}`)
      const data = await response.json()
      setSuggestions(data)
      console.log("chiamata fatta")

    } catch (error) {
      console.error(error)
    }
  }

  const debounceFechProduct = useCallback(
    debounce(fechData, 500)
    , [])


  useEffect(() => {

    debounceFechProduct(query)

  }, [query])


  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-6'>
            <h1 className='text-center'>Autocomplete</h1>
            <input
              type="text"
              className="form-control mx-auto"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
              <div className='dropdown mt-4'>
                {
                  suggestions.map((pro) => {
                    return (
                      <p key={pro.id}>{pro.name}</p>
                    )
                  })
                }
              </div>
            )}
          </div>
        </div>
      </div>


    </>
  )
}

export default App

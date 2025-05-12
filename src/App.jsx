import { useState, useEffect, useCallback } from 'react'

function App() {

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(null)

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

  const fechProductsDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/products/${id}`)
      const data = await response.json()
      setSelectedProducts(data)
      setQuery("")
      setSuggestions([])
    } catch (error) {
      console.log(error)
    }


  }


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
                      <p
                        key={pro.id}
                        onClick={() => fechProductsDetails(pro.id)}
                      >
                        {pro.name}
                      </p>
                    )
                  })
                }
              </div>
            )}
            {
              selectedProducts && (
                <div className='card p-4 m-4'>
                  <h2>{selectedProducts.name}</h2>
                  <img src={selectedProducts.image} alt={selectedProducts.name} />
                  <p>{selectedProducts.description}</p>
                  <p>{selectedProducts.price}€</p>
                </div>
              )
            }
          </div>
        </div>
      </div>


    </>
  )
}

export default App

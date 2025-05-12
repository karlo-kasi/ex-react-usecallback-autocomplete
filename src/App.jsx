import { useState, useEffect } from 'react'

function App() {

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])


  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    fetch(`http://localhost:5001/products?search=${query}`)
      .then(response => response.json())
      .then(data => setSuggestions(data))
      .catch(error => console.error(error))

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

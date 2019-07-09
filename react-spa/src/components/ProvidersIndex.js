import React, { useState, useEffect } from 'react'

import RateLine from './RateLine.js'
import RateFilter from './RateFilter.js'

const useApiFetch = () => {
  const [rates, setRates] = useState([])
  const [origins, setOrigins] = useState([])
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/api')
      res.json().then(res => {
        setRates(res)
        setOrigins([...new Set(res.map(r => r.origin))])
        setDestinations([...new Set(res.map(r => r.destination))])
      })
    }
    fetchData()
  }, [])

  return [rates, origins, destinations]
}

function ProvidersIndex() {
  const [rates, origins, destinations] = useApiFetch()
  const [originFilter, setOriginFilter] = useState('')
  const [destFilter, setDestFilter] = useState('')

  const filteredRates = rates.map(rate => {
    if (originFilter !== '' && rate.origin !== originFilter) return null
    if (destFilter !== '' && rate.destination !== destFilter) return null

    return <RateLine rate={rate} key={rate.id} />
  })

  return (
    <div className="ProvidersIndex">
      <div className="filters">
        <div>
          Origins&nbsp;
          <RateFilter
            options={origins}
            current={originFilter}
            setFilter={setOriginFilter}
          />
        </div>
        <div>
          Destinations&nbsp;
          <RateFilter
            options={destinations}
            current={destFilter}
            setFilter={setDestFilter}
          />
        </div>
      </div>
      <h2>Providers</h2>
      <ul>
        <li className="title">
          <div>Company Name</div>
          <div>Total</div>
        </li>
        {filteredRates}
      </ul>
    </div>
  )
}

export default ProvidersIndex

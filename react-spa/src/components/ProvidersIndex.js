import React, { useState, useEffect } from 'react'

import RateLine from './RateLine.js'

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

  const filteredRates = rates.map(rate => (
    <RateLine rate={rate} key={rate.id} />
  ))

  return (
    <div className="ProvidersIndex">
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

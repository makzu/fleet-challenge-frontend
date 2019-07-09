import React from 'react'

const RateFilter = ({ options, current, setFilter }) => (
  <select onChange={e => setFilter(e.target.value)}>
    <option value="">No Filter</option>
    {options.map(o => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
)

export default RateFilter

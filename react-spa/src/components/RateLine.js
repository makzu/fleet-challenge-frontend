import React from 'react'

const USDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export default function RateLine({ rate }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: rate.amount_currency
  })
  return (
    <li>
      <div>{rate.name}</div>
      <div>
        {rate.origin} - {rate.destination}
      </div>
      <div>
        {formatter.format(rate.amount_cents / 100)} (
        {USDFormatter.format(rate.common_amount_cents / 100)})
      </div>
    </li>
  )
}

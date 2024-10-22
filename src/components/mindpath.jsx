import React from 'react'

function mindpath({parsedData}) {

  console.log('parsedData', parsedData)
  return (
    <div>mindpath</div>
  )
}

export function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default mindpath
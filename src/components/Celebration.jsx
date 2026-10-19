export function Celebration() {
  return (
    <svg className="celebration" viewBox="0 0 400 160" fill="none" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => {
        const angle = index * Math.PI * 2 / 18
        return <circle key={index} cx="200" cy="105" r={index % 3 === 0 ? 4 : 2.5}
          fill={['#D8CBB7', '#0B1E35', '#FFFFFF'][index % 3]}
          style={{ '--burst-x': `${Math.cos(angle) * 145}px`, '--burst-y': `${Math.sin(angle) * 90 - 35}px`, '--burst-delay': `${index % 4 * 35}ms` }}/>
      })}
    </svg>
  )
}

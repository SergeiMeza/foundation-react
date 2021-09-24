import useToggle from '../lib/hooks/foundation/useToggle'

export const Toggle1Component = () => {
  const [state, { toggle }] = useToggle()

  return (
    <div>
      <p>Effects:{`${state}`}</p>
      <p>
        <button type='button' onClick={() => toggle()}>
          Toggle
        </button>
        <button
          type='button'
          onClick={() => toggle(false)}
          style={{ margin: 'o 8px' }}
        >
          Toggle False
        </button>
        <button type='button' onClick={() => toggle(true)}>
          Toggle True
        </button>
      </p>
    </div>
  )
}

export const Toggle2Component = () => {
  const [state, { toggle, setLeft, setRight }] = useToggle('Hello', 'World')

  return (
    <div>
      <p>Effects:{`${state}`}</p>
      <p>
        <button type='button' onClick={() => toggle()}>
          Toggle
        </button>
        <button
          type='button'
          onClick={() => toggle('Hello')}
          style={{ margin: 'o 8px' }}
        >
          Toggle Hello
        </button>
        <button type='button' onClick={() => toggle('World')}>
          Toggle World
        </button>
        <button type='button' onClick={setLeft} style={{ margin: 'o 8px' }}>
          Set Hello
        </button>
        <button type='button' onClick={setRight}>
          Set World
        </button>
      </p>
    </div>
  )
}

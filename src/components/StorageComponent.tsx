import { StrictMode } from 'react'
import {
  useLocalStorage,
  useSessionStorage,
} from '../lib/hooks/foundation/useStorage'

export const StorageComponent = () => (
  <StrictMode>
    <InnerStorageComponent />
  </StrictMode>
)

const InnerStorageComponent = () => {
  const [name, setName, removeName] = useLocalStorage('name', 'Meza')

  return (
    <div>
      <StrictMode>
        <div>
          <h1>Local Storage</h1>
          <div>name: {name}</div>
          <button onClick={() => setName('Rodriguez')}>Set Name</button>
          <button onClick={removeName}>Remove Name</button>
        </div>
      </StrictMode>
    </div>
  )
}

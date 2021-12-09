import { DependencyList, EffectCallback } from 'react';
import { DebounceOptions } from './DebounceOptions';
/**
 * Debounce your useEffect.
 */
export default function useDebounceEffect(effect: EffectCallback, deps?: DependencyList, options?: DebounceOptions): void;

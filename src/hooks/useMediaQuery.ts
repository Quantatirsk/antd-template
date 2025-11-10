/**
 * useMediaQuery Hook
 *
 * 媒体查询：响应式设计
 */

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // 直接更新匹配状态的函数
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    // 设置初始值
    updateMatches();

    // 监听变化
    mediaQuery.addEventListener('change', updateMatches);

    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}

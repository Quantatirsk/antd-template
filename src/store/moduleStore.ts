/**
 * 模块系统状态管理
 *
 * 演示容器页模式的状态管理：
 * - 选中的项目/文档/任务
 * - 当前激活的子模块
 * - 侧边栏折叠状态
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SubModule = 'data' | 'list' | 'detail' | 'layout' | 'modal';

interface ModuleState {
  // ==================== 选中状态 ====================
  selectedItemId: number | null;
  selectedCategoryId: number | null;

  // ==================== 视图状态 ====================
  activeSubModule: SubModule;

  // ==================== 侧边栏状态 ====================
  leftCollapsed: boolean;
  rightCollapsed: boolean;

  // ==================== Actions ====================

  // 选择操作
  selectItem: (id: number | null) => void;
  selectCategory: (id: number | null) => void;

  // 模块切换
  setActiveSubModule: (module: SubModule) => void;

  // 侧边栏操作
  setLeftCollapsed: (collapsed: boolean) => void;
  setRightCollapsed: (collapsed: boolean) => void;

  // 重置
  reset: () => void;
  resetSelection: () => void;
}

const initialState = {
  selectedItemId: null,
  selectedCategoryId: null,
  activeSubModule: 'data' as SubModule,
  leftCollapsed: false,
  rightCollapsed: false,
};

export const useModuleStore = create<ModuleState>()(
  persist(
    (set) => ({
      ...initialState,

      // 选择操作
      selectItem: (id) => set({ selectedItemId: id }),
      selectCategory: (id) => set({ selectedCategoryId: id }),

      // 模块切换
      setActiveSubModule: (module) => set({ activeSubModule: module }),

      // 侧边栏操作
      setLeftCollapsed: (collapsed) => set({ leftCollapsed: collapsed }),
      setRightCollapsed: (collapsed) => set({ rightCollapsed: collapsed }),

      // 重置
      reset: () => set(initialState),
      resetSelection: () =>
        set({
          selectedItemId: null,
          selectedCategoryId: null,
        }),
    }),
    {
      name: 'module-storage',
      partialize: (state) => ({
        activeSubModule: state.activeSubModule,
        leftCollapsed: state.leftCollapsed,
        rightCollapsed: state.rightCollapsed,
      }),
    }
  )
);

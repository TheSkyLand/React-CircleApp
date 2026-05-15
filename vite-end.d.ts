/// <reference types="vite/client" />

// 1. Для обычных глобальных стилей (импорт без переменной)
declare module '*.scss' {
  const content: void;
  export default content;
}



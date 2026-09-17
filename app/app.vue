<script setup lang="ts">
import { PUZZLE } from './constants/puzzle';

interface CellState {
  answer1: string;
  answer2: string;
  isCorrect1: boolean | null;
  isCorrect2: boolean | null;
}

const gameState = reactive<Record<string, CellState>>({});

// Initialize game state
PUZZLE.rows.forEach(row => {
  PUZZLE.cols.forEach(col => {
    const id = `${row.id}-${col.id}`;
    gameState[id] = {
      answer1: '',
      answer2: '',
      isCorrect1: null,
      isCorrect2: null,
    };
  });
});

const verify = () => {
  PUZZLE.rows.forEach(row => {
    PUZZLE.cols.forEach(col => {
      const id = `${row.id}-${col.id}`;
      const solutions = PUZZLE.solutions[id] || [];
      const cell = gameState[id];

      if (!cell) return;

      const a1 = cell.answer1.trim().toLowerCase();
      const a2 = cell.answer2.trim().toLowerCase();

      cell.isCorrect1 = solutions.some(s => s.toLowerCase() === a1);
      cell.isCorrect2 = a2 !== '' ? solutions.some(s => s.toLowerCase() === a2) : null;
    });
  });
};

const reset = () => {
  PUZZLE.rows.forEach(row => {
    PUZZLE.cols.forEach(col => {
      const id = `${row.id}-${col.id}`;
      gameState[id] = {
        answer1: '',
        answer2: '',
        isCorrect1: null,
        isCorrect2: null,
      };
    });
  });
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-slate-800 mb-2">Nucléodoku</h1>
        <p class="text-slate-600">Pros du nucléaire, faites exploser votre culture G</p>
      </header>

      <div class="overflow-x-auto">
        <div class="inline-grid grid-cols-[auto_repeat(3,minmax(200px,1fr))] gap-2 min-w-[700px]">
          <!-- Top-left empty cell -->
          <div class="p-4"></div>

          <!-- Column Headers -->
          <div v-for="col in PUZZLE.cols" :key="col.id"
               class="p-4 text-center font-bold bg-slate-200 rounded-t-lg border-b-4 border-blue-500">
            {{ col.label }}
          </div>

          <!-- Grid Rows -->
          <template v-for="row in PUZZLE.rows" :key="row.id">
            <!-- Row Header -->
            <div class="p-4 font-bold bg-slate-200 rounded-l-lg border-r-4 border-blue-500 flex items-center">
              {{ row.label }}
            </div>

            <!-- Input Cells -->
            <div v-for="col in PUZZLE.cols" :key="col.id"
                 class="p-3 bg-white border border-slate-300 rounded-md shadow-sm flex flex-col gap-2">
              <div class="grid grid-cols-1 gap-2">
                <input
                  v-model="gameState[`${row.id}-${col.id}`].answer1"
                  type="text"
                  placeholder="Réponse 1"
                  class="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                  :class="{
                    'bg-green-100 border-green-500': gameState[`${row.id}-${col.id}`].isCorrect1 === true,
                    'bg-red-100 border-red-500': gameState[`${row.id}-${col.id}`].isCorrect1 === false,
                  }"
                />
                <input
                  v-model="gameState[`${row.id}-${col.id}`].answer2"
                  type="text"
                  placeholder="Réponse 2 (optionnel)"
                  class="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                  :class="{
                    'bg-green-100 border-green-500': gameState[`${row.id}-${col.id}`].isCorrect2 === true,
                    'bg-red-100 border-red-500': gameState[`${row.id}-${col.id}`].isCorrect2 === false,
                  }"
                />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="mt-12 flex justify-center gap-4">
        <button @click="reset"
                class="px-6 py-2 bg-slate-400 text-white font-bold rounded-full hover:bg-slate-500 transition-colors shadow-lg">
          Réinitialiser
        </button>
        <button @click="verify"
                class="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg">
          Vérifier
        </button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

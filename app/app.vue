<script setup lang="ts">
import { PUZZLE } from './constants/puzzle';

interface CellState {
  answer: string;
  isCorrect: boolean | null;
  locked: boolean;       // true once answered correctly (input frozen)
  lastChecked: string;   // avoids losing a life twice for the same unchanged wrong answer
}

const MAX_LIVES = 3;
const TOTAL_CELLS = PUZZLE.rows.length * PUZZLE.cols.length;

const gameState = reactive<Record<string, CellState>>({});
const lives = ref(MAX_LIVES);
const status = ref<'playing' | 'won' | 'lost'>('playing');

const makeEmptyCell = (): CellState => ({
  answer: '',
  isCorrect: null,
  locked: false,
  lastChecked: '',
});

const initGameState = () => {
  PUZZLE.rows.forEach(row => {
    PUZZLE.cols.forEach(col => {
      const id = `${row.id}-${col.id}`;
      gameState[id] = makeEmptyCell();
    });
  });
};

initGameState();

const solvedCount = computed(
  () => Object.values(gameState).filter(cell => cell.locked).length
);

const verify = () => {
  if (status.value !== 'playing') return;

  PUZZLE.rows.forEach(row => {
    PUZZLE.cols.forEach(col => {
      const id = `${row.id}-${col.id}`;
      const cell = gameState[id];
      if (!cell || cell.locked) return;

      const answer = cell.answer.trim().toLowerCase();
      if (answer === '') {
        cell.isCorrect = null;
        return;
      }
      // Don't re-penalize an unchanged wrong answer on repeated clicks
      if (answer === cell.lastChecked) return;
      cell.lastChecked = answer;

      const solution = (PUZZLE.solutions[id] || '').trim().toLowerCase();

      if (answer === solution) {
        cell.isCorrect = true;
        cell.locked = true;
      } else {
        cell.isCorrect = false;
        lives.value = Math.max(0, lives.value - 1);
      }
    });
  });

  if (lives.value <= 0) {
    status.value = 'lost';
  } else if (solvedCount.value === TOTAL_CELLS) {
    status.value = 'won';
  }
};

const reset = () => {
  initGameState();
  lives.value = MAX_LIVES;
  status.value = 'playing';
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-slate-800 mb-2">Nucléodoku</h1>
        <p class="text-slate-600">Pros du nucléaire, faites exploser votre culture G</p>

        <div class="mt-4 flex justify-center gap-2 text-3xl" aria-label="Vies restantes">
          <span v-for="i in MAX_LIVES" :key="i">
            {{ i <= lives ? '❤️' : '🖤' }}
          </span>
        </div>
      </header>

      <!-- End-of-game message -->
      <div
        v-if="status !== 'playing'"
        class="mb-8 p-6 rounded-xl text-center text-xl font-bold shadow-lg"
        :class="status === 'won'
          ? 'bg-green-100 text-green-800 border-2 border-green-500'
          : 'bg-red-100 text-red-800 border-2 border-red-500'"
      >
        <p v-if="status === 'won'">🎉 Bravo, vous avez réussi le Nucléodoku !</p>
        <p v-else>💥 Perdu ! Vous avez épuisé vos 3 vies.</p>
      </div>

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

            <!-- Input Cell -->
            <div v-for="col in PUZZLE.cols" :key="col.id"
                 class="p-3 bg-white border border-slate-300 rounded-md shadow-sm flex flex-col gap-2">
              <input
                v-model="gameState[`${row.id}-${col.id}`].answer"
                type="text"
                placeholder="Réponse"
                :disabled="gameState[`${row.id}-${col.id}`].locked || status !== 'playing'"
                @keyup.enter="verify"
                class="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all disabled:opacity-70"
                :class="{
                  'bg-green-100 border-green-500': gameState[`${row.id}-${col.id}`].isCorrect === true,
                  'bg-red-100 border-red-500': gameState[`${row.id}-${col.id}`].isCorrect === false,
                }"
              />
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
                :disabled="status !== 'playing'"
                class="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600">
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

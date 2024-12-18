<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-7">
		<!-- Polindrom Checker Card -->
		<div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md px-2">
			<h1 class="text-xl font-bold text-white text-center mb-4">
				Palindrome Checker
			</h1>
			<div class="relative">
				<input
					v-model="str"
					type="text"
					class="input-container w-full border focus:outline-none focus:ring-2 focus:ring-purple-500"
					:class="{
						'border-red-400 text-red-500': !isPolindrom && textResult,
					}"
					placeholder="Enter a sentence to check"
				/>
				<div v-if="textResult" class="mt-2 text-sm font-semibold">
					<span
						:class="{
							'text-red-500': !isPolindrom,
							'text-green-500': isPolindrom,
						}"
					>
						{{ textResult }}
					</span>
				</div>
			</div>
			<div class="flex justify-between mt-6 gap-2">
				<button class="btn-primary w-full" @click="checkIsPolindrom">
					Check
				</button>
				<button
					class="btn-secondary w-full"
					@click="saveCheck"
					:disabled="!isCheckValidate"
				>
					Save {{ !isCheckValidate }}
				</button>
			</div>
		</div>

		<!-- Table -->
		<div class="overflow-x-auto mt-8 w-full max-w-4xl">
			<table
				class="min-w-full table-auto border-collapse border border-gray-200">
				<thead>
					<tr class="bg-gray-700 text-white">
						<th
							class="px-6 py-3 text-left font-semibold border-b border-gray-300">
							#
						</th>
						<th
							class="px-6 py-3 text-left font-semibold border-b border-gray-300">
							Sentence
						</th>
						<th
							class="px-6 py-3 text-left font-semibold border-b border-gray-300">
							Result
						</th>
						<th
							class="px-6 py-3 text-left font-semibold border-b border-gray-300">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in savedChecks"
						:key="index"
						class="even:bg-neutral-900">
						<td class="px-6 py-3 border-b border-gray-300">
							{{ index + 1 }}
						</td>
						<td class="px-6 py-3 border-b border-gray-300">
							{{ item.sentence }}
						</td>
						<td
							class="px-6 py-3 border-b border-gray-300"
							:class="item.isPolindrom ? 'text-green-500' : 'text-red-500'">
							{{ item.isPolindrom ? 'Palindrome' : 'Not Palindrome' }}
						</td>
						<td class="px-6 py-3 border-b border-gray-300">
							<button
								class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								@click="deleteCheck(index)">
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Reactive variables
const str = ref<string>('');
const savedChecks = ref<{ sentence: string; isPolindrom: boolean }[]>([]);
const isPolindrom = ref<boolean>(false);
const textResult = computed(() =>
	isPolindrom.value
		? 'This is a Palindrome sentence.'
		: 'This is NOT a Palindrome sentence.'
);

const isCheckValidate = ref<boolean>(false);

// Methods
const checkIsPolindrom = (): void => {
	const strCopy = str.value.replace(/\s+/g, '').toLowerCase();
	const reverseStr = strCopy.split('').reverse().join('');
	isPolindrom.value = strCopy === reverseStr;
  isCheckValidate.value = true;
};

const saveCheck = (): void => {
  if (!str.value.trim()) {
    alert('Please enter a valid sentence.');
		return;
	}

  console.log('hgalo : ', str.value);
	savedChecks.value.push({ sentence: str.value, isPolindrom: isPolindrom.value });
	str.value = '';
	alert('Saved successfully.');
  isCheckValidate.value = false;
};

const deleteCheck = (index: number): void => {
	savedChecks.value.splice(index, 1);
};
</script>

<style scoped>
.input-container {
	@apply py-3 px-4 bg-gray-700 text-white font-medium rounded-lg placeholder-gray-400 transition-all duration-300;
}

.btn-primary {
	@apply bg-purple-600 text-white py-2 px-5 rounded-lg shadow hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
	@apply bg-gray-600 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Responsive Design */
@media (max-width: 640px) {
	.input-container {
		@apply text-sm py-2 px-3;
	}

	.btn-primary,
	.btn-secondary {
		@apply py-1 px-4 text-sm;
	}
}
</style>

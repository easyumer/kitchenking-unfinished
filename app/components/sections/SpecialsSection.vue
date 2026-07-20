<script setup>
import imgOxtailSliders from '~/assets/images/special-oxtail-sliders.jpg'
import imgOxtailNachos from '~/assets/images/special-oxtail-nachos.jpg'
import imgOxtailPhilly from '~/assets/images/special-oxtail-philly.jpg'
import imgJerkChickenSliders from '~/assets/images/special-jerk-chicken-sliders.jpg'
import imgPlantainFries from '~/assets/images/special-plantain-fries.jpg'
import imgOxtailSliders2 from '~/assets/images/special-oxtail-sliders-2.jpg'

const rows = [
  [
    {
      image: imgOxtailSliders,
      title: 'Oxtail Sliders',
      description: 'Slow-braised oxtail piled high on toasted brioche.'
    },
    {
      image: imgOxtailNachos,
      title: 'Oxtail Nachos',
      description: 'Crispy plantain chips loaded with tender braised oxtail.'
    },
    {
      image: imgOxtailPhilly,
      title: 'Oxtail Philly on Coco Bread',
      description: 'Philly-style oxtail stacked on warm coco bread.'
    }
  ],
  [
    {
      image: imgJerkChickenSliders,
      title: 'Jerk Chicken Sliders',
      description: 'Smoky jerk chicken with pickled slaw and a touch of heat.'
    },
    {
      image: imgPlantainFries,
      title: 'Plantain Fries',
      description: 'Sweet plantain, fried golden and finished with sea salt.'
    },
    {
      image: imgOxtailSliders2,
      title: 'Oxtail Sliders',
      description: 'A Kitchen King favorite, made fresh every day.'
    }
  ]
]

const activeIndexPerRow = ref(rows.map(() => null))

function toggleCard(rowIndex, colIndex) {
  activeIndexPerRow.value[rowIndex] =
    activeIndexPerRow.value[rowIndex] === colIndex ? null : colIndex
}
</script>

<template>
  <section class="specials">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="specials__row">
      <SpecialsCard
        v-for="(dish, colIndex) in row"
        :key="dish.image"
        :image="dish.image"
        :title="dish.title"
        :description="dish.description"
        :active="activeIndexPerRow[rowIndex] === colIndex"
        :dimmed="activeIndexPerRow[rowIndex] !== null && activeIndexPerRow[rowIndex] !== colIndex"
        @toggle="toggleCard(rowIndex, colIndex)"
      />
    </div>
  </section>
</template>

<style scoped>
.specials {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 4px;
  background-color: var(--color-deep);
  border-radius: 20px;
}

.specials__row {
  display: flex;
  gap: 4px;
}

@media (max-width: 768px) {
  .specials__row {
    flex-direction: column;
  }
}
</style>

<script setup>


import { ref } from 'vue'

const emit = defineEmits([
    'close',
    'select'
])


import { locations } from '~/data/locations'
const selectedTruck = ref(null)

function confirmLocation() {

    if (!selectedTruck.value) {
        alert("Please select a food truck first")
        return
    }


    emit('select', selectedTruck.value)

}



function directions(url) {

    window.open(url, '_blank')

}




function selectTruck(item) {

    selectedTruck.value = item

}


</script>


<template>

    <div class="picker">


        <div class="picker-title">
            Select A Food Truck
        </div>



        <div class="truck-list">


            <div v-for="item in locations" :key="item.name" class="truck-card" @click="selectTruck(item)"
                :class="{ active: selectedTruck?.name === item.name }">


                <div class="truck-top">

                    <div>

                        <h3>
                            {{ item.name }}
                        </h3>

                        <p>
                            {{ item.address }}
                        </p>

                    </div>


                    <span class="status">
                        OPEN
                        <i></i>
                    </span>


                </div>



                <div class="hours">
                    {{ item.hours }}
                </div>



                <button class="direction" @click="directions(item.map)">

                    GET DIRECTIONS

                    <span class="location-icon">
                        <img src="~/assets/images/Location Vector.png" alt="Location" />
                    </span>

                </button>



            </div>


        </div>



        <button class="order-btn" @click="confirmLocation">
            START YOUR ORDER
        </button>



    </div>


</template>

<style scoped>
.picker {

    position: absolute;

    top: 48px;
    right: 0;

    width: 750px;
    height: 450px;

    background: #050505;

    border-radius: 20px;

    padding: 12px;

    z-index: 100;


    box-shadow:
        0 10px 30px rgba(0, 0, 0, .4);

}



.picker-title {

    font-size: 15px;

    color: #FFEFAD;

    font-weight: 400;

    margin-bottom: 20px;

    padding-top: 8px;

    padding-left: 7px;

}



.truck-list {

    height: 320px;
    overflow-y: auto;

    padding-right: 8px;

}


/* Chrome / Edge / Safari */

.truck-list::-webkit-scrollbar {

    width: 8px;

}


.truck-list::-webkit-scrollbar-track {

    background: transparent;

    border-radius: 20px;

}


.truck-list::-webkit-scrollbar-thumb {

    background: #1A1A1A;

    border-radius: 20px;

}


.truck-list::-webkit-scrollbar-thumb:hover {

    background: #1A1A1A;

}



.truck-card {

    background: #151515;

    padding: 12px;

    border-radius: 5px;

    margin-bottom: 10px;
    cursor: pointer;

}

.truck-card:hover {

    background: #1b1b1b;

}

.truck-card.active {

    background: #202020;


}


.truck-top {

    display: flex;

    justify-content: space-between;

}



.truck-top h3 {

    font-size: 22px;

    margin: 0;

    color: white;

}



.truck-top p {

    font-size: 15px;

    color: #8b8b8b;

    margin: 5px 0;

}



.truck-top .status {

    background: #34c0491e;
    height: max-content;
    padding: 9px 11px;
    border-radius: 10px;

    font-size: 12px;
    color: #FFFFFF;

    display: flex;
    align-items: center;
    gap: 8px;

}

.truck-top .status i {

    width: 6px;
    height: 6px;

    background: #34C049;

    border-radius: 50%;

    display: block;

}



.hours {

    font-size: 15px;

    color: white;

    margin: 15px 0;

}



.direction {


    height: 40px;

    width: 100%;

    border: 1px solid #FFCA59;

    background: transparent;

    color: #FFCA59;

    font-size: 14px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 0 15px;

    cursor: pointer;
    border-radius: 10px;

}

.location-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}


.location-icon img {

    width: 16px;
    height: 16px;

    object-fit: contain;
}



.order-btn {

    margin-top: 12px;

    height: 42px;

    width: 100%;

    border: none;

    background: #ffca59;

    font-size: 11px;

    font-weight: 700;

    cursor: pointer;
    border-radius: 10px;

}
</style>
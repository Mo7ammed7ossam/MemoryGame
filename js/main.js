// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function() {

    // Prompt Window To Ask For Name
    let yourName = prompt("What is Your Name?");

    // If Name Is Empty
    if (yourName == null || yourName == "") {

        // Set Name To Unknown
        document.querySelector(".name span").innerHTML = 'Unknown .. !';

        // Name Is Not Empty
    } else {

        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;

    }
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();

};

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];   // ... -> extract array in array
let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add ("Order" Css Property) To Game Blocks
blocks.forEach((block, index) => {

    // Add CSS Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function() {

        // Trigger The Flip Block Function
        flipBlock(block);
    });
});

/* ------------------------------------------------------------------------- */
/* --------------------------- Shuffle Function ---------------------------- */
/* ------------------------------------------------------------------------- */

// Shuffle Function
function shuffle(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash(box)
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}

/* ------------------------------------------------------------------------- */
/* ------------------------- Flip Block Function --------------------------- */
/* ------------------------------------------------------------------------- */

// Flip Block Function
function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {

        // console.log('Two Flipped Blocks Selected');

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

/* ------------------------------------------------------------------------- */
/* ------------------------- Stop Clicking Function ------------------------ */
/* ------------------------------------------------------------------------- */

// Stop Clicking Function
function stopClicking() {

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    // Wait Duration
    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

/* ------------------------------------------------------------------------- */
/* --------------------- Check Matched Block Function ---------------------- */
/* ------------------------------------------------------------------------- */

// Check Matched Block Function
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    // check if 2 dataset block matched or not
    if (firstBlock.dataset.sport === secondBlock.dataset.sport) { // dataser --> data-sport

        // remove 'is-flipped' class
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        // add 'has-match' class
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        // play success sound
        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        // play fail sound
        document.getElementById('fail').play();
    }
}
/**********************************************
 * STARTER CODE
 **********************************************/
 
/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
 
/* This is a MEMORY GAME */
 
function shuffle (src) {
    const copy = [...src]
    const length = copy.length
    for (let i = 0; i < length; i++) {
      const x = copy[i]
      const y = Math.floor(Math.random() * length)
      const z = copy[y]
      copy[i] = z
      copy[y] = x
    }
    if (typeof src === 'string') {
      return copy.join('')
    }
    return copy
  }
   
  /* Create Game points */
  const game = {
    selectedCard: [],
    click: 0,
    matchCard: 0,
    Cards: 8,
    decksize: 0
  }
   
  /* Create a card array */
  /* I use https://iconmonstr.com/ */
  const images = [
    'ballons', 'box', 'Dance', 'bus', 'Grad', 'cheers', 'Queen', 'tag']
  /* Create a const varible for container and decision */
  let newImages = []
  const $selection = document.getElementById('selection')
  const $deck = document.getElementById('deck')
  // const $decision = document.getElementById('decision')
   
  /* Create a const for each of the id buttons */
   
  const $easy = document.getElementById('easy')
  const $normal = document.getElementById('normal')
  const $hard = document.getElementById('hard')
   
  /* Retry button */
  const $retry = document.getElementById('retry')
   
  /* Hiding the replay button */
  $retry.classList.add('hide')
  /* Creating loop to display a card */
  $easy.addEventListener('click', easy)
  $normal.addEventListener('click', normal)
  $hard.addEventListener('click', hard)
  function easy () {
    //console.log(mix())
    game.matchCard = []
    game.Cards = 2
    // console.log(game.mixcard)
    $selection.classList.add('hide')
    // $retry.classList.add('hide')
   
    loop()
  }
   
  function normal () {
    game.matchCard = []
    game.Cards = 4
    $selection.classList.add('hide') 
    // $retry.classList.add('hide') 
    loop() 
  }
   
  function hard () {
    game.matchCard = []
    game.Cards = 6
    $selection.classList.add('hide') 
    // $retry.classList.add('hide') 
    loop() 
  }
  /* Create a loop for the card to appear */
  const deck = []
   
  function loop () {  
    newImages = shuffle(images)
    for (let c = 1; c <= 2; c++) {
      console.log('yes')
      for (let i = 0; i <= game.Cards - 1; i++) {
        game.decksize++
        deck.push(`
        <div class="card flipped ">
          <div class="card__inner">
            <div class="card__front">
            <div class="picture" ><img src="img/${newImages[i]}.png"></div>
            </div>
            <div class="card__back ${newImages[i]} ">
            </div>
          </div>
        </div>
        </div>`)
      }
      console.log(deck)
    }
   
    $deck.innerHTML = deck.join('')
  }
  /* Clicking Card  to see if they match */
   
  let firstCard
  $deck.addEventListener('click', checkcard)
  function checkcard (e) {
    const card = e.target.closest('.card')
    if (card.classList.contains('card')) {
      e.target.parentElement.parentElement.classList.remove('flipped')
      console.log(game.click+' look ')
      game.click++
      console.log(game.decksize)
      if (game.click === 1) {
        firstCard = e.target
      }
      if (game.matchCard === newImages.length) {
      // game.matchCard = 0
        console.log('you won')
      }
      if (game.click === 2) {
        console.log('yes')
        if (firstCard.classList[1] === e.target.classList[1]) {
          game.matchCard++
          card.classList.add('match')
   
          console.log('match')
          if (game.matchCard === game.decksize / 2 ) {
            console.log('you win')
            $retry.classList.add('show')
          }
          game.click = 0
        } else {
        // console.log( )
          game.click = 0
          setTimeout(function () {
            e.target.parentElement.parentElement.classList.add('flipped')
            firstCard.parentElement.parentElement.classList.add('flipped')
          }, 800)
        }
      }
    }
  }
   
  
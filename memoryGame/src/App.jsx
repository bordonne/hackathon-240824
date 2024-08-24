import { useState } from 'react'
import './App.css'
import Flippy, { FrontSide, BackSide } from 'react-flippy';


function Square({ value , onSquareClick }) {
  return (

    <Flippy className="square"
      flipOnHover={false} // default false
      flipOnClick={true} // default false
      flipDirection="horizontal" // horizontal or vertical
      onClick={onSquareClick}
    >
      <FrontSide
        style={{
          backgroundImage: 'none',
        }}
      >
      </FrontSide>
      <BackSide
        style={{ backgroundImage: 'url(/images/' + value + '.png)' }}>
      </BackSide>
    </Flippy>
  );
}

export default function Board() {
  let images = Array(12).fill(null);
  const [squares, setSquares] = useState(Array(9).fill(null));

  setImages();
  function setImages() {
    let imgArray = [1,2,3,4,5,6,7,8,9];

    let deck = [];
    // takes 6 random numbers from 1 to 9

    for (let i=0; i<6; i++) {
      let g = Math.floor(Math.random() * imgArray.length);
      deck[i] = imgArray[g];
      // delete the number from the list
      imgArray.splice(g,1);
    }

    console.log("pick of images");
    console.log(deck);

    console.log("make pairs");
    images = deck.concat(deck);
    console.log(images);

    console.log("shuffle array");
    images = shuffleArray(images);

  }

  return (
    <>
      <div className="board-row">
        <Square value={images[0]} onSquareClick={() => console.log("test")} />
        <Square value={images[1]} />
        <Square value={images[2]} />
        <Square value={images[3]} />
      </div>
      <div className="board-row">
        <Square value={images[4]} />
        <Square value={images[5]} />
        <Square value={images[6]} />
        <Square value={images[7]} />
      </div>
      <div className="board-row">
        <Square value={images[8]} />
        <Square value={images[9]} />
        <Square value={images[10]} />
        <Square value={images[11]} />
      </div>
    </>
  );
}


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
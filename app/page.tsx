'use client'
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {

  const [result, setResult] = useState('');
  var numberButtons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  var operatorButtons: string[] = ['+', '-', '*', '/', '=', 'C'];
  //shuffling the numbers
  function shuffle(numberArray : any[]) {
    let currentIndex = numberArray.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [numberArray[currentIndex], numberArray[randomIndex]] = [
        numberArray[randomIndex], numberArray[currentIndex]];
      }
    return numberArray;
  }
  const handleClick = (value: any) => {
    playSound();
    if (value === '=') {
        try {
            setResult(eval(result) || '');
        } catch (error) {
            setResult('Error');
        }
    } else if (value === 'C') {
        setResult('');
    } else if (value === 'CE') {
        setResult(result.slice(0, -1));
    } else {
        setResult(result + value);
    }
  }
  numberButtons = shuffle(numberButtons);
  operatorButtons = shuffle(operatorButtons);
  function playSound() {
    new Audio("/sounds/click.mp3").play()
  }

  return (  
    <main className={styles.main}>
      <div className="calc">
      <input type="text" className={styles.resultBox} value={result}/>
      <div className={styles.numberButtonsContainer}>       
        {numberButtons.map((number) => (
          <button className={styles.numberButton} key={number} onClick={() => handleClick(number)}>
            {number}
          </button>       
        ))}
        {operatorButtons.map((operator) => (
          <button className={styles.operatorButton} key={operator} onClick={() => handleClick(operator)}>
            {operator}
          </button>
        ))}       
      </div>
     <div className={styles.message}>
      Just a <span className={styles.specialText}>normal</span> calculator.
     </div>
      </div>
      <footer className={styles.footer}>
        <hr></hr>
        Made with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js{"         "}      </a> 
        <span className={styles.footerRight}><a href="https://github.com/minoritydev" target="_blank" rel="noopener noreferrer">&lt;GitHub/&gt;</a></span>

      </footer>
    </main>
  );
}

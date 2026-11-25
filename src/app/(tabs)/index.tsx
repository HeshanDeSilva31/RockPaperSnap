
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Choice = 'Rock' | 'Paper' | 'Scissors';

export default function GameScreen() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState('Choose your move!');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

  const playGame = (player: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];

    setPlayerChoice(player);
    setComputerChoice(computer);

    if (player === computer) {
      setResult("It's a Draw!");
      setDraws(previous => previous + 1);
    } else if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      setResult('You Win!');
      setWins(previous => previous + 1);
    } else {
      setResult('You Lose!');
      setLosses(previous => previous + 1);
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('Choose your move!');
    setWins(0);
    setLosses(0);
    setDraws(0);
  };

  const emojis = {
    Rock: '🪨',
    Paper: '📄',
    Scissors: '✂️',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Snap</Text>
      <Text style={styles.subtitle}>Choose your move!</Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Wins: {wins}</Text>
        <Text style={styles.score}>Draws: {draws}</Text>
        <Text style={styles.score}>Losses: {losses}</Text>
      </View>

      <View style={styles.choiceContainer}>
        <View style={styles.choiceBox}>
          <Text style={styles.choiceLabel}>You</Text>
          <Text style={styles.emoji}>
            {playerChoice ? emojis[playerChoice] : '❔'}
          </Text>
          <Text>{playerChoice || 'Waiting'}</Text>
        </View>

        <View style={styles.choiceBox}>
          <Text style={styles.choiceLabel}>Computer</Text>
          <Text style={styles.emoji}>
            {computerChoice ? emojis[computerChoice] : '❔'}
          </Text>
          <Text>{computerChoice || 'Waiting'}</Text>
        </View>
      </View>

      <Text style={styles.result}>{result}</Text>

      <View style={styles.buttons}>
        {choices.map(choice => (
          <TouchableOpacity
            key={choice}
            style={styles.button}
            onPress={() => playGame(choice)}
          >
            <Text style={styles.buttonText}>
              {emojis[choice]} {choice}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  score: {
    fontWeight: 'bold',
    color: '#333',
  },
  choiceContainer: {
    flexDirection: 'row',
    gap: 35,
    marginBottom: 20,
  },
  choiceBox: {
    alignItems: 'center',
  },
  choiceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 55,
    marginVertical: 10,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 20,
  },
  buttons: {
    gap: 12,
    width: '100%',
  },
  button: {
    backgroundColor: '#64B5F6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resetButton: {
    marginTop: 20,
    padding: 12,
  },
  resetText: {
    color: '#D32F2F',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

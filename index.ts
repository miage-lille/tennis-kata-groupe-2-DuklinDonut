import { Player } from './types/player';
import { Point, PointsData, Score, forty, game, deuce, advantage } from './types/score';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};

export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};

// Exercice 1: pointToString and scoreToString
export const pointToString = (point: Point): string => {
  switch (point.kind) {
    case 'LOVE':
      return 'Love';
    case 'FIFTEEN':
      return 'Fifteen';
    case 'THIRTY':
      return 'Thirty';
    default:
      throw new Error('Invalid Point');
  }
};

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS':
      return `Player One: ${pointToString(score.pointsData.PLAYER_ONE)}, Player Two: ${pointToString(
        score.pointsData.PLAYER_TWO
      )}`;
    case 'FORTY':
      return `Player ${playerToString(score.fortyData.player)} is at Forty, Opponent has ${pointToString(
        score.fortyData.otherPoint
      )}`;
    case 'DEUCE':
      return 'Deuce';
    case 'ADVANTAGE':
      return `Advantage ${playerToString(score.player)}`;
    case 'GAME':
      return `Game won by ${playerToString(score.player)}`;
    default:
      throw new Error('Invalid Score');
  }
};

// Exercice 2: incrementPoint, scoreWhenPoint

const incrementPoint = (point: Point): Point | 'FORTY' => {
  switch (point.kind) {
    case 'LOVE':
      return { kind: 'FIFTEEN' };
    case 'FIFTEEN':
      return { kind: 'THIRTY' };
    case 'THIRTY':
      return 'FORTY'; // Transition to 40
    default:
      throw new Error('Invalid point');
  }
};

export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const updatedPoints = { ...current };

  if (winner === 'PLAYER_ONE') {
    const newPoint = incrementPoint(current.PLAYER_ONE);
    if (newPoint === 'FORTY') {
      return forty('PLAYER_ONE', current.PLAYER_TWO); // Transition to FORTY
    }
    updatedPoints.PLAYER_ONE = newPoint; // Update PLAYER_ONE's points
  } else {
    const newPoint = incrementPoint(current.PLAYER_TWO);
    if (newPoint === 'FORTY') {
      return forty('PLAYER_TWO', current.PLAYER_ONE); // Transition to FORTY
    }
    updatedPoints.PLAYER_TWO = newPoint; // Update PLAYER_TWO's points
  }

  return {
    kind: 'POINTS',
    pointsData: updatedPoints,
  };
};

// Exercice 3: scoreWhenAdvantage

export const scoreWhenAdvantage = (advantagedPlayed: Player, winner: Player): Score => {
  if (winner === advantagedPlayed) {
    return game(winner); // Winner transitions to Game
  } else {
    return deuce(); // If the opponent wins, it goes back to Deuce
  }
};

// Exercice 4: scoreWhenForty

export const scoreWhenForty = (currentForty: any, winner: Player): Score => {
  if (winner === currentForty.fortyData.player) {
    return game(winner); // Winner transitions to Game
  } else {
    return deuce(); // If the opponent wins, it goes back to Deuce
  }
};

// Exercice 5: scoreWhenGame

export const scoreWhenGame = (winner: Player): Score => {
  return game(winner); // Game over, the winner wins
};

// Exercice 6: scoreWhenDeuce

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner); // Transition to Advantage for the winner
};

// Final: score function

export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame(winner);
    default:
      throw new Error('Invalid Score');
  }
};

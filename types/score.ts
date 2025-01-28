import { Player } from './player';

// Enum for the points
export enum PointEnum {
  LOVE = 'LOVE',
  FIFTEEN = 'FIFTEEN',
  THIRTY = 'THIRTY',
  FORTY = 'FORTY',
}

// Define the Point types using the enum values
export type Love = { kind: PointEnum.LOVE };
export type Fifteen = { kind: PointEnum.FIFTEEN };
export type Thirty = { kind: PointEnum.THIRTY };
export type Forty = { kind: PointEnum.FORTY };

// Union type for a point
export type PointType = Love | Fifteen | Thirty | Forty;

// Constructors for Points
export const love = (): Love => ({ kind: PointEnum.LOVE });
export const fifteen = (): Fifteen => ({ kind: PointEnum.FIFTEEN });
export const thirty = (): Thirty => ({ kind: PointEnum.THIRTY });
export const forty = (): Forty => ({ kind: PointEnum.FORTY });

// PointsData type for containing the points of both players
export type PointsData = {
  PLAYER_ONE: PointType;
  PLAYER_TWO: PointType;
};

// Points type for holding the points data
export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

// Constructor for Points
export const points = (playerOnePoints: PointType, playerTwoPoints: PointType): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

// FortyData type
export type FortyData = {
  player: Player;
  otherPoint: PointType;
};

// Forty type for when a player has 40 points
export type FortyType = {
  kind: 'FORTY';
  fortyData: FortyData;
};

// Constructor for Forty
export const createForty = (player: Player, otherPoint: PointType): FortyType => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});

// Deuce type for a tie score
export type Deuce = {
  kind: 'DEUCE';
};

// Constructor for Deuce
export const deuce = (): Deuce => ({ kind: 'DEUCE' });

// Advantage type for when a player has an advantage
export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

// Constructor for Advantage
export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

// Game type when a player wins
export type Game = {
  kind: 'GAME';
  player: Player;
};

// Constructor for Game
export const game = (player: Player): Game => ({
  kind: 'GAME',
  player,
});

// Score type (union of all possible states)
export type Score = Points | FortyType | Deuce | Advantage | Game;

// Function to increment points
const incrementPoint = (point: PointType): PointType | 'FORTY' => {
  switch (point.kind) {
    case PointEnum.LOVE:
      return fifteen();
    case PointEnum.FIFTEEN:
      return thirty();
    case PointEnum.THIRTY:
      return forty(); // Transition to 40
    default:
      throw new Error('Invalid point');
  }
};

// Function to handle the score transition when a player wins a point
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const updatedPoints = { ...current };

  if (winner === 'PLAYER_ONE') {
    const newPoint = incrementPoint(current.PLAYER_ONE);
    if (newPoint === 'FORTY') {
      return createForty('PLAYER_ONE', current.PLAYER_TWO); // Transition to FORTY for PLAYER_ONE
    }
    updatedPoints.PLAYER_ONE = newPoint;
  } else {
    const newPoint = incrementPoint(current.PLAYER_TWO);
    if (newPoint === 'FORTY') {
      return createForty('PLAYER_TWO', current.PLAYER_ONE); // Transition to FORTY for PLAYER_TWO
    }
    updatedPoints.PLAYER_TWO = newPoint;
  }

  return {
    kind: 'POINTS',
    pointsData: updatedPoints,
  };
};

// Function for handling the transition to Game or Deuce
export const scoreWhenAdvantage = (advantagedPlayed: Player, winner: Player): Score => {
  if (advantagedPlayed === winner) {
    return game(winner); // Transition to GAME for the winner
  }
  return deuce(); // Transition back to DEUCE if the other player wins
};

// Function for handling when a player wins the game
export const scoreWhenGame = (winner: Player): Score => {
  return game(winner); // Return the GAME state for the winner
};

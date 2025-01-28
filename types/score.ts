import { Player } from './player';

// Define individual Point types
export type Love = { kind: 'LOVE' };
export type Fifteen = { kind: 'FIFTEEN' };
export type Thirty = { kind: 'THIRTY' };

// Union type for a single Point
export type Point = Love | Fifteen | Thirty;

// Constructors for Points
export const love = (): Love => ({ kind: 'LOVE' });
export const fifteen = (): Fifteen => ({ kind: 'FIFTEEN' });
export const thirty = (): Thirty => ({ kind: 'THIRTY' });

// Define PointsData as a standalone type
export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

// Update Points to reuse PointsData
export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

// Constructor for Points
export const points = (playerOnePoints: Point, playerTwoPoints: Point): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});



// FortyData type
export type FortyData = {
  player: Player; // Player with 40 points
  otherPoint: Point; // Opponent's point
};

// Constructor for FortyData (if needed)
export const fortyData = (player: Player, otherPoint: Point): FortyData => ({
  player,
  otherPoint,
});

// Forty type
export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

// Constructor for Forty
export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});

// Deuce type
export type Deuce = {
  kind: 'DEUCE';
};

// Constructor for Deuce
export const deuce = (): Deuce => ({ kind: 'DEUCE' });

// Advantage type
export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

// Constructor for Advantage
export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

// Game type
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
export type Score = Points | Forty | Deuce | Advantage | Game;

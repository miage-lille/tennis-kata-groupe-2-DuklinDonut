import { getFifteen, getLove, getThirty } from './__tests__/generators';
import { Player } from './types/player';
import { PointType, PointsData, Score, Forty, game, deuce, advantage, forty, PointEnum } from './types/score';
import * as fc from 'fast-check';

// -------- Tooling functions --------- //

export const playerToString = (player: Player): string => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};

export const otherPlayer = (player: Player): Player => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};

// Exercice 1: pointToString and scoreToString
export const pointToString = (point: PointType): string => {
  switch (point.kind) {
    case 'LOVE':
      return 'Love';
    case 'FIFTEEN':
      return 'Fifteen';
    case 'THIRTY':
      return 'Thirty';
    case 'FORTY':
      return 'Forty';
    default:
      throw new Error('Invalid Point');
  }
};

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS':
      return `Player One: ${pointToString(score.pointsData.PLAYER_ONE)}, Player Two: ${pointToString(score.pointsData.PLAYER_TWO)}`;
    case 'FORTY':
      return `Player ${playerToString(score.fortyData.player)} is at Forty, Opponent has ${pointToString(score.fortyData.otherPoint)}`;
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
// Update to the incrementPoint function
export const incrementPoint = (point: PointType): PointType | 'FORTY' => {
  switch (point.kind) {
    case PointEnum.LOVE:
      return { kind: PointEnum.FIFTEEN };
    case PointEnum.FIFTEEN:
      return { kind: PointEnum.THIRTY };
    case PointEnum.THIRTY:
      return { kind: PointEnum.FORTY }; // Correct transition to FORTY
    default:
      throw new Error('Invalid point');
  }
};
export const getPointsWithThirty = (): fc.Arbitrary<PointsData> =>
  fc.record({
    PLAYER_ONE: fc.oneof(getThirty(), getFifteen(), getLove()),
    PLAYER_TWO: fc.oneof(getThirty(), getFifteen(), getLove()),
  });

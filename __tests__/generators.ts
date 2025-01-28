import * as fc from 'fast-check';
import { Player } from '../types/player';
import {
  advantage,
  Fifteen,
  forty,
  Forty,
  FortyData,
  Love,
  Point,
  Points,
  PointsData,
  Score,
  Thirty,
} from '../types/score';
// Helper function to increment a player's points
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

// Implement scoreWhenPoint
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const updatedPoints = { ...current };

  if (winner === 'PLAYER_ONE') {
    const newPoint = incrementPoint(current.PLAYER_ONE);
    if (newPoint === 'FORTY') {
      return forty('PLAYER_ONE', current.PLAYER_TWO); // Transition to FORTY for PLAYER_ONE
    }
    updatedPoints.PLAYER_ONE = newPoint; // Update PLAYER_ONE's points
  } else {
    const newPoint = incrementPoint(current.PLAYER_TWO);
    if (newPoint === 'FORTY') {
      return forty('PLAYER_TWO', current.PLAYER_ONE); // Transition to FORTY for PLAYER_TWO
    }
    updatedPoints.PLAYER_TWO = newPoint; // Update PLAYER_TWO's points
  }

  return {
    kind: 'POINTS',
    pointsData: updatedPoints,
  };
};
export const playerOneArb = (): fc.Arbitrary<Player> =>
  fc.constant('PLAYER_ONE');
export const playerTwoArb = (): fc.Arbitrary<Player> =>
  fc.constant('PLAYER_TWO');
export const getPlayer = () => fc.oneof(playerOneArb(), playerTwoArb());
export const getPoint = (): fc.Arbitrary<Point> =>
  fc.oneof(getLove(), getFifteen(), getThirty());
export const getPoints = (): fc.Arbitrary<Points> =>
  fc.record({
    kind: fc.constant('POINTS'),
    pointsData: fc.record({
      PLAYER_ONE: getPoint(),
      PLAYER_TWO: getPoint(),
    }),
  });
export const getFortyData = (): fc.Arbitrary<FortyData> =>
  fc.record({
    player: getPlayer(),
    otherPoint: getPoint(),
  });
export const getForty = (): fc.Arbitrary<Forty> =>
  fc.record({
    fortyData: getFortyData(),
    kind: fc.constant('FORTY'),
  });
export const getLove = (): fc.Arbitrary<Love> =>
  fc.record({
    kind: fc.constant('LOVE'),
  });

export const getThirty = (): fc.Arbitrary<Thirty> =>
  fc.record({
    kind: fc.constant('THIRTY'),
  });
export const getFifteen = (): fc.Arbitrary<Fifteen> =>
  fc.record({
    kind: fc.constant('FIFTEEN'),
  });
// i added:
export const getPointLoveOrFifteen = (): fc.Arbitrary<Point> =>
  fc.oneof(getLove(), getFifteen());
export const getPointsLoveOrFifteen = (): fc.Arbitrary<Points> =>
  fc.record({
    kind: fc.constant('POINTS'),
    pointsData: fc.record({
      PLAYER_ONE: getPointLoveOrFifteen(),
      PLAYER_TWO: getPointLoveOrFifteen(),
    }),
  });
// Generates Points where at least one player is at THIRTY
export const getPointsWithThirty = (): fc.Arbitrary<Points> =>
  fc.record({
    kind: fc.constant('POINTS'),
    pointsData: fc.oneof(
      // Case 1: PLAYER_ONE is at THIRTY
      fc.record({
        PLAYER_ONE: getThirty(),
        PLAYER_TWO: fc.oneof(getLove(), getFifteen()), // PLAYER_TWO cannot be THIRTY
      }),
      // Case 2: PLAYER_TWO is at THIRTY
      fc.record({
        PLAYER_ONE: fc.oneof(getLove(), getFifteen()), // PLAYER_ONE cannot be THIRTY
        PLAYER_TWO: getThirty(),
      })
    ),
  });
export const scoreWhenDeuce = (winner: Player): Score => {
    return advantage(winner); // Transition to Advantage for the winner
  };

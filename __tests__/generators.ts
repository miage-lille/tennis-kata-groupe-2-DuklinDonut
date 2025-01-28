import * as fc from 'fast-check';
import { Player } from '../types/player';
import { 
  advantage,
  createForty,
  FortyType,
  FortyData,
  Love,
  PointType,
  Points,
  PointsData,
  Score,
  Thirty,
  Fifteen,
  PointEnum 
} from '../types/score';



// Generate a point that is either LOVE or FIFTEEN
export const getPointLoveOrFifteen = (): fc.Arbitrary<Love | Fifteen> =>
  fc.oneof(
    fc.record({
      kind: fc.constant(PointEnum.LOVE) as fc.Arbitrary<Love['kind']>, // Narrow down the type explicitly
    }),
    fc.record({
      kind: fc.constant(PointEnum.FIFTEEN) as fc.Arbitrary<Fifteen['kind']>, // Same for Fifteen
    })
  );

// Generate Points where at least one player is at LOVE or FIFTEEN
export const getPointsLoveOrFifteen = (): fc.Arbitrary<PointsData> =>
  fc.record({
    PLAYER_ONE: getPointLoveOrFifteen(),
    PLAYER_TWO: getPointLoveOrFifteen(),
  });
// Arbitrary generators for testing
export const playerOneArb = (): fc.Arbitrary<Player> =>
  fc.constant('PLAYER_ONE');
export const playerTwoArb = (): fc.Arbitrary<Player> =>
  fc.constant('PLAYER_TWO');
export const getPlayer = () => fc.oneof(playerOneArb(), playerTwoArb());
export const getPoint = (): fc.Arbitrary<PointType> =>
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

export const getForty = (): fc.Arbitrary<FortyType> =>
  fc.record({
    fortyData: getFortyData(),
    kind: fc.constant('FORTY'),
  });

// Updated the generators to use the PointEnum
export const getLove = (): fc.Arbitrary<Love> =>
  fc.record({
    kind: fc.constant(PointEnum.LOVE),  // Use PointEnum.LOVE instead of 'LOVE'
  });

export const getThirty = (): fc.Arbitrary<Thirty> =>
  fc.record({
    kind: fc.constant(PointEnum.THIRTY),  // Use PointEnum.THIRTY instead of 'THIRTY'
  });

export const getFifteen = (): fc.Arbitrary<Fifteen> =>
  fc.record({
    kind: fc.constant(PointEnum.FIFTEEN),  // Use PointEnum.FIFTEEN instead of 'FIFTEEN'
  });

// Generates Points where at least one player is at THIRTY
export const getPointsWithThirty = (): fc.Arbitrary<Points> =>
  fc.record({
    kind: fc.constant('POINTS'),
    pointsData: fc.oneof(
      fc.record({
        PLAYER_ONE: getThirty(),
        PLAYER_TWO: fc.oneof(getLove(), getFifteen()),
      }),
      fc.record({
        PLAYER_ONE: fc.oneof(getLove(), getFifteen()),
        PLAYER_TWO: getThirty(),
      })
    ),
  });
